import React from 'react';
import PageHeroBanner from '@/components/common/PageHeroBanner';

export interface LegalSection {
  title: string;
  content: string;
}

interface Props {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle = 'MahbubCollege Students Association (MCSA)',
  lastUpdated = 'July 2026',
  sections,
  children,
}: Props) {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. HERO BANNER: Home page background image with page-specific title & metadata */}
      <PageHeroBanner
        title={title}
        subtitle={subtitle}
        lastUpdated={lastUpdated}
      />

      {/* 2. BODY CONTENT: Matches Figma Frame 654 (1060px container, clean typography) */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1060px] mx-auto px-6 sm:px-8">
          <div className="space-y-12 sm:space-y-16">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3 font-google-sans">
                {section.title && (
                  <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight">
                    {section.title}
                  </h2>
                )}
                <div className="text-gray-800 text-[17px] sm:text-[18px] leading-relaxed whitespace-pre-line font-normal">
                  {section.content}
                </div>
              </div>
            ))}

            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
