import React from 'react';
import { supabase } from '@/lib/supabase';
import { NewsUpdate } from '@/types/database';
import NewsUpdatesClient from './NewsUpdatesClient';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function NewsUpdates() {
  const { data, error } = await supabase
    .from('news_and_updates')
    .select('id, title, secondary_text, photo_url, external_link, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching news from Supabase:', error.message);
  }

  const news: NewsUpdate[] = data || [];

  if (news.length === 0) {
    return null;
  }

  return <NewsUpdatesClient news={news} />;
}
