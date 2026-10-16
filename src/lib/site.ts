/** Canonical public address of the website. Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mahbubcollege.com').replace(/\/+$/, '');

export const SOCIAL_LINKS = {
  x: 'https://x.com/mahbubcollegesa',
  instagram: 'https://www.instagram.com/mahbubcollege/',
  youtube: 'https://www.youtube.com/@mahbubcollege',
  facebook: 'https://www.facebook.com/mahbubcollege/',
};

export const CONTACT = {
  telephone: '+91 8008576667',
  email: 'support@mahbubcollege.com',
};
