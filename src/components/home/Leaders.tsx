import React from 'react';
import { supabase } from '@/lib/supabase';
import { Leader } from '@/types/database';
import LeadersClient from './LeadersClient';
import { FALLBACK_HEADMASTERS, FALLBACK_COMMITTEE } from '@/lib/fallbackData';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function Leaders() {
  let headmasters: Leader[] = [];
  let committee: Leader[] = [];

  try {
    const { data, error } = await supabase
      .from('leaders')
      .select('id, name, title, category, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching leaders from Supabase:', error.message);
    }

    const allLeaders: Leader[] = data && data.length > 0 ? data : [];
    headmasters = allLeaders.filter((l) => l.category === 'headmaster');
    committee = allLeaders.filter((l) => l.category === 'committee');

    if (headmasters.length === 0) headmasters = FALLBACK_HEADMASTERS;
    if (committee.length === 0) committee = FALLBACK_COMMITTEE;
  } catch (err) {
    console.error('Exception fetching leaders:', err);
    headmasters = FALLBACK_HEADMASTERS;
    committee = FALLBACK_COMMITTEE;
  }

  return <LeadersClient headmasters={headmasters} committee={committee} />;
}
