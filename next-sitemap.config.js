/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // The site 308-redirects aejoinery.com.au -> www.aejoinery.com.au, so www is
  // the canonical host. Every URL we hand search engines must use it, otherwise
  // each one costs a redirect hop.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.aejoinery.com.au",
  generateRobotsTxt: true,
  changefreq: "weekly",
  // /blog is a "Coming soon." placeholder with no posts; keep it out of the
  // sitemap (it's also noindex) so it isn't offered up as thin content.
  exclude: ["/blog"],
};
