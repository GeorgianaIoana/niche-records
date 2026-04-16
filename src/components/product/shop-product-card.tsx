"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Questrial } from "next/font/google";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

interface ShopProductCardProps {
  product: Product;
  className?: string;
}

export function ShopProductCard({ product, className }: ShopProductCardProps) {
  return (
    <div className={cn("group", className)}>
      {/* Image Container */}
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-lg bg-[#1a2a3a] mb-4"
      >
        <Image
          src={product.images[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add wishlist functionality
          }}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-[#2a3a4a]/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3a4a5a] transition-colors z-10"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
      </Link>

      {/* Product Info */}
      <Link href={`/products/${product.category}/${product.slug}`} className="block">
        {/* Product name */}
        <h3 className="font-heading text-sm lg:text-base font-semibold text-white group-hover:text-gold transition-colors line-clamp-1 mb-0.5">
          {product.name}
        </h3>

        {/* Artist */}
        <p className={`${questrial.className} text-sm text-gray-400 mb-2 line-clamp-1 tracking-wider`}>
          {product.artist}
        </p>

        {/* Price and Format */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.salePrice)}
              </span>
            )}
          </div>

          {/* Format Badge */}
          <span className="px-2 py-0.5 border border-gray-600 rounded text-[10px] font-medium text-gray-400 uppercase tracking-wider">
            {product.format}
          </span>
        </div>
      </Link>
    </div>
  );
}
