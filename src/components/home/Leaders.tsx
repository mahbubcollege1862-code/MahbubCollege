import React from 'react';
import { supabase } from '@/lib/supabase';
import { Leader } from '@/types/database';
import LeadersClient from './LeadersClient';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function Leaders() {
  const { data, error } = await supabase
    .from('leaders')
    .select('id, name, title, category, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching leaders from Supabase:', error.message);
  }

  const allLeaders: Leader[] = data || [];
  const headmasters = allLeaders.filter((l) => l.category === 'headmaster');
  const committee = allLeaders.filter((l) => l.category === 'committee');

  if (headmasters.length === 0 && committee.length === 0) {
    return null;
  }

  return <LeadersClient headmasters={headmasters} committee={committee} />;
}
