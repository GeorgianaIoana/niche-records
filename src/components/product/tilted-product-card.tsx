"use client";

import Link from "next/link";
import { TiltedCard } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface TiltedProductCardProps {
  product: Product;
  className?: string;
}

export function TiltedProductCard({ product, className }: TiltedProductCardProps) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className={className}
    >
      <TiltedCard
        imageSrc={product.images[0]?.url || "/placeholder.jpg"}
        altText={product.name}
        containerHeight="320px"
        containerWidth="100%"
        imageHeight="320px"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={true}
        overlayContent={
          <div className="p-4 text-white">
            <p className="text-xs text-gray-400 mb-1">
              {product.artist}
            </p>
            <h3 className="font-heading text-lg font-semibold leading-tight mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gold">
              {formatPrice(product.price)}
            </p>
          </div>
        }
      />
    </Link>
  );
}
