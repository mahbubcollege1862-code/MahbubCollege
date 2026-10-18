import { NextResponse } from 'next/server';
import { formatIndianPhone, sendMembershipSms } from '@/lib/sms';
import { isPhoneVerified, consumePhoneVerification } from '@/lib/otpStore';
import { getAdminClient } from '@/lib/adminClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, relativeName, dob, branch, batchYear, phone, agreed, photoUrl } = body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    // Reject oversized or malformed input before it reaches the database
    const tooLong = (v: unknown, max: number) => typeof v === 'string' && v.length > max;
    if (
      tooLong(fullName, 100) ||
      tooLong(relativeName, 100) ||
      tooLong(branch, 100) ||
      tooLong(phone, 20) ||
      (relativeName != null && typeof relativeName !== 'string') ||
      (branch != null && typeof branch !== 'string') ||
      (dob != null && !(typeof dob === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dob)))
    ) {
      return NextResponse.json({ success: false, error: 'Please check the details you entered.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required.' },
        { status: 400 }
      );
    }

    // Every field on the registration form is mandatory
    if (
      typeof relativeName !== 'string' || !relativeName.trim() ||
      typeof dob !== 'string' ||
      typeof branch !== 'string' || !branch.trim() ||
      !photoUrl
    ) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all the fields, including your photo.' },
        { status: 400 }
      );
    }

    if (!batchYear || !/^\d{4}$/.test(String(batchYear).trim())) {
      return NextResponse.json(
        { success: false, error: 'Batch (year of leaving) is required.' },
        { status: 400 }
      );
    }

    if (!agreed) {
      return NextResponse.json(
        { success: false, error: 'Please accept the certification and terms to proceed.' },
        { status: 400 }
      );
    }

    // Only accept photos uploaded to our own member-photos bucket
    const photoPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqwxpivtkevcqantxrcl.supabase.co'}/storage/v1/object/public/member-photos/`;
    if (photoUrl && (typeof photoUrl !== 'string' || !photoUrl.startsWith(photoPrefix))) {
      return NextResponse.json({ success: false, error: 'Invalid photo.' }, { status: 400 });
    }

    const formattedPhone = formatIndianPhone(phone);

    // Verify that this phone number completed OTP verification
    if (!(await isPhoneVerified(formattedPhone))) {
      return NextResponse.json(
        { success: false, error: 'Please verify your mobile number with the OTP code first.' },
        { status: 400 }
      );
    }

    // 1. Create the registration and its membership ID atomically in the database
    const { data, error } = await getAdminClient().rpc('register_member', {
      p_user_id: null,
      p_full_name: fullName.trim(),
      p_relative_name: relativeName ? relativeName.trim() : null,
      p_dob: dob || null,
      p_branch: branch || null,
      p_batch_year: String(batchYear).trim(),
      p_phone: formattedPhone,
      p_photo_url: photoUrl || null,
    });

    if (error) {
      console.error('[Register API] register_member error:', error.message);
      if (error.message.includes('PHONE_ALREADY_REGISTERED')) {
        return NextResponse.json(
          { success: false, error: 'This mobile number is already registered.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Registration failed. Please try again.' },
        { status: 500 }
      );
    }

    // 2. Consume verified session
    await consumePhoneVerification(formattedPhone);

    // 3. Confirmation SMS with the membership ID. A gateway failure must not undo the registration.
    const membershipId: string = data?.membership_id ?? '';
    const idMatch = membershipId.match(/^MAHBUB - (\d{4}) - (\d+)$/);
    if (idMatch) {
      try {
        await sendMembershipSms(formattedPhone, idMatch[1], idMatch[2]);
      } catch (smsErr) {
        console.error('[Register API] Membership SMS failed:', smsErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      membershipId: data?.membership_id,
    });
  } catch (err: unknown) {
    console.error('[Register API Error]', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
