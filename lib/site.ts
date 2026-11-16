// The site 308-redirects aejoinery.com.au -> www.aejoinery.com.au, so www is
// the canonical host. Everything we hand search engines must use it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.aejoinery.com.au";
