import { SITE_URL } from "./site";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList markup so search engines can show where a page sits in the
 * site rather than printing a bare URL.
 */
export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
