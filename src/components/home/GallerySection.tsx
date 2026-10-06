import React from 'react';
import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/types/database';
import GalleryClient from './GalleryClient';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function GallerySection() {
  const { data, error } = await supabase
    .from('gallery')
    .select('id, name, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery from Supabase:', error.message);
  }

  const items: GalleryItem[] = data || [];

  if (items.length === 0) {
    return null;
  }

  return <GalleryClient items={items} />;
}
