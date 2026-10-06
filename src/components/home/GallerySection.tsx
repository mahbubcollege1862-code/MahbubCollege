import React from 'react';
import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/types/database';
import GalleryClient from './GalleryClient';
import { FALLBACK_GALLERY } from '@/lib/fallbackData';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function GallerySection() {
  let items: GalleryItem[] = [];

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('id, name, photo_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery from Supabase:', error.message);
    }

    if (data && data.length > 0) {
      items = data;
    } else {
      items = FALLBACK_GALLERY;
    }
  } catch (err) {
    console.error('Exception fetching gallery items:', err);
    items = FALLBACK_GALLERY;
  }

  return <GalleryClient items={items} />;
}
