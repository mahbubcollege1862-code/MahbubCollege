/**
 * Optional bot check using Cloudflare Turnstile (free). It is active only when TURNSTILE_SECRET_KEY is set
 * on the server (and NEXT_PUBLIC_TURNSTILE_SITE_KEY for the widget). Without them, only the rate limits apply.
 */
export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== 'unknown') body.set('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error('[Turnstile] verification request failed:', err instanceof Error ? err.message : err);
    return false;
  }
}
