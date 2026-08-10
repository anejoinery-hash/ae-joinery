export type Region = {
  name: string;
  slug: string;
};

export const REGIONS: Region[] = [
  { name: "Eastern Suburbs", slug: "eastern-suburbs" },
  { name: "North Shore", slug: "north-shore" },
  { name: "Northern Beaches", slug: "northern-beaches" },
  { name: "Inner West", slug: "inner-west" },
  { name: "Hills District", slug: "hills-district" },
  { name: "Western Sydney", slug: "western-sydney" },
  { name: "Sutherland Shire", slug: "sutherland-shire" },
  { name: "South Sydney", slug: "south-sydney" },
];

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
