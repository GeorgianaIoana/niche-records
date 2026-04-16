"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Questrial } from "next/font/google";
import { formatPrice } from "@/lib/utils";
import { TiltedCard } from "@/components/ui/tilted-card";
import type { Product } from "@/types";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  products: Product[];
}

function TiltedProductCard({ product }: { product: Product }) {
  const isOnSale = !!product.salePrice;

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block"
    >
      <div className="rounded-lg overflow-hidden">
        {/* Image container with TiltedCard effect */}
        <div className="relative aspect-square">
          {/* Heart icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist functionality
            }}
            className="absolute top-3 left-3 z-20 text-white/70 hover:text-gold transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Sale badge */}
          {isOnSale && (
            <span className="absolute top-3 right-3 z-20 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              Sale
            </span>
          )}

          {/* TiltedCard with album cover */}
          <TiltedCard
            imageSrc={product.images[0]?.url || "/placeholder.jpg"}
            altText={product.name}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.05}
            rotateAmplitude={12}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="p-4 text-white">
                <h4 className="font-heading font-bold truncate text-sm lg:text-base drop-shadow-lg">
                  {product.name}
                </h4>
                <p className="text-sm text-white/80 truncate drop-shadow-md">{product.artist}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {isOnSale ? (
                      <>
                        <span className="line-through text-white/50 text-sm">
                          {formatPrice(product.salePrice!)}
                        </span>
                        <span className="text-gold font-bold drop-shadow-lg">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-white drop-shadow-lg">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] border border-white/30 px-2 py-0.5 rounded text-white/70 uppercase tracking-wide">
                    {product.format}
                  </span>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProductsSection({
  title = "Featured Products",
  subtitle = "Handpicked selections for the discerning collector",
  viewAllHref = "/products",
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-28 lg:py-40 border-t-[0.5px] border-gold/20 relative overflow-hidden">
      {/* Blue light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={400}
        height={400}
        className="absolute -top-40 -right-10 pointer-events-none opacity-70"
        aria-hidden="true"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={500}
        height={500}
        className="absolute -bottom-40 -left-32 pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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
                <p
                  className={`${questrial.className} mt-3 text-lg max-w-xl tracking-wider`}
                  style={{
                    background: 'linear-gradient(180deg, #b0e8ff 0%, #c8f0ff 50%, #1e3a50 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="btn-gold-3d inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full"
              >
                View All →
              </Link>
            )}
          </div>
        </div>

        {/* Product Grid with Tilted Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-8">
          {products.map((product) => (
            <TiltedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
