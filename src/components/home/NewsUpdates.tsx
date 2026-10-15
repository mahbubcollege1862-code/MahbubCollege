import React from 'react';
import { supabase } from '@/lib/supabase';
import { NewsUpdate } from '@/types/database';
import NewsUpdatesClient from './NewsUpdatesClient';

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

    news = data ?? [];
  } catch (err) {
    console.error('Exception fetching news:', err);
  }

  return <NewsUpdatesClient news={news} />;
}
