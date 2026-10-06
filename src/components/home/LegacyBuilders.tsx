import React from 'react';
import { supabase } from '@/lib/supabase';
import { LegacyBuilder } from '@/types/database';
import LegacyBuildersClient from './LegacyBuildersClient';
import { FALLBACK_LEGACY_BUILDERS } from '@/lib/fallbackData';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

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

    if (data && data.length > 0) {
      builders = data;
    } else {
      builders = FALLBACK_LEGACY_BUILDERS;
    }
  } catch (err) {
    console.error('Exception fetching legacy builders:', err);
    builders = FALLBACK_LEGACY_BUILDERS;
  }

  return <LegacyBuildersClient builders={builders} />;
}
