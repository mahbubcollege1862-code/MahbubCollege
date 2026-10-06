'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryItem } from '@/types/database';

interface Props {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  // Display top 6 items on the home page as requested
  const displayedItems = items.slice(0, 6);

  return (
    <section id="gallery" className="relative w-full bg-[#F0F0F0] py-16 lg:py-24 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header (Figma Frame 1000001798) */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 font-google-sans">
          <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-3">
            Gallery
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed">
            Historical glimpses of student life, events, sports, and memorable campus traditions.
          </p>
        </div>

        {/* 3-Column x 2-Row Grid (6 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedItems.map((item) => (
            <div
              key={item.id || item.name}
              className="relative rounded-[14px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group bg-white border border-gray-300"
            >
              {/* Photo without zoom overlay */}
              <div className="relative w-full h-[220px] sm:h-[240px] lg:h-[260px] bg-gray-200 overflow-hidden">
                <Image
                  src={item.photo_url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                />
              </div>

              {/* Maroon Bottom Banner Strip (Matches Figma Frame 1000001842: rgb(128,0,0) height 50px) */}
              <div className="bg-[#800000] px-4 py-3.5 flex items-center min-h-[52px]">
                <h3 className="font-google-sans text-white font-semibold text-sm sm:text-[15px] leading-snug line-clamp-1">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button navigating to /gallery */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white font-google-sans font-semibold text-[15px] transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
          >
            View All Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
