import Link from "next/link";
import { ProductCard } from "@/components/product";
import { Questrial, Open_Sans } from "next/font/google";
import type { Product } from "@/types";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  products: Product[];
}

export function ProductSection({
  title,
  subtitle,
  viewAllHref,
  products,
}: ProductSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className={`${questrial.className} text-2xl lg:text-3xl text-white uppercase`}
                style={{
                  textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className={`${openSans.className} mt-3 text-base text-gray-400 max-w-xl`}>
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
