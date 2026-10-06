import { NextResponse } from 'next/server';
import { formatIndianPhone, isValidIndianMobile, sendOtpSms } from '@/lib/sms';
import { requestOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone } = body;

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
    const otpResult = requestOtp(formattedPhone);

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

    // Dispatch SMS via Bharat Analytica Gateway
    await sendOtpSms(formattedPhone, otpResult.otp);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully to your mobile number.',
      cooldown: 60,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send verification SMS.';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
