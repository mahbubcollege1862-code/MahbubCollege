'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NewsUpdate } from '@/types/database';

interface Props {
  news: NewsUpdate[];
}

export default function NewsUpdatesClient({ news }: Props) {
  const [showAll, setShowAll] = useState(false);

  if (!news || news.length === 0) {
    return null;
  }

  const displayedNews = showAll ? news : news.slice(0, 3);

  return (
    <section id="news" className="relative w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 font-google-sans">
          <h2 className="text-gray-900 font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-tight tracking-tight mb-3">
            News and Updates
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed">
            Reconnect. Celebrate. Contribute. Be a part of our legacy.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((item) => {
            const articleUrl =
              item.external_link ||
              `https://www.google.com/search?q=${encodeURIComponent(item.title + ' Mahbub College')}`;

            return (
              <div
                key={item.id || item.title}
                className="bg-white rounded-[16px] overflow-hidden border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <a
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden block"
                >
                  <Image
                    src={item.photo_url}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                  />
                </a>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between font-google-sans">
                  <div>
                    {item.secondary_text && (
                      <span className="text-[12px] font-medium uppercase tracking-wider text-[#800000] mb-2 block">
                        {item.secondary_text}
                      </span>
                    )}
                    <h3 className="text-gray-900 font-semibold text-[17px] sm:text-[18px] leading-snug line-clamp-3 group-hover:text-[#800000] transition-colors">
                      <a href={articleUrl} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <a
                      href={articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#800000] font-semibold text-sm hover:underline cursor-pointer group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Updates Button (Figma Frame 7: 234 x 49 pill) */}
        {news.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white font-google-sans font-semibold text-[15px] transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
            >
              {showAll ? 'Show Fewer Updates' : 'View All Updates'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
