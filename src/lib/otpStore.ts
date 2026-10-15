/**
 * Database-backed OTP store and rate limiter (table public.otp_codes).
 *
 * Serverless hosts such as Netlify run each request on a separate instance, so OTP state cannot
 * live in memory. Rows are only reachable with the service role key; the code itself is stored
 * as a hash. Handles generation, resend cooldown, 2-minute validity, 3 attempts and a 15-minute lockout.
 */
import { createHash, randomInt, timingSafeEqual } from 'crypto';
import { getAdminClient } from '@/lib/adminClient';

interface OtpRow {
  phone: string;
  otp_hash: string;
  expires_at: string;
  last_sent_at: string;
  attempts: number;
  locked_until: string | null;
  verified: boolean;
  verified_at: string | null;
}

const VALIDITY_MS = 2 * 60 * 1000; // 2 minutes (matches the DLT SMS template)
const COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const VERIFIED_WINDOW_MS = 15 * 60 * 1000; // a verified number can register / look up for 15 minutes

const TABLE = 'otp_codes';

function hashOtp(phone: string, otp: string): string {
  return createHash('sha256').update(`${phone}:${otp}`).digest('hex');
}

async function getRow(phone: string): Promise<OtpRow | null> {
  const { data, error } = await getAdminClient().from(TABLE).select('*').eq('phone', phone).maybeSingle();
  if (error) throw new Error(`OTP store error: ${error.message}`);
  return (data as OtpRow | null) ?? null;
}

export async function requestOtp(phone: string): Promise<{
  success: boolean;
  otp?: string;
  error?: string;
  cooldownRemaining?: number;
}> {
  const now = Date.now();
  const existing = await getRow(phone);

  if (existing) {
    if (existing.locked_until && new Date(existing.locked_until).getTime() > now) {
      const remainingMinutes = Math.ceil((new Date(existing.locked_until).getTime() - now) / 60000);
      return {
        success: false,
        error: `Too many failed attempts. This number is temporarily locked. Please try again after ${remainingMinutes} minute(s).`,
      };
    }

    const sinceLast = now - new Date(existing.last_sent_at).getTime();
    if (sinceLast < COOLDOWN_MS) {
      const remainingSecs = Math.ceil((COOLDOWN_MS - sinceLast) / 1000);
      return {
        success: false,
        error: `Please wait ${remainingSecs}s before requesting a new code.`,
        cooldownRemaining: remainingSecs,
      };
    }
  }

  const otp = randomInt(100000, 1000000).toString();

  const { error } = await getAdminClient()
    .from(TABLE)
    .upsert({
      phone,
      otp_hash: hashOtp(phone, otp),
      expires_at: new Date(now + VALIDITY_MS).toISOString(),
      last_sent_at: new Date(now).toISOString(),
      attempts: 0,
      locked_until: null,
      verified: false,
      verified_at: null,
    });
  if (error) throw new Error(`OTP store error: ${error.message}`);

  return { success: true, otp };
}

export async function verifyOtp(
  phone: string,
  inputOtp: string
): Promise<{ success: boolean; error?: string; attemptsRemaining?: number }> {
  const now = Date.now();
  const record = await getRow(phone);

  if (!record) {
    return {
      success: false,
      error: 'No verification code was requested for this number. Please click Send OTP.',
    };
  }

  if (record.locked_until && new Date(record.locked_until).getTime() > now) {
    const remainingMinutes = Math.ceil((new Date(record.locked_until).getTime() - now) / 60000);
    return {
      success: false,
      error: `Too many failed attempts. Please try again after ${remainingMinutes} minute(s).`,
    };
  }

  if (now > new Date(record.expires_at).getTime()) {
    return {
      success: false,
      error: 'Verification code has expired. Please request a new OTP.',
    };
  }

  const expected = Buffer.from(record.otp_hash, 'hex');
  const actual = Buffer.from(hashOtp(phone, inputOtp.trim()), 'hex');
  const matches = expected.length === actual.length && timingSafeEqual(expected, actual);

  const admin = getAdminClient();

  if (!matches) {
    const attempts = record.attempts + 1;
    const remaining = MAX_ATTEMPTS - attempts;
    const locked = remaining <= 0;

    await admin
      .from(TABLE)
      .update({ attempts, locked_until: locked ? new Date(now + LOCKOUT_MS).toISOString() : null })
      .eq('phone', phone);

    if (locked) {
      return {
        success: false,
        error: 'Too many incorrect attempts. Number is locked for 15 minutes.',
        attemptsRemaining: 0,
      };
    }
    return {
      success: false,
      error: `Invalid OTP. ${remaining} attempt(s) remaining.`,
      attemptsRemaining: remaining,
    };
  }

  const { error } = await admin
    .from(TABLE)
    .update({ verified: true, verified_at: new Date(now).toISOString(), attempts: 0, locked_until: null })
    .eq('phone', phone);
  if (error) throw new Error(`OTP store error: ${error.message}`);

  return { success: true };
}

export async function isPhoneVerified(phone: string): Promise<boolean> {
  const record = await getRow(phone);
  if (!record || !record.verified || !record.verified_at) return false;
  return Date.now() - new Date(record.verified_at).getTime() <= VERIFIED_WINDOW_MS;
}

export async function consumePhoneVerification(phone: string): Promise<void> {
  await getAdminClient().from(TABLE).delete().eq('phone', phone);
}
