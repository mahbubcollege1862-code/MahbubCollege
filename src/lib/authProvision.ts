import { Client } from 'pg';
import { createClient } from '@supabase/supabase-js';

/**
 * Provisions or retrieves an authenticated user in Supabase auth.users for an alumnus.
 * This links the registration to an authentic Supabase auth user,
 * enabling Row Level Security (RLS) policies, member management, and future login.
 *
 * Supports dual-mode:
 * 1. Official Supabase Admin API (via SUPABASE_SERVICE_ROLE_KEY)
 * 2. Secure PostgreSQL stored procedure (via DATABASE_URL)
 */
export async function provisionAlumniUser(phone: string, fullName: string): Promise<string | null> {
  const e164Phone = phone.startsWith('+') ? phone : `+${phone}`;

  // Method 1: Official Supabase Admin API (if SUPABASE_SERVICE_ROLE_KEY is configured)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    try {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        phone: e164Phone,
        phone_confirm: true,
        user_metadata: { full_name: fullName, role: 'alumni' },
      });

      if (!error && data?.user?.id) {
        console.log('[authProvision] Successfully created auth user via Admin API:', data.user.id);
        return data.user.id;
      }

      // If user already exists, fetch their ID
      if (error && error.message?.toLowerCase().includes('already')) {
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
        const existing = listData?.users?.find((u) => u.phone === e164Phone);
        if (existing?.id) {
          console.log('[authProvision] Found existing auth user via Admin API:', existing.id);
          return existing.id;
        }
      }

      console.warn('[authProvision] Admin API returned error, falling back to DB procedure:', error?.message);
    } catch (adminErr) {
      console.warn('[authProvision] Admin API exception, falling back to DB procedure:', adminErr);
    }
  }

  // Method 2: Direct PostgreSQL database procedure (via DATABASE_URL)
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[authProvision] Neither SUPABASE_SERVICE_ROLE_KEY nor DATABASE_URL is configured.');
    return null;
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const res = await client.query(
      'SELECT public.provision_alumni_auth_user($1, $2) as user_id',
      [e164Phone, fullName]
    );

    const userId = res.rows[0]?.user_id as string | undefined;
    if (userId) {
      console.log('[authProvision] Successfully provisioned auth user via DB procedure:', userId);
      return userId;
    }

    return null;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[authProvision] Error executing provision_alumni_auth_user:', errorMsg);
    return null;
  } finally {
    await client.end().catch(() => {});
  }
}
