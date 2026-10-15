import React, { forwardRef, useMemo } from 'react';
import QRCode from 'qrcode';
import { CARD_PLACEHOLDER, CARD_STATIC_MARKUP } from './cardStatic';

export const CARD_WIDTH = 440;
export const CARD_HEIGHT = 276;
export const CARD_WEBSITE_URL = 'https://mahbubcollege.com';

export interface MembershipCardData {
  fullName: string;
  relativeName?: string | null;
  batchYear: string;
  membershipId: string;
  /** Public URL or data URL of the member photo. A silhouette is shown when empty. */
  photoUrl?: string | null;
}

const FONT_FAMILY = "'Google Sans Flex Variable', 'Google Sans Flex', system-ui, sans-serif";
const TEXT_COLOR = '#272727';
const NAME_MAX_WIDTH = 134; // text starts at x=173; the QR code begins at x=328
const RELATIVE_MAX_WIDTH = 145;

let measureCtx: CanvasRenderingContext2D | null | undefined;

/** Width of `text` in card units. Uses the real font via canvas, with an estimate as fallback. */
function measure(text: string, size: number, weight: number): number {
  if (typeof document !== 'undefined') {
    if (measureCtx === undefined) measureCtx = document.createElement('canvas').getContext('2d');
    if (measureCtx) {
      measureCtx.font = `${weight} 100px ${FONT_FAMILY}`;
      return (measureCtx.measureText(text).width * size) / 100;
    }
  }
  return text.length * size * 0.55;
}

/** Greedy word wrap. `widthOf(text, lineIndex)` returns the rendered width of a candidate line. */
function wrapWords(words: string[], maxWidth: number, widthOf: (text: string, line: number) => number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && widthOf(candidate, lines.length) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Wraps into at most two lines, shrinking the font until everything fits. */
function fitTwoLines(
  words: string[],
  maxWidth: number,
  startSize: number,
  minSize: number,
  widthOf: (text: string, line: number, size: number) => number
): { lines: string[]; fontSize: number } {
  let size = startSize;
  for (;;) {
    const lines = wrapWords(words, maxWidth, (t, i) => widthOf(t, i, size));
    const fits = lines.length <= 2 && lines.every((l, i) => widthOf(l, i, size) <= maxWidth);
    if (fits || size <= minSize) return { lines, fontSize: size };
    size -= 0.25;
  }
}

function layoutName(name: string) {
  const words = name.trim().split(/\s+/);
  return fitTwoLines(words, NAME_MAX_WIDTH, 13.5, 8, (t, _i, size) => measure(t, size, 600));
}

/** Relative name: the "Relative Name:" label shares the first line with the start of the value. */
function layoutRelative(value: string) {
  const words = value.trim().split(/\s+/);
  return fitTwoLines(words, RELATIVE_MAX_WIDTH, 7.5, 5.5, (t, i, size) =>
    i === 0 ? measure('Relative Name: ', size, 400) + measure(t, size, 700) : measure(t, size, 700)
  );
}

const PHOTO_BOX = { x: 62.5, y: 110, size: 98 };

const QR_BOX = { x: 328, y: 106, size: 50 };

function buildQrPath(): string {
  const qr = QRCode.create(CARD_WEBSITE_URL, { errorCorrectionLevel: 'M' });
  const count = qr.modules.size;
  const cell = QR_BOX.size / count;
  let d = '';
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.modules.get(row, col)) {
        const x = (QR_BOX.x + col * cell).toFixed(3);
        const y = (QR_BOX.y + row * cell).toFixed(3);
        const c = cell.toFixed(3);
        d += `M${x} ${y}h${c}v${c}h-${c}z`;
      }
    }
  }
  return d;
}

const MembershipCard = forwardRef<SVGSVGElement, MembershipCardData & { className?: string }>(
  function MembershipCard({ fullName, relativeName, batchYear, membershipId, photoUrl, className }, ref) {
    const qrPath = useMemo(buildQrPath, []);

    const name = layoutName(fullName.trim());
    const nameBaselines = name.lines.length === 1 ? [134.5] : [127, 142];
    const labelSize = 7.5;
    const relative = relativeName?.trim() ? layoutRelative(relativeName) : null;
    const relativeBaselines = relative && relative.lines.length > 1 ? [154, 162.5] : [161.5];

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        className={className}
        role="img"
        aria-label={`Mahbub College Students Association membership card for ${fullName}`}
      >
        <defs>
          <clipPath id="card_clip">
            <rect width={CARD_WIDTH} height={CARD_HEIGHT} />
          </clipPath>
          <clipPath id="card_photo_clip">
            <rect x={PHOTO_BOX.x} y={PHOTO_BOX.y} width={PHOTO_BOX.size} height={PHOTO_BOX.size} rx="4.5" />
          </clipPath>
          <filter id="photo_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <g clipPath="url(#card_clip)">
          <image href="/card/bg.webp" x="0" y="0" width={CARD_WIDTH} height={CARD_HEIGHT} preserveAspectRatio="none" />

          <g dangerouslySetInnerHTML={{ __html: CARD_STATIC_MARKUP }} />

          {/* Member name */}
          <text fontFamily={FONT_FAMILY} fontWeight={600} fontSize={name.fontSize} fill={TEXT_COLOR}>
            {name.lines.map((line, i) => (
              <tspan key={i} x="173" y={nameBaselines[i]}>
                {line}
              </tspan>
            ))}
          </text>

          {relative && (
            <text fontFamily={FONT_FAMILY} fontSize={relative.fontSize} fill={TEXT_COLOR}>
              {relative.lines.map((line, i) => (
                <tspan key={i} x="173" y={relativeBaselines[i]}>
                  {i === 0 && 'Relative Name: '}
                  <tspan fontWeight={700}>{line}</tspan>
                </tspan>
              ))}
            </text>
          )}
          <line x1="173" y1="169" x2="283" y2="169" stroke="#800000" strokeWidth="0.25" />

          <text x="173" y="181" fontFamily={FONT_FAMILY} fontSize={labelSize} fill={TEXT_COLOR}>
            Membership ID: <tspan fontWeight={700}>{membershipId}</tspan>
          </text>
          <line x1="173" y1="188" x2="283" y2="188" stroke="#800000" strokeWidth="0.25" />

          <text x="173" y="200" fontFamily={FONT_FAMILY} fontSize={labelSize} fill={TEXT_COLOR}>
            BATCH: <tspan fontWeight={700}>{batchYear}</tspan>
          </text>

          {/* Photo */}
          {photoUrl ? (
            <g clipPath="url(#card_photo_clip)">
              {/* Blurred, enlarged copy fills the fixed frame behind the photo */}
              <image
                href={photoUrl}
                x={PHOTO_BOX.x - 12}
                y={PHOTO_BOX.y - 12}
                width={PHOTO_BOX.size + 24}
                height={PHOTO_BOX.size + 24}
                preserveAspectRatio="xMidYMid slice"
                filter="url(#photo_blur)"
              />
              <rect x={PHOTO_BOX.x} y={PHOTO_BOX.y} width={PHOTO_BOX.size} height={PHOTO_BOX.size} fill="#000000" fillOpacity="0.25" />
              {/* The whole photo, uncropped, on top */}
              <image
                href={photoUrl}
                x={PHOTO_BOX.x}
                y={PHOTO_BOX.y}
                width={PHOTO_BOX.size}
                height={PHOTO_BOX.size}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          ) : (
            <g dangerouslySetInnerHTML={{ __html: CARD_PLACEHOLDER }} />
          )}
          <rect x={PHOTO_BOX.x} y={PHOTO_BOX.y} width={PHOTO_BOX.size} height={PHOTO_BOX.size} rx="4.5" fill="none" stroke="#800000" />

          {/* QR code linking to the website */}
          <path d={qrPath} fill={TEXT_COLOR} shapeRendering="crispEdges" />
        </g>
      </svg>
    );
  }
);

export default MembershipCard;
