import React from 'react';
import { supabase } from '@/lib/supabase';
import { Leader } from '@/types/database';
import GuidesClient from './GuidesClient';

export default async function Guides() {
  let guides: Leader[] = [];

  try {
    const { data, error } = await supabase
      .from('Guides')
      .select('id, name, title, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching guides from Supabase:', error.message);
    }

    guides = data ?? [];
  } catch (err) {
    console.error('Exception fetching guides:', err);
  }

  return <GuidesClient committee={guides} />;
}
