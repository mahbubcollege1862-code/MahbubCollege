'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LegacyBuilder } from '@/types/database';

interface Props {
  builders: LegacyBuilder[];
}

export default function LegacyBuildersClient({ builders }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
      const scrollAmount = card ? card.offsetWidth + 24 : 304;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  if (!builders || builders.length === 0) {
    return null;
  }

  return (
    <section id="legacy" className="relative w-full bg-[#F0F0F0] py-16 lg:py-24 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Row: Title & Subtitle + Carousel Arrows (Matches Figma Group 1000001653) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12 font-google-sans">
          <div>
            <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-2 sm:mb-3">
              The People Who Built Our Legacy
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed max-w-2xl">
              Honouring the founders and generous supporters whose vision and contributions helped shape our institution through generations.
            </p>
          </div>

          {/* Navigation Controls: Exactly matches Figma Group 1000001653 */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
              className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border border-[#800000] bg-white text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer active:scale-95 shadow-xs'
                  : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
              }`}
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next slide"
              className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-[#800000] text-white hover:bg-[#660000] cursor-pointer active:scale-95 shadow-xs'
                  : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
              }`}
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Carousel Row: 1 full card on mobile, 280x310 on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 snap-x snap-mandatory scroll-px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {builders.map((builder) => (
            <div
              key={builder.id || builder.name}
              className="w-[calc(100vw-48px)] sm:w-[265px] lg:w-[280px] shrink-0 snap-start group flex flex-col"
            >
              {/* Image Container: Full height proportion on mobile */}
              <div className="relative w-full h-[340px] sm:h-[290px] lg:h-[310px] rounded-[14px] overflow-hidden bg-white shadow-xs group-hover:shadow-md transition-all duration-300 border border-gray-300">
                <Image
                  src={builder.photo_url}
                  alt={builder.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 265px, 280px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-500 filter contrast-[1.02]"
                />
              </div>

              {/* Text Container */}
              <div className="mt-3 font-google-sans">
                <h3 className="text-gray-900 font-semibold text-[17px] sm:text-[19px] leading-snug line-clamp-1 group-hover:text-[#800000] transition-colors">
                  {builder.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-[14px] font-normal leading-snug line-clamp-1 mt-1">
                  {builder.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
