import { CARD_HEIGHT_MM, CARD_WIDTH_MM } from './MembershipCard';

// 86 x 54 mm (CR80 PVC card) at 600 dpi
const EXPORT_DPI = 600;
const EXPORT_WIDTH_PX = Math.round((CARD_WIDTH_MM / 25.4) * EXPORT_DPI); // 2031
const EXPORT_HEIGHT_PX = Math.round((CARD_HEIGHT_MM / 25.4) * EXPORT_DPI); // 1276

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Adds a pHYs chunk so print software places the PNG at its real 86 x 54 mm size. */
async function withPngDpi(blob: Blob, dpi: number): Promise<Blob> {
  const png = new Uint8Array(await blob.arrayBuffer());
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21); // length(4) + type(4) + data(9) + crc(4)
  const view = new DataView(chunk.buffer);
  view.setUint32(0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4); // 'pHYs'
  view.setUint32(8, ppm);
  view.setUint32(12, ppm);
  chunk[16] = 1; // unit: metre
  view.setUint32(17, crc32(chunk.subarray(4, 17)));

  const insertAt = 33; // after the signature (8) and the IHDR chunk (25)
  const out = new Uint8Array(png.length + chunk.length);
  out.set(png.subarray(0, insertAt), 0);
  out.set(chunk, insertAt);
  out.set(png.subarray(insertAt), insertAt + chunk.length);
  return new Blob([out], { type: 'image/png' });
}

const FONT_URL = '/fonts/google-sans-flex-latin-wght-normal.woff2';

async function toDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:')) return url;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Rasterizes the card SVG to a PNG. An SVG drawn as an image cannot load external files or
 * page fonts, so every image and the font are inlined as data URLs first.
 */
export async function cardToPngBlob(svg: SVGSVGElement): Promise<Blob> {
  const clone = svg.cloneNode(true) as SVGSVGElement;

  await Promise.all(
    Array.from(clone.querySelectorAll('image')).map(async (img) => {
      const href = img.getAttribute('href') || img.getAttribute('xlink:href');
      if (!href) return;
      const dataUrl = await toDataUrl(href);
      img.setAttribute('href', dataUrl);
      img.removeAttribute('xlink:href');
    })
  );

  const fontData = await toDataUrl(FONT_URL);
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `@font-face{font-family:'Google Sans Flex Variable';font-weight:100 900;src:url(${fontData}) format('woff2');}`;
  clone.insertBefore(style, clone.firstChild);

  clone.setAttribute('width', String(EXPORT_WIDTH_PX));
  clone.setAttribute('height', String(EXPORT_HEIGHT_PX));
  clone.setAttribute('preserveAspectRatio', 'none');

  const svgText = new XMLSerializer().serializeToString(clone);
  const svgUrl = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' }));

  try {
    const image = new Image();
    image.decoding = 'async';
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Could not render the membership card.'));
      image.src = svgUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = EXPORT_WIDTH_PX;
    canvas.height = EXPORT_HEIGHT_PX;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is not supported in this browser.');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const png = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not create the image.'))), 'image/png');
    });
    return await withPngDpi(png, EXPORT_DPI);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

export async function downloadCardPng(svg: SVGSVGElement, membershipId: string): Promise<void> {
  const blob = await cardToPngBlob(svg);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${membershipId.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
