import { Client } from 'pg';

/**
 * Provisions or retrieves a user in Supabase auth.users for an alumnus.
 * This links the registration to an authentic Supabase auth user,
 * enabling Row Level Security (RLS) policies and future member login.
 */
export async function provisionAlumniUser(phone: string, fullName: string): Promise<string | null> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[authProvision] DATABASE_URL not configured. Skipping auth.users link.');
    return null;
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Standard E.164 phone format for Supabase auth: +91XXXXXXXXXX
    const e164Phone = phone.startsWith('+') ? phone : `+${phone}`;

    // 1. Check if user already exists in auth.users
    const existing = await client.query(
      'SELECT id FROM auth.users WHERE phone = $1 LIMIT 1',
      [e164Phone]
    );

    if (existing.rows.length > 0) {
      return existing.rows[0].id as string;
    }

    // 2. Insert new user into auth.users
    const insertRes = await client.query(
      `INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        phone,
        phone_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at
      ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        NULL,
        $1,
        now(),
        '{"provider": "phone", "providers": ["phone"]}'::jsonb,
        jsonb_build_object('full_name', $2, 'phone', $1),
        now(),
        now()
      ) RETURNING id`,
      [e164Phone, fullName]
    );

    if (insertRes.rows.length > 0) {
      return insertRes.rows[0].id as string;
    }

    return null;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[authProvision] Error provisioning auth user:', errorMsg);
    // Don't fail the entire registration if auth provisioning encounters an issue; return null
    return null;
  } finally {
    await client.end().catch(() => {});
  }
}
