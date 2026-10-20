import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { CARD_PLACEHOLDER, CARD_STATIC_MARKUP } from './cardStatic';
import { toNameCase } from '@/lib/nameCase';

export const CARD_WIDTH = 440;
export const CARD_HEIGHT = 276;
// Physical print size of the PVC card; the artwork is drawn at this aspect ratio.
export const CARD_WIDTH_MM = 86;
export const CARD_HEIGHT_MM = 54;
export const CARD_WEBSITE_URL = 'https://mahbubcollege.com';

export interface MembershipCardData {
  fullName: string;
  relativeName?: string | null;
  branch?: string | null;
  batchYear: string;
  membershipId: string;
  /** Public URL or data URL of the member photo. A silhouette is shown when empty. */
  photoUrl?: string | null;
}

const FONT_FAMILY = "'Google Sans Flex Variable', 'Google Sans Flex', system-ui, sans-serif";
const TEXT_COLOR = '#272727';
const NAME_MAX_WIDTH = 148; // text starts at x=173; the QR code begins at x=328
const RELATIVE_MAX_WIDTH = 140;
const BRANCH_MAX_WIDTH = 122; // the signature caption starts at about x=299, level with this row
const NAME_SIZE = 9.5;
const NAME_SINGLE_LINE_MIN_SIZE = 8.5;
const ID_MAX_WIDTH = 150;

let measureCtx: CanvasRenderingContext2D | null | undefined;

/** Width of `text` in card units. Uses the real font via canvas, with an estimate as fallback. */
function measure(text: string, size: number, weight: number): number {
  if (typeof document !== 'undefined') {
    if (measureCtx === undefined) measureCtx = document.createElement('canvas').getContext('2d');
    if (measureCtx) {
      // Measured at the real size: the font's optical-size axis makes glyphs wider at small sizes.
      measureCtx.font = `${weight} ${size}px ${FONT_FAMILY}`;
      return measureCtx.measureText(text).width;
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
  const widthOf = (t: string, _i: number, size: number) => measure(t, size, 700);
  // Prefer one line if it fits with a small shrink; otherwise wrap to two lines at the full size.
  for (let size = NAME_SIZE; size >= NAME_SINGLE_LINE_MIN_SIZE; size -= 0.25) {
    if (widthOf(name.trim(), 0, size) <= NAME_MAX_WIDTH) return { lines: [name.trim()], fontSize: size };
  }
  return fitTwoLines(words, NAME_MAX_WIDTH, NAME_SIZE, 6.5, widthOf);
}

const RELATIVE_LABEL = 'Father Name: ';
const BRANCH_LABEL = 'Branch: ';
const ID_LABEL = 'Membership ID: ';
const FIELD_SIZE = 7.5;
const FIELD_MIN_SIZE = 5.5;

/** Labelled field (label shares the first line with the start of the value), wrapped to at most two lines. */
function layoutLabelled(value: string, label: string, maxWidth = RELATIVE_MAX_WIDTH) {
  const words = value.trim().split(/\s+/);
  const widthOf = (t: string, i: number, size: number) =>
    i === 0 ? measure(label, size, 400) + measure(t, size, 700) : measure(t, size, 700);
  return fitTwoLines(words, maxWidth, FIELD_SIZE, FIELD_MIN_SIZE, widthOf);
}

/** Baselines for `count` lines starting at `top`, advancing by `step`. */
function stack(top: number, count: number, step: number): number[] {
  return Array.from({ length: count }, (_, i) => top + i * step);
}

/** Single-line font size for the membership ID, shrunk until it stops short of the QR code. */
function fitIdSize(membershipId: string): number {
  let size = FIELD_SIZE;
  while (size > FIELD_MIN_SIZE && measure(ID_LABEL, size, 400) + measure(membershipId, size, 700) > ID_MAX_WIDTH) {
    size -= 0.25;
  }
  return size;
}

/** Vertical layout of all text rows, starting at the top of the white panel; wrapped rows push the rows below them down. */
function layoutCard(fullName: string, membershipId: string, relativeName?: string | null, branch?: string | null) {
  const idSize = fitIdSize(membershipId);
  const name = layoutName(toNameCase(fullName.trim()));
  const relative = relativeName?.trim() ? layoutLabelled(toNameCase(relativeName.trim()), RELATIVE_LABEL) : null;
  const branchRow = branch?.trim() ? layoutLabelled(branch, BRANCH_LABEL, BRANCH_MAX_WIDTH) : null;

  const nameStep = name.fontSize * 1.2;
  const nameBaselines = stack(name.fontSize * 0.85, name.lines.length, nameStep);
  let cursor = nameBaselines[nameBaselines.length - 1] + 5;

  let divider0: number | null = null;
  let relativeBaselines: number[] = [];
  if (relative) {
    divider0 = cursor;
    relativeBaselines = stack(divider0 + 10, relative.lines.length, relative.fontSize * 1.3);
    cursor = relativeBaselines[relativeBaselines.length - 1] + 6;
  }
  const divider1 = cursor;
  const idBaseline = divider1 + 12;
  const divider2 = idBaseline + 7;

  let branchBaselines: number[] = [];
  let divider3: number | null = null;
  let batchBaseline = divider2 + 12;
  if (branchRow) {
    branchBaselines = stack(divider2 + 11, branchRow.lines.length, branchRow.fontSize * 1.3);
    divider3 = branchBaselines[branchBaselines.length - 1] + 7;
    batchBaseline = divider3 + 12;
  }

  // The first line's cap height (~0.72em) sits level with the top edge of the photo frame.
  const offset = PHOTO_BOX.y - name.fontSize * 0.13;
  const shift = (ys: number[]) => ys.map((y) => y + offset);

  return {
    name,
    nameBaselines: shift(nameBaselines),
    relative,
    relativeBaselines: shift(relativeBaselines),
    branchRow,
    branchBaselines: shift(branchBaselines),
    divider1: divider1 + offset,
    divider0: divider0 === null ? null : divider0 + offset,
    idBaseline: idBaseline + offset,
    idSize,
    divider2: divider2 + offset,
    divider3: divider3 === null ? null : divider3 + offset,
    batchBaseline: batchBaseline + offset,
  };
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
  function MembershipCard({ fullName, relativeName, branch, batchYear, membershipId, photoUrl, className }, ref) {
    const qrPath = useMemo(buildQrPath, []);

    // Text is measured with the real font, so lay out again once web fonts have loaded.
    const [, setFontsReady] = useState(false);
    useEffect(() => {
      Promise.all([
        document.fonts.load(`600 13px ${FONT_FAMILY}`),
        document.fonts.load(`400 8px ${FONT_FAMILY}`),
        document.fonts.load(`700 8px ${FONT_FAMILY}`),
      ])
        .then(() => document.fonts.ready)
        .then(() => setFontsReady(true))
        .catch(() => {});
    }, []);

    const labelSize = FIELD_SIZE;
    const {
      name,
      nameBaselines,
      relative,
      relativeBaselines,
      branchRow,
      branchBaselines,
      divider1,
      divider0,
      idBaseline,
      idSize,
      divider2,
      divider3,
      batchBaseline,
    } = layoutCard(fullName, membershipId, relativeName, branch);

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
        </defs>

        <g clipPath="url(#card_clip)">
          <image href="/card/bg.webp" x="0" y="0" width={CARD_WIDTH} height={CARD_HEIGHT} preserveAspectRatio="none" />

          <g dangerouslySetInnerHTML={{ __html: CARD_STATIC_MARKUP }} />

          {/* Member name */}
          <text fontFamily={FONT_FAMILY} fontWeight={700} fontSize={name.fontSize} fill={TEXT_COLOR}>
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
                  {i === 0 && RELATIVE_LABEL}
                  <tspan fontWeight={700}>{line}</tspan>
                </tspan>
              ))}
            </text>
          )}
          {divider0 !== null && (
            <line x1="173" y1={divider0} x2="283" y2={divider0} stroke="#800000" strokeWidth="0.25" />
          )}
          <line x1="173" y1={divider1} x2="283" y2={divider1} stroke="#800000" strokeWidth="0.25" />

          <text x="173" y={idBaseline} fontFamily={FONT_FAMILY} fontSize={idSize} fill={TEXT_COLOR}>
            {ID_LABEL}<tspan fontWeight={700}>{membershipId}</tspan>
          </text>
          <line x1="173" y1={divider2} x2="283" y2={divider2} stroke="#800000" strokeWidth="0.25" />

          {branchRow && (
            <text fontFamily={FONT_FAMILY} fontSize={branchRow.fontSize} fill={TEXT_COLOR}>
              {branchRow.lines.map((line, i) => (
                <tspan key={i} x="173" y={branchBaselines[i]}>
                  {i === 0 && BRANCH_LABEL}
                  <tspan fontWeight={700}>{line}</tspan>
                </tspan>
              ))}
            </text>
          )}

          {divider3 !== null && (
            <line x1="173" y1={divider3} x2="283" y2={divider3} stroke="#800000" strokeWidth="0.25" />
          )}

          <text x="173" y={batchBaseline} fontFamily={FONT_FAMILY} fontSize={labelSize} fill={TEXT_COLOR}>
            BATCH: <tspan fontWeight={700}>{batchYear}</tspan>
          </text>

          {/* Photo */}
          {photoUrl ? (
            <image
              href={photoUrl}
              x={PHOTO_BOX.x}
              y={PHOTO_BOX.y}
              width={PHOTO_BOX.size}
              height={PHOTO_BOX.size}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#card_photo_clip)"
            />
          ) : (
            <g dangerouslySetInnerHTML={{ __html: CARD_PLACEHOLDER }} />
          )}
          <rect x={PHOTO_BOX.x} y={PHOTO_BOX.y} width={PHOTO_BOX.size} height={PHOTO_BOX.size} rx="4.5" fill="none" stroke="#E6CF94" strokeWidth="1.5" />

          {/* QR code linking to the website */}
          <path d={qrPath} fill={TEXT_COLOR} shapeRendering="crispEdges" />
        </g>
      </svg>
    );
  }
);

export default MembershipCard;
