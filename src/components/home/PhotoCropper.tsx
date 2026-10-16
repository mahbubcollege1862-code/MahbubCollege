'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const WINDOW = 280; // CSS px: the square crop window shown to the user
const OUTPUT = 400; // px: size of the saved square photo
const MAX_ZOOM = 3; // times the "fill the window" size

interface Props {
  file: File;
  onCancel: () => void;
  onDone: (blob: Blob) => void;
}

/**
 * Square crop window for the membership card photo. The member drags the photo and uses the
 * slider to zoom; all the way out shows the whole photo (white fills any gap), zooming in fills the
 * window. The result is a 400x400 JPEG (about 30-60 KB).
 */
export default function PhotoCropper({ file, onCancel, onDone }: Props) {
  const [url, setUrl] = useState('');
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [error, setError] = useState('');
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const drag = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  // Load the chosen file; once decoded, start with the window filled, keeping the top of the photo
  // (heads) in view.
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    const probe = new Image();
    probe.onload = () => {
      const w = probe.naturalWidth;
      const h = probe.naturalHeight;
      const cover = Math.max(WINDOW / w, WINDOW / h);
      setUrl(objectUrl);
      setNatural({ w, h });
      setScale(cover);
      setPos({ x: (WINDOW - w * cover) / 2, y: h * cover >= WINDOW ? 0 : (WINDOW - h * cover) / 2 });
    };
    probe.onerror = () => setError('This image could not be opened. Please choose another photo.');
    probe.src = objectUrl;
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const limits = useMemo(() => {
    if (!natural) return null;
    const fit = Math.min(WINDOW / natural.w, WINDOW / natural.h); // whole photo visible
    const cover = Math.max(WINDOW / natural.w, WINDOW / natural.h); // window completely filled
    return { fit, cover, max: Math.max(cover * MAX_ZOOM, fit) };
  }, [natural]);

  const clamp = (x: number, y: number, s: number) => {
    if (!natural) return { x, y };
    const w = natural.w * s;
    const h = natural.h * s;
    return {
      x: w >= WINDOW ? Math.min(0, Math.max(WINDOW - w, x)) : Math.min(WINDOW - w, Math.max(0, x)),
      y: h >= WINDOW ? Math.min(0, Math.max(WINDOW - h, y)) : Math.min(WINDOW - h, Math.max(0, y)),
    };
  };

  const zoomTo = (next: number) => {
    if (!natural) return;
    // keep the point at the center of the window fixed while zooming
    const cx = (WINDOW / 2 - pos.x) / scale;
    const cy = (WINDOW / 2 - pos.y) / scale;
    setScale(next);
    setPos(clamp(WINDOW / 2 - cx * next, WINDOW / 2 - cy * next, next));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setPos(clamp(drag.current.ox + e.clientX - drag.current.px, drag.current.oy + e.clientY - drag.current.py, scale));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const handleDone = () => {
    const img = imgRef.current;
    if (!img || !natural) return;
    const k = OUTPUT / WINDOW;
    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Your browser cannot process images.');
      return;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, OUTPUT, OUTPUT);
    ctx.drawImage(img, pos.x * k, pos.y * k, natural.w * scale * k, natural.h * scale * k);
    canvas.toBlob(
      (blob) => (blob ? onDone(blob) : setError('Could not process the image.')),
      'image/jpeg',
      0.85
    );
  };

  const zoomValue = limits && limits.max > limits.fit ? (scale - limits.fit) / (limits.max - limits.fit) : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Adjust your photo">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-gray-900 shadow-2xl">
        <h3 className="text-lg font-semibold">Adjust your photo</h3>
        <p className="mt-1 text-sm text-gray-600">Drag to position, use the slider to zoom. This is how it will appear on your card.</p>

        <div
          className="relative mx-auto mt-4 touch-none select-none overflow-hidden rounded-lg border-2 border-[#800000] bg-white cursor-grab active:cursor-grabbing"
          style={{ width: WINDOW, height: WINDOW }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {url && natural && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={url}
              alt="Photo being adjusted"
              draggable={false}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: natural.w * scale,
                height: natural.h * scale,
                maxWidth: 'none',
              }}
            />
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-gray-500">Zoom out</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={zoomValue}
            disabled={!limits}
            onChange={(e) => limits && zoomTo(limits.fit + Number(e.target.value) * (limits.max - limits.fit))}
            className="flex-1 accent-[#800000]"
            aria-label="Zoom"
          />
          <span className="text-xs text-gray-500">In</span>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="h-10 px-4 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDone}
            disabled={!natural}
            className="h-10 px-5 rounded-lg bg-[#800000] text-white text-sm font-medium hover:bg-[#660000] disabled:opacity-60 cursor-pointer"
          >
            Use photo
          </button>
        </div>
      </div>
    </div>
  );
}
