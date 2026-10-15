import React from 'react';
import { supabase } from '@/lib/supabase';
import { Leader } from '@/types/database';
import LeadersClient from './LeadersClient';

export default async function Leaders() {
  let leaders: Leader[] = [];

  try {
    const { data, error } = await supabase
      .from('leaders')
      .select('id, name, title, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching leaders from Supabase:', error.message);
    }

    leaders = data ?? [];
  } catch (err) {
    console.error('Exception fetching leaders:', err);
  }

  return <LeadersClient headmasters={leaders} />;
}
