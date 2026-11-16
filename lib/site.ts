const FALLBACK = "https://www.aejoinery.com.au";

/**
 * The bare domain 308-redirects to www, so www is the canonical host.
 *
 * The deployment's NEXT_PUBLIC_SITE_URL points at the apex domain, which would
 * put a redirecting URL in every canonical tag, og:url, and sitemap entry — so
 * normalise it here rather than depending on the environment being right.
 */
function canonicalOrigin(raw: string | undefined): string {
  try {
    const url = new URL(raw || FALLBACK);
    if (url.hostname === "aejoinery.com.au") {
      url.hostname = "www.aejoinery.com.au";
    }
    return url.origin;
  } catch {
    return FALLBACK;
  }
}

export const SITE_URL = canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL);
