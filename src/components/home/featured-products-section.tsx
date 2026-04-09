import Link from "next/link";
import Image from "next/image";
import { TiltedProductCard } from "@/components/product";
import type { Product } from "@/types";

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  products: Product[];
}

export function FeaturedProductsSection({
  title = "Featured Products",
  subtitle = "Handpicked selections for the discerning collector",
  viewAllHref = "/products",
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-28 lg:py-40 border-t-[0.5px] border-gold/20 relative overflow-hidden">
      {/* Warm light effects */}
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute -top-20 -right-10 pointer-events-none opacity-60"
        aria-hidden="true"
      />
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute bottom-0 -left-20 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-white">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-3 text-base text-gray-400 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>

            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                View All →
              </Link>
            )}
          </div>
        </div>

        {/* Product Grid with TiltedCards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {products.map((product) => (
            <TiltedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
