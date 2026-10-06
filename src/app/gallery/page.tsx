import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/types/database';
import PageHeroBanner from '@/components/common/PageHeroBanner';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export const metadata: Metadata = {
  title: 'Gallery | Mahbub College Students Association',
  description:
    'Historical glimpses of student life, events, sports, and memorable campus traditions of Mahbub College.',
};

export default async function GalleryPage() {
  const { data, error } = await supabase
    .from('gallery')
    .select('id, name, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery items:', error.message);
  }

  const items: GalleryItem[] = data || [];

  return (
    <div className="w-full bg-[#F0F0F0] min-h-screen">
      {/* 1. HERO BANNER: Home page background image with Gallery title & metadata */}
      <PageHeroBanner
        title="Gallery"
        lastUpdated="July 2026"
      />

      {/* 2. GALLERY GRID SECTION: 3-column responsive grid displaying all items */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {items.length === 0 ? (
            <div className="text-center py-16 font-google-sans text-gray-500">
              No gallery items available at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {items.map((item) => (
                <div
                  key={item.id || item.name}
                  className="relative rounded-[14px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group bg-white border border-gray-300"
                >
                  {/* Photo container (No zoom functionality on click) */}
                  <div className="relative w-full h-[220px] sm:h-[240px] lg:h-[260px] bg-gray-200 overflow-hidden">
                    <Image
                      src={item.photo_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                    />
                  </div>

                  {/* Maroon Bottom Banner Strip matching Figma */}
                  <div className="bg-[#800000] px-4 py-3.5 flex items-center min-h-[52px]">
                    <h3 className="font-google-sans text-white font-semibold text-sm sm:text-[15px] leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
