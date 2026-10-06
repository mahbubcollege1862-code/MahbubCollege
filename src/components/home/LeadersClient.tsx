'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Leader } from '@/types/database';

interface Props {
  headmasters: Leader[];
  committee: Leader[];
}

export default function LeadersClient({ headmasters, committee }: Props) {
  const headmastersScrollRef = useRef<HTMLDivElement>(null);
  const committeeScrollRef = useRef<HTMLDivElement>(null);

  const [headmastersCanLeft, setHeadmastersCanLeft] = useState(false);
  const [headmastersCanRight, setHeadmastersCanRight] = useState(true);

  const [committeeCanLeft, setCommitteeCanLeft] = useState(false);
  const [committeeCanRight, setCommitteeCanRight] = useState(true);

  const checkHeadmastersScroll = useCallback(() => {
    if (headmastersScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = headmastersScrollRef.current;
      setHeadmastersCanLeft(scrollLeft > 10);
      setHeadmastersCanRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const checkCommitteeScroll = useCallback(() => {
    if (committeeScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = committeeScrollRef.current;
      setCommitteeCanLeft(scrollLeft > 10);
      setCommitteeCanRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkHeadmastersScroll();
    checkCommitteeScroll();

    const hmEl = headmastersScrollRef.current;
    if (hmEl) {
      hmEl.addEventListener('scroll', checkHeadmastersScroll, { passive: true });
    }

    const cmEl = committeeScrollRef.current;
    if (cmEl) {
      cmEl.addEventListener('scroll', checkCommitteeScroll, { passive: true });
    }

    window.addEventListener('resize', checkHeadmastersScroll);
    window.addEventListener('resize', checkCommitteeScroll);

    return () => {
      if (hmEl) hmEl.removeEventListener('scroll', checkHeadmastersScroll);
      if (cmEl) cmEl.removeEventListener('scroll', checkCommitteeScroll);
      window.removeEventListener('resize', checkHeadmastersScroll);
      window.removeEventListener('resize', checkCommitteeScroll);
    };
  }, [checkHeadmastersScroll, checkCommitteeScroll]);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
    checkFn: () => void
  ) => {
    if (ref.current) {
      const card = ref.current.firstElementChild as HTMLElement | null;
      const scrollAmount = card ? card.offsetWidth + 24 : 304;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkFn, 350);
    }
  };

  return (
    <div id="leaders" className="w-full">
      {/* 1. Headmasters & Principals: Background White (Matches Figma 1:343) */}
      {headmasters.length > 0 && (
        <section className="relative w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12 font-google-sans">
              <div>
                <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-2 sm:mb-3">
                  The Leaders Who Shaped Our Institution
                </h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed max-w-2xl">
                  Honouring the Headmasters and Principals whose leadership, dedication and vision guided generations of students.
                </p>
              </div>

              {/* Navigation Controls: Figma Group 1000001653 */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => scroll(headmastersScrollRef, 'left', checkHeadmastersScroll)}
                  disabled={!headmastersCanLeft}
                  aria-label="Previous slide"
                  className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                    headmastersCanLeft
                      ? 'border border-[#800000] bg-white text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer active:scale-95 shadow-xs'
                      : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  onClick={() => scroll(headmastersScrollRef, 'right', checkHeadmastersScroll)}
                  disabled={!headmastersCanRight}
                  aria-label="Next slide"
                  className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                    headmastersCanRight
                      ? 'bg-[#800000] text-white hover:bg-[#660000] cursor-pointer active:scale-95 shadow-xs'
                      : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
                  }`}
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div
              ref={headmastersScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 snap-x snap-mandatory scroll-px-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {headmasters.map((leader) => (
                <div
                  key={leader.id || leader.name}
                  className="w-[calc(100vw-48px)] sm:w-[265px] lg:w-[280px] shrink-0 snap-start group flex flex-col"
                >
                  <div className="relative w-full h-[340px] sm:h-[290px] lg:h-[310px] rounded-[14px] overflow-hidden bg-gray-50 shadow-xs group-hover:shadow-md transition-all duration-300 border border-gray-200">
                    <Image
                      src={leader.photo_url}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 265px, 280px"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500 filter contrast-[1.02]"
                    />
                  </div>
                  <div className="mt-3 font-google-sans">
                    <h3 className="text-gray-900 font-semibold text-[17px] sm:text-[19px] leading-snug line-clamp-1 group-hover:text-[#800000] transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-[14px] font-normal leading-snug line-clamp-1 mt-1">
                      {leader.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Committee Members: Background Light Gray (Matches Figma 40:1769) */}
      {committee.length > 0 && (
        <section className="relative w-full bg-[#F0F0F0] py-16 lg:py-24 overflow-hidden border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12 font-google-sans">
              <div>
                <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-2 sm:mb-3">
                  The People Who Guided Our Institution
                </h2>
                <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed max-w-2xl">
                  Honouring the members of the Governing Committee whose leadership, service and commitment helped guide Mahbub College through the years.
                </p>
              </div>

              {/* Navigation Controls: Figma Group 1000001653 */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => scroll(committeeScrollRef, 'left', checkCommitteeScroll)}
                  disabled={!committeeCanLeft}
                  aria-label="Previous slide"
                  className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                    committeeCanLeft
                      ? 'border border-[#800000] bg-white text-[#800000] hover:bg-[#800000] hover:text-white cursor-pointer active:scale-95 shadow-xs'
                      : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  onClick={() => scroll(committeeScrollRef, 'right', checkCommitteeScroll)}
                  disabled={!committeeCanRight}
                  aria-label="Next slide"
                  className={`w-11 h-11 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all ${
                    committeeCanRight
                      ? 'bg-[#800000] text-white hover:bg-[#660000] cursor-pointer active:scale-95 shadow-xs'
                      : 'border border-gray-300 bg-white text-gray-300 cursor-not-allowed opacity-80'
                  }`}
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div
              ref={committeeScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 snap-x snap-mandatory scroll-px-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {committee.map((member) => (
                <div
                  key={member.id || member.name}
                  className="w-[calc(100vw-48px)] sm:w-[265px] lg:w-[280px] shrink-0 snap-start group flex flex-col"
                >
                  <div className="relative w-full h-[340px] sm:h-[290px] lg:h-[310px] rounded-[14px] overflow-hidden bg-white shadow-xs group-hover:shadow-md transition-all duration-300 border border-gray-300">
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 265px, 280px"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500 filter contrast-[1.02]"
                    />
                  </div>
                  <div className="mt-3 font-google-sans">
                    <h3 className="text-gray-900 font-semibold text-[17px] sm:text-[19px] leading-snug line-clamp-1 group-hover:text-[#800000] transition-colors uppercase">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-[14px] font-normal leading-snug line-clamp-2 mt-1">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

