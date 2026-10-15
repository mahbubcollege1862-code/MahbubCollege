import { getAdminClient } from '@/lib/adminClient';

export interface MemberRecord {
  full_name: string;
  relative_name: string | null;
  batch_year: string;
  membership_id: string;
  photo_url: string | null;
}

/**
 * Reads a member by phone number with the server-only service role key, so registration data is
 * never readable with the public anon key.
 */
export async function findMemberByPhone(phone: string): Promise<MemberRecord | null> {
  const { data, error } = await getAdminClient()
    .from('registrations')
    .select('full_name, relative_name, batch_year, membership_id, photo_url')
    .eq('phone', phone)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as MemberRecord | null) ?? null;
}
