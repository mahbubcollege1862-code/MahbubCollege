/**
 * Abuse protection for the OTP SMS endpoint (table public.otp_send_log).
 *
 * Every SMS we are about to send is logged with a hash of the visitor's IP address and the phone number.
 * Limits (per rolling window) stop one visitor or one number from draining SMS credits, and a global
 * cap acts as a circuit breaker if many different visitors attack at once.
 */
import { createHash } from 'crypto';
import { getAdminClient } from '@/lib/adminClient';

const TABLE = 'otp_send_log';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const LIMITS = {
  perIpHour: 10,
  perIpDay: 30,
  perPhoneHour: 5,
  perPhoneDay: 10,
  globalHour: 300,
};

export function getClientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get('x-nf-client-connection-ip') || // Netlify
    h.get('cf-connecting-ip') ||
    h.get('x-real-ip') ||
    h.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}

/** Only a salted hash of the IP is stored, never the address itself. */
export function hashIp(ip: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mahbub-otp';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

async function countSince(column: 'ip_hash' | 'phone' | null, value: string | null, sinceMs: number): Promise<number> {
  let query = getAdminClient()
    .from(TABLE)
    .select('id', { count: 'exact', head: true })
    .gte('created_at', new Date(Date.now() - sinceMs).toISOString());
  if (column && value) query = query.eq(column, value);
  const { count, error } = await query;
  if (error) throw new Error(`Rate limit store error: ${error.message}`);
  return count ?? 0;
}

export type RateLimitResult = { ok: true } | { ok: false; message: string };

/** Checks every limit; call before sending an SMS. */
export async function checkOtpRateLimit(ipHash: string, phone: string): Promise<RateLimitResult> {
  const [ipHour, ipDay, phoneHour, phoneDay, globalHour] = await Promise.all([
    countSince('ip_hash', ipHash, HOUR),
    countSince('ip_hash', ipHash, DAY),
    countSince('phone', phone, HOUR),
    countSince('phone', phone, DAY),
    countSince(null, null, HOUR),
  ]);

  if (globalHour >= LIMITS.globalHour) {
    return { ok: false, message: 'We are receiving a lot of requests right now. Please try again in a little while.' };
  }
  if (ipHour >= LIMITS.perIpHour || ipDay >= LIMITS.perIpDay) {
    return { ok: false, message: 'Too many verification requests from your connection. Please try again later.' };
  }
  if (phoneHour >= LIMITS.perPhoneHour || phoneDay >= LIMITS.perPhoneDay) {
    return { ok: false, message: 'Too many verification codes were requested for this number. Please try again later.' };
  }
  return { ok: true };
}

/** Records an SMS that is about to be sent, and now and then removes entries older than two days. */
export async function logOtpSend(ipHash: string, phone: string): Promise<void> {
  const admin = getAdminClient();
  const { error } = await admin.from(TABLE).insert({ ip_hash: ipHash, phone });
  if (error) throw new Error(`Rate limit store error: ${error.message}`);

  if (Math.random() < 0.02) {
    await admin.from(TABLE).delete().lt('created_at', new Date(Date.now() - 2 * DAY).toISOString());
  }
}
