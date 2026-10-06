import React from 'react';
import { supabase } from '@/lib/supabase';
import { NewsUpdate } from '@/types/database';
import NewsUpdatesClient from './NewsUpdatesClient';
import { FALLBACK_NEWS } from '@/lib/fallbackData';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function NewsUpdates() {
  let news: NewsUpdate[] = [];

  try {
    const { data, error } = await supabase
      .from('news_and_updates')
      .select('id, title, secondary_text, photo_url, external_link, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching news from Supabase:', error.message);
    }

    if (data && data.length > 0) {
      news = data;
    } else {
      news = FALLBACK_NEWS;
    }
  } catch (err) {
    console.error('Exception fetching news:', err);
    news = FALLBACK_NEWS;
  }

  return <NewsUpdatesClient news={news} />;
}
