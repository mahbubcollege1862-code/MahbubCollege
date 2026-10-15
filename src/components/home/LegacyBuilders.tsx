import React from 'react';
import { supabase } from '@/lib/supabase';
import { LegacyBuilder } from '@/types/database';
import LegacyBuildersClient from './LegacyBuildersClient';

export default async function LegacyBuilders() {
  let builders: LegacyBuilder[] = [];

  try {
    const { data, error } = await supabase
      .from('legacy_builders')
      .select('id, name, title, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching legacy builders from Supabase:', error.message);
    }

    builders = data ?? [];
  } catch (err) {
    console.error('Exception fetching legacy builders:', err);
  }

  return <LegacyBuildersClient builders={builders} />;
}
