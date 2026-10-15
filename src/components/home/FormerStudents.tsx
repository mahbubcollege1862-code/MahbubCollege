import { supabase } from '@/lib/supabase';
import { FormerStudent } from '@/types/database';
import FormerStudentsClient from './FormerStudentsClient';

export default async function FormerStudents() {
  let students: FormerStudent[] = [];

  try {
    const { data, error } = await supabase
      .from('former_students')
      .select('id, name, title, batch, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching former students from Supabase:', error.message);
    }

    students = data ?? [];
  } catch (err) {
    console.error('Exception fetching former students:', err);
  }

  return <FormerStudentsClient students={students} />;
}
