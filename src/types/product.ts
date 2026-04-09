export type Category = "cds" | "vinyls" | "dvds";
export type Format = "CD" | "Vinyl" | "DVD";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Track {
  number: number;
  title: string;
  duration: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  artist: string;
  price: number; // In bani (cents equivalent)
  category: Category;
  format: Format;
  genre: string[];
  images: ProductImage[];
  description?: string;
  tracklist?: Track[];
  releaseYear?: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  image?: string;
}
