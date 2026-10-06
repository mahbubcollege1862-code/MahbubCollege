import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { HeritageItem } from '@/types/database';

export const revalidate = 60; // Dynamic ISR revalidation every 60 seconds

export default async function Heritage() {
  // Query Supabase directly for active heritage items ordered by display_order
  const { data, error } = await supabase
    .from('heritage')
    .select('id, name, photo_url, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching heritage items from Supabase:', error.message);
  }

  const items: HeritageItem[] = data || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="heritage" className="relative w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header (Matches Figma Frame 1000001799) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 font-google-sans">
          <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-3">
            Our Heritage, Our Pride
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed">
            A journey through the buildings, memories and history that have shaped generations
          </p>
        </div>

        {/* 4-Column Responsive Grid (Matches Figma Frame 1000001733: 343.5 x 316.5 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id || item.name}
              className="bg-white rounded-[20px] p-4 sm:p-5 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Container: Aspect ratio ~ 300/215 matching Figma 299.5x214.5 */}
              <div className="relative w-full aspect-[300/215] rounded-[12px] overflow-hidden bg-gray-100 border border-black/5">
                <Image
                  src={item.photo_url}
                  alt={item.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-500 filter contrast-[1.02]"
                />
              </div>

              {/* Building Name (Matches Figma Google Sans Flex, 16px, w600) */}
              <div className="mt-4 flex-1 flex items-start">
                <h3 className="font-google-sans font-semibold text-gray-900 text-[15px] sm:text-[16px] leading-snug line-clamp-2 group-hover:text-red-950 transition-colors">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
