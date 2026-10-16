import { supabase } from '@/lib/supabase';

export const PHOTO_BUCKET = 'member-photos';
const MAX_INPUT_BYTES = 10 * 1024 * 1024;

/** Throws a user-friendly error if the chosen file cannot be used as a photo. */
export function validatePhotoFile(file: File): void {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  if (file.size > MAX_INPUT_BYTES) throw new Error('Please choose an image smaller than 10 MB.');
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Uploads the resized photo under a random name and returns its public URL. */
export async function uploadMemberPhoto(blob: Blob): Promise<string> {
  const path = `${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw new Error('Could not upload your photo. Please try again.');
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}
