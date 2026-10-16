import { NextResponse } from 'next/server';
import { formatIndianPhone, isValidIndianMobile, sendOtpSms } from '@/lib/sms';
import { requestOtp } from '@/lib/otpStore';
import { checkOtpRateLimit, getClientIp, hashIp, logOtpSend } from '@/lib/rateLimit';
import { verifyTurnstile } from '@/lib/turnstile';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, turnstileToken } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required.' },
        { status: 400 }
      );
    }

    if (!isValidIndianMobile(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const formattedPhone = formatIndianPhone(phone);
    const ip = getClientIp(req);

    // 1. Bot check (only when Cloudflare Turnstile is configured)
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { success: false, error: 'Please complete the security check and try again.', captchaFailed: true },
        { status: 400 }
      );
    }

    // 2. Per-visitor, per-number and global limits
    const ipHash = hashIp(ip);
    const limit = await checkOtpRateLimit(ipHash, formattedPhone);
    if (!limit.ok) {
      return NextResponse.json({ success: false, error: limit.message }, { status: 429 });
    }

    const otpResult = await requestOtp(formattedPhone);

    if (!otpResult.success || !otpResult.otp) {
      return NextResponse.json(
        {
          success: false,
          error: otpResult.error || 'Unable to generate verification code.',
          cooldownRemaining: otpResult.cooldownRemaining,
        },
        { status: otpResult.cooldownRemaining ? 429 : 400 }
      );
    }

    // Count this SMS against the limits, then dispatch it via the Bharat Analytica gateway
    await logOtpSend(ipHash, formattedPhone);
    await sendOtpSms(formattedPhone, otpResult.otp);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully to your mobile number.',
      cooldown: 60,
    });
  } catch (err: unknown) {
    console.error('[OTP Send Error]', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: 'Unable to send the verification code right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
