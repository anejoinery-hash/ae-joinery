// Mirrors the normalisation in lib/site.ts — this config is plain CommonJS and
// runs outside the TypeScript build, so it can't import it.
const FALLBACK = "https://www.aejoinery.com.au";

function canonicalOrigin(raw) {
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

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // The bare domain 308-redirects to www, so every URL we hand search engines
  // must use www or it costs a redirect hop.
  siteUrl: canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  generateRobotsTxt: true,
  changefreq: "weekly",
  // /blog is a "Coming soon." placeholder with no posts; keep it out of the
  // sitemap (it's also noindex) so it isn't offered up as thin content.
  exclude: ["/blog"],
};
