import { supabase } from '@/lib/supabase';
import { FormerStudent } from '@/types/database';
import FormerStudentsClient from './FormerStudentsClient';

export const revalidate = 60; // Revalidate dynamic data every 60 seconds

const FALLBACK_STUDENTS: FormerStudent[] = [
  { id: 1, name: 'Admiral Ram Dass Katari', title: 'Chief of Naval Staff (CNS)', batch: '1928', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/admiral_ram_dass_katari.png', display_order: 1, is_active: true },
  { id: 2, name: 'Air Marshal P.J Jayakumar', title: 'Vice Chief of Air Staff', batch: '1958', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/air_marshal_pj_jayakumar.png', display_order: 2, is_active: true },
  { id: 3, name: 'M. Shambunath Singh', title: 'Commander Indian Navy', batch: '1962', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/m_shambunath_singh.png', display_order: 3, is_active: true },
  { id: 4, name: 'Justice M. S. K Jaiswal', title: 'Judge, High Court of Telangana & President', batch: '1968', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/justice_msk_jaiswal.png', display_order: 4, is_active: true },
  { id: 5, name: 'Dr. Mohan Kanda', title: 'IAS Officer and Former Chief Secretary (AP)', batch: '1961', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/dr_mohan_kanda.png', display_order: 5, is_active: true },
  { id: 6, name: 'Srinivas Anandaraman', title: 'Former Director-General of Police', batch: '1971', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/srinivas_anandaraman.png', display_order: 6, is_active: true },
  { id: 7, name: 'M. L. Jaisimha', title: 'Former Indian Test Cricketer', batch: '1954', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/ml_jaisimha.png', display_order: 7, is_active: true },
  { id: 8, name: 'N. Mukesh Kumar', title: 'Former Indian Field Hockey Player', batch: '1984', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/n_mukesh_kumar.png', display_order: 8, is_active: true },
  { id: 9, name: 'Shyam Benegal', title: 'Film Director & Screenwriter', batch: '1950', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/shyam_benegal.png', display_order: 9, is_active: true },
  { id: 10, name: 'Col. T. Mahesh Kumar', title: '1970 Batch', batch: '1970', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/col_t_mahesh_kumar.png', display_order: 10, is_active: true },
  { id: 11, name: 'MANEK S. MADON', title: '1970 BATCH', batch: '1970', photo_url: 'https://fqwxpivtkevcqantxrcl.supabase.co/storage/v1/object/public/media/former-students/manek_s_madon.png', display_order: 11, is_active: true },
];

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

    if (data && data.length > 0) {
      students = data;
    } else {
      students = FALLBACK_STUDENTS;
    }
  } catch (err) {
    console.error('Exception fetching former students:', err);
    students = FALLBACK_STUDENTS;
  }

  return <FormerStudentsClient students={students} />;
}
