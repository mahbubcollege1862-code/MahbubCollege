import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-black">
      {/* HERO MAIN STAGE (Figma: Hero Section - 1:879, w: 1920, h: 816) */}
      <div className="relative w-full flex flex-col lg:flex-row lg:items-center lg:min-h-[640px] lg:h-[816px]">
        {/* Photograph: shown in full above the text on mobile (1920x816), full-bleed background from lg up */}
        <div className="relative w-full aspect-[1920/816] lg:aspect-auto lg:absolute lg:inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Mahbub College Historic Campus"
            fill
            priority
            quality={95}
            className="object-cover object-center filter contrast-[1.05]"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to ensure text contrast against campus architecture */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent hidden lg:block" />
        </div>

        {/* Content Container (Matches Figma Frame 1000001831: w=805, h=461) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-10 sm:py-12 lg:py-0">
          <div className="max-w-[805px] flex flex-col justify-center">
            {/* 1. Eyebrow Label (Figma: Google Sans Flex, 25px, Regular, 31.3px line-height, White) */}
            <p className="font-google-sans text-white text-lg sm:text-xl lg:text-[25px] font-normal leading-[31.3px] tracking-normal mb-3 sm:mb-4">
              Mahbub College Students Association
            </p>

            {/* 2. Main Headline (Figma: Google Sans Flex, 72px, SemiBold, 80px line-height, White) */}
            <h1 className="font-google-sans font-semibold text-white text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.12] lg:leading-[80px] tracking-tight mb-4 sm:mb-6">
              Honoring the past.
              <br />
              Connecting the present.
              <br />
              Inspiring the future.
            </h1>

            {/* 3. Subtitle / Narrative (Figma: Google Sans Flex, 25px, Regular, 31.3px line-height, White, max-w=560px) */}
            <p className="font-google-sans text-white text-base sm:text-xl lg:text-[25px] font-normal leading-snug sm:leading-[31.3px] max-w-[560px] mb-8 sm:mb-10">
              Reconnect with a legacy that has shaped generations for more than 160 years.
            </p>

            {/* 4. CTA Buttons Row (Figma: Frame 1000001828: Frame 6 w=128 h=59 r=40 & Frame 8 w=198 h=59 r=40) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary CTA - Join Us (Figma Frame 6: 128x59, r:40, bg:#800000, 20px w600) */}
              <Link
                href="/#contact"
                className="w-[128px] h-[54px] sm:h-[59px] rounded-[40px] bg-[#800000] hover:bg-[#680000] active:scale-[0.97] transition-all flex items-center justify-center font-google-sans font-semibold text-white text-[18px] sm:text-[20px] leading-[19px] shadow-lg shadow-black/40 hover:shadow-[#800000]/30"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
