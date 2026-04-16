import {
  HeroVinyl,
  TrustBadges,
  FeaturedProductsSection,
  CategoryShowcase,
  PhotoCarousel,
  Newsletter,
} from "@/components/home";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <HeroVinyl />

      <TrustBadges />

      <FeaturedProductsSection products={featured} />

      <CategoryShowcase />

      <PhotoCarousel />

      <Newsletter />
    </>
  );
}
