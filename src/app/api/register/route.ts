import { NextResponse } from 'next/server';
import { formatIndianPhone } from '@/lib/sms';
import { isPhoneVerified, consumePhoneVerification } from '@/lib/otpStore';
import { provisionAlumniUser } from '@/lib/authProvision';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, relativeName, dob, branch, batchYear, phone, agreed } = body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required.' },
        { status: 400 }
      );
    }

    if (!agreed) {
      return NextResponse.json(
        { success: false, error: 'Please accept the certification and terms to proceed.' },
        { status: 400 }
      );
    }

    const formattedPhone = formatIndianPhone(phone);

    // Verify that this phone number completed OTP verification
    if (!isPhoneVerified(formattedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please verify your mobile number with the OTP code first.' },
        { status: 400 }
      );
    }

    // 1. Provision / link user in Supabase auth.users
    const userId = await provisionAlumniUser(formattedPhone, fullName.trim());

    // 2. Insert record into public.registrations
    const { data, error } = await supabase.from('registrations').insert([
      {
        user_id: userId || null,
        full_name: fullName.trim(),
        relative_name: relativeName ? relativeName.trim() : null,
        dob: dob || null,
        branch: branch || null,
        batch_year: batchYear || null,
        phone: formattedPhone,
      },
    ]).select();

    if (error) {
      console.error('[Register API] Database insert error:', error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // 3. Consume verified session
    consumePhoneVerification(formattedPhone);

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      data: data?.[0],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An error occurred during registration.';
    console.error('[Register API Error]', errorMsg);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
