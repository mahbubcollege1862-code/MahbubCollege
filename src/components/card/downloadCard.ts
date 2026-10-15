import { CARD_HEIGHT, CARD_WIDTH } from './MembershipCard';

const EXPORT_SCALE = 4; // 1760 x 1104 px

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

  clone.setAttribute('width', String(CARD_WIDTH * EXPORT_SCALE));
  clone.setAttribute('height', String(CARD_HEIGHT * EXPORT_SCALE));

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
    canvas.width = CARD_WIDTH * EXPORT_SCALE;
    canvas.height = CARD_HEIGHT * EXPORT_SCALE;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is not supported in this browser.');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not create the image.'))), 'image/png');
    });
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
