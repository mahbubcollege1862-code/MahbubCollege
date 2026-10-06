import { NextResponse } from 'next/server';
import { formatIndianPhone } from '@/lib/sms';
import { verifyOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, otp } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required.' },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 6-digit verification code.' },
        { status: 400 }
      );
    }

    const formattedPhone = formatIndianPhone(phone);
    const result = verifyOtp(formattedPhone, otp);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Verification failed.',
          attemptsRemaining: result.attemptsRemaining,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mobile number verified successfully.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to verify code.';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
