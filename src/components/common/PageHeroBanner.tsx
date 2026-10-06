import React from 'react';
import Image from 'next/image';

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export default function PageHeroBanner({
  title,
  subtitle,
  lastUpdated,
}: PageHeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[360px] sm:min-h-[420px] lg:h-[480px] flex items-center">
      {/* Exact Home Page Background Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Mahbub College Historic Campus"
          fill
          priority
          quality={95}
          className="object-cover object-center filter contrast-[1.05] brightness-95"
          sizes="100vw"
        />
        {/* Exact gradient overlay matching Home Hero & Figma Screenshots */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container: Title, Subtitle, and Last Updated directly on top of background */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-[120px] 2xl:px-[240px] w-full py-16 sm:py-20 lg:py-0">
        <div className="max-w-[850px] flex flex-col justify-center">
          <h1 className="font-google-sans font-bold text-white text-3xl sm:text-5xl lg:text-[56px] leading-[1.15] tracking-tight drop-shadow-sm">
            {title}
          </h1>

          {subtitle && (
            <p className="font-google-sans text-white/95 text-lg sm:text-xl lg:text-[22px] font-normal leading-snug sm:leading-[31.3px] mt-3 sm:mt-4">
              {subtitle}
            </p>
          )}

          {lastUpdated && (
            <p className="font-google-sans text-white/80 font-normal text-base sm:text-lg mt-2.5 sm:mt-3">
              Last Updated: <span className="text-white font-medium">{lastUpdated}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
