'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FormerStudent } from '@/types/database';

interface Props {
  students: FormerStudent[];
}

export default function FormerStudentsClient({ students }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
      const scrollAmount = card ? card.offsetWidth + 20 : 284;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!students || students.length === 0) {
    return null;
  }

  return (
    <section id="alumni" className="relative w-full bg-[#800000] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Row: Title & Subtitle + Carousel Arrows (Matches Figma Frame 1000001798) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12 font-google-sans">
          <div>
            <h2 className="text-white font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-2 sm:mb-3">
              Former Students Who Made Us Proud
            </h2>
            <p className="text-white/90 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed max-w-2xl">
              Celebrating the remarkable individuals who began their journey at Mahbub College.
            </p>
          </div>

          {/* Navigation Controls (Figma Group 1000001653: 50x50 round buttons) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous slide"
              className="w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full border border-white/40 bg-white/10 hover:bg-white/25 hover:border-white active:scale-95 transition-all flex items-center justify-center text-white shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next slide"
              className="w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full border border-white/40 bg-white/10 hover:bg-white/25 hover:border-white active:scale-95 transition-all flex items-center justify-center text-white shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Row (Matches Figma Frame 1000001826: 1 card on mobile, 264x370 on desktop) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 snap-x snap-mandatory scroll-px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {students.map((student) => (
            <div
              key={student.id || student.name}
              className="relative w-[calc(100vw-48px)] sm:w-[264px] h-[390px] sm:h-[370px] shrink-0 snap-start rounded-[14px] overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 bg-gray-900 border border-white/25"
            >
              {/* Card Photo from Supabase */}
              {student.photo_url && (
                <Image
                  src={student.photo_url}
                  alt={student.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 264px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                />
              )}

              {/* Dark Gradient Overlay for Typography Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

              {/* Card Meta Content (Matches Figma Frame 1000001742) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 font-google-sans z-10">
                <h3 className="text-white font-semibold text-base sm:text-[18px] leading-snug drop-shadow-sm group-hover:text-red-200 transition-colors">
                  {student.name}
                </h3>
                <p className="text-gray-300 text-xs sm:text-[13px] font-normal leading-tight mt-1 line-clamp-2">
                  {student.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
