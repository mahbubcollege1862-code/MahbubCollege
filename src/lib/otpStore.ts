/**
 * In-Memory OTP Store & Rate Limiter
 * Handles generation, cooldown, 10-min validity, 3 max attempts, and 15-min lockout.
 */

export interface OtpRecord {
  otp: string;
  expiresAt: number;
  lastSentAt: number;
  attempts: number;
  lockedUntil?: number;
  verified: boolean;
}

// In-memory store (keyed by formatted phone number 91XXXXXXXXXX)
// Using globalThis so it persists across Next.js dev reloads
const globalForOtp = globalThis as unknown as {
  otpStore?: Map<string, OtpRecord>;
};

export const otpStore = globalForOtp.otpStore ?? new Map<string, OtpRecord>();
if (process.env.NODE_ENV !== 'production') {
  globalForOtp.otpStore = otpStore;
}

const VALIDITY_MS = 10 * 60 * 1000; // 10 minutes
const COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function requestOtp(phone: string): {
  success: boolean;
  otp?: string;
  error?: string;
  cooldownRemaining?: number;
} {
  const now = Date.now();
  const existing = otpStore.get(phone);

  if (existing) {
    // Check if locked out
    if (existing.lockedUntil && existing.lockedUntil > now) {
      const remainingMinutes = Math.ceil((existing.lockedUntil - now) / 60000);
      return {
        success: false,
        error: `Too many failed attempts. This number is temporarily locked. Please try again after ${remainingMinutes} minute(s).`,
      };
    }

    // Check resend cooldown
    if (existing.lastSentAt && now - existing.lastSentAt < COOLDOWN_MS) {
      const remainingSecs = Math.ceil((COOLDOWN_MS - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        error: `Please wait ${remainingSecs}s before requesting a new code.`,
        cooldownRemaining: remainingSecs,
      };
    }
  }

  // Generate new 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(phone, {
    otp,
    expiresAt: now + VALIDITY_MS,
    lastSentAt: now,
    attempts: 0,
    lockedUntil: undefined,
    verified: false,
  });

  return { success: true, otp };
}

export function verifyOtp(phone: string, inputOtp: string): {
  success: boolean;
  error?: string;
  attemptsRemaining?: number;
} {
  const now = Date.now();
  const record = otpStore.get(phone);

  if (!record) {
    return {
      success: false,
      error: 'No verification code was requested for this number. Please click Send OTP.',
    };
  }

  // Check if locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      success: false,
      error: `Too many failed attempts. Please try again after ${remainingMinutes} minute(s).`,
    };
  }

  // Check if expired
  if (now > record.expiresAt) {
    return {
      success: false,
      error: 'Verification code has expired. Please request a new OTP.',
    };
  }

  // Compare OTP
  if (record.otp !== inputOtp.trim()) {
    record.attempts += 1;
    const remaining = MAX_ATTEMPTS - record.attempts;

    if (remaining <= 0) {
      record.lockedUntil = now + LOCKOUT_MS;
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

  // Success!
  record.verified = true;
  record.attempts = 0;
  record.lockedUntil = undefined;

  return { success: true };
}

export function isPhoneVerified(phone: string): boolean {
  const record = otpStore.get(phone);
  return Boolean(record && record.verified);
}

export function consumePhoneVerification(phone: string): void {
  otpStore.delete(phone);
}
