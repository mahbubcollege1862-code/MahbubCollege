import React from 'react';
import { supabase } from '@/lib/supabase';
import { LegacyBuilder } from '@/types/database';
import LegacyBuildersClient from './LegacyBuildersClient';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function LegacyBuilders() {
  const { data, error } = await supabase
    .from('legacy_builders')
    .select('id, name, title, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching legacy builders from Supabase:', error.message);
  }

  const builders: LegacyBuilder[] = data || [];

  if (builders.length === 0) {
    return null;
  }

  return <LegacyBuildersClient builders={builders} />;
}
