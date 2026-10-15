import { NextResponse } from 'next/server';
import { formatIndianPhone } from '@/lib/sms';
import { isPhoneVerified, consumePhoneVerification } from '@/lib/otpStore';
import { findMemberByPhone } from '@/lib/adminDb';

/** Returns an existing member's card details once their phone number has passed OTP verification. */
export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ success: false, error: 'Mobile number is required.' }, { status: 400 });
    }

    const formattedPhone = formatIndianPhone(phone);

    if (!(await isPhoneVerified(formattedPhone))) {
      return NextResponse.json(
        { success: false, error: 'Please verify your mobile number with the OTP code first.' },
        { status: 400 }
      );
    }

    const member = await findMemberByPhone(formattedPhone);
    await consumePhoneVerification(formattedPhone);

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'No membership was found for this mobile number. Please register first.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      member: {
        fullName: member.full_name,
        relativeName: member.relative_name,
        batchYear: member.batch_year,
        membershipId: member.membership_id,
        photoUrl: member.photo_url,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unable to look up membership.';
    console.error('[Membership Lookup Error]', errorMsg);
    return NextResponse.json({ success: false, error: 'Unable to look up membership. Please try again.' }, { status: 500 });
  }
}
