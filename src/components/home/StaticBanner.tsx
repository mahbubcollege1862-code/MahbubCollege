import React from 'react';
import Image from 'next/image';

interface StatItem {
  icon: string;
  label: string;
  value: string;
}

const STATS: StatItem[] = [
  {
    icon: '/static-banner/Established_in.svg',
    label: 'Established In',
    value: '1862',
  },
  {
    icon: '/static-banner/Academic_excellence.svg',
    label: 'Academic Excellence',
    value: '160+ years',
  },
  {
    icon: '/static-banner/Students_shaped.svg',
    label: 'Students Shaped',
    value: '100K+',
  },
  {
    icon: '/static-banner/Heritage_buildings.svg',
    label: 'Heritage Buildings',
    value: '12 Blocks',
  },
];

export default function StaticBanner() {
  return (
    <section className="relative w-full bg-[#800000] border-t border-red-950/20 z-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-[120px] 2xl:px-[240px] py-6 lg:py-0 lg:h-[120px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12 w-full items-center justify-between">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3.5 sm:gap-4 shrink-0">
              {/* Exact 60x60 SVG Icon from Figma */}
              <div className="relative w-[60px] h-[60px] shrink-0">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={60}
                  height={60}
                  unoptimized
                  className="w-[60px] h-[60px] object-contain"
                />
              </div>

              {/* Exact Figma Typography: Label top, Value bottom */}
              <div className="flex flex-col font-google-sans justify-center">
                <span className="text-white text-[16px] sm:text-[18px] font-normal leading-[16px] sm:leading-[18px] tracking-normal">
                  {stat.label}
                </span>
                <span className="text-white text-[22px] sm:text-[25px] font-bold leading-[22px] sm:leading-[25px] tracking-normal mt-1">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
