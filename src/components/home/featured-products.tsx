import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 lg:py-28 relative">
      {/* Darker section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030810]/50 to-transparent" />

      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 50%, rgba(30, 58, 80, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-400 max-w-xl font-light">
              Hand-picked selections from our premium catalog
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
          >
            <span className="text-sm font-medium tracking-wide">View All</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
