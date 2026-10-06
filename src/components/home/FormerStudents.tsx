import { supabase } from '@/lib/supabase';
import { FormerStudent } from '@/types/database';
import FormerStudentsClient from './FormerStudentsClient';

export const revalidate = 60; // Revalidate dynamic data every 60 seconds

export default async function FormerStudents() {
  // Direct Server-Side Query to Supabase
  const { data, error } = await supabase
    .from('former_students')
    .select('id, name, title, batch, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching former students from Supabase:', error.message);
  }

  const students: FormerStudent[] = data || [];

  return <FormerStudentsClient students={students} />;
}
