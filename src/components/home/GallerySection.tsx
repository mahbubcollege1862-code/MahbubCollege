import React from 'react';
import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/types/database';
import GalleryClient from './GalleryClient';

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

    items = data ?? [];
  } catch (err) {
    console.error('Exception fetching gallery items:', err);
  }

  return <GalleryClient items={items} />;
}
