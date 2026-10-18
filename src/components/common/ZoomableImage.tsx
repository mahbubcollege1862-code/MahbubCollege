'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface Props {
  /** Full-size image shown in the popup */
  src: string;
  /** Full caption shown under the popup image (the thumbnail can show a shortened version) */
  caption: string;
  /** Classes for the clickable thumbnail wrapper */
  className?: string;
  /** The thumbnail content, e.g. a next/image */
  children: React.ReactNode;
}

/**
 * Makes a thumbnail clickable. The photo opens in a popup with a close (X) button at the top right and the
 * full caption underneath. Closes with the X, the Escape key, or a click on the dark background.
 */
export default function ZoomableImage({ src, caption, className = '', children }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // keep the page from scrolling behind the popup
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${caption}`}
        className={`${className} cursor-zoom-in`}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={caption}
            onClick={() => setOpen(false)}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <figure className="flex max-h-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={caption}
                // fills the available space (scaling small photos up too) while keeping the whole photo visible
                className="h-[min(72vh,820px)] w-[min(92vw,1100px)] object-contain"
              />
              <figcaption className="max-h-[20vh] overflow-y-auto text-center font-google-sans text-white text-base sm:text-lg leading-snug">
                {caption}
              </figcaption>
            </figure>
          </div>,
          document.body
        )}
    </>
  );
}
