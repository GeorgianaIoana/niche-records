export const SITE_NAME = "NICHE";
export const SITE_DESCRIPTION = "Premium Music Collection - CDs, Vinyls & DVDs";

export const CATEGORIES = [
  { slug: "cds", name: "CDs", description: "Crystal clear digital sound" },
  { slug: "vinyls", name: "Vinyls", description: "Warm analog experience" },
  { slug: "dvds", name: "DVDs", description: "Visual music experiences" },
] as const;

export const GENRES = [
  "Rock",
  "Jazz",
  "Classical",
  "Electronic",
  "Hip-Hop",
  "Pop",
  "R&B",
  "Metal",
  "Folk",
  "Indie",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products/cds", label: "CDs" },
  { href: "/products/vinyls", label: "Vinyls" },
  { href: "/products/dvds", label: "DVDs" },
] as const;
