"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Questrial } from "next/font/google";
import { cn, formatPrice } from "@/lib/utils";
import { useCart, useFavorites } from "@/store";
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
  const { isFavorite, toggleItem } = useFavorites();
  const { addItem } = useCart();
  const isLiked = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      addItem(product);
    }
  };

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
            toggleItem(product);
          }}
          className={cn(
            "absolute top-3 left-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-10 active:scale-90",
            isLiked
              ? "bg-gold/20 text-gold hover:bg-gold/30"
              : "bg-[#2a3a4a]/80 text-gray-400 hover:text-white hover:bg-[#3a4a5a]"
          )}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isLiked && "fill-gold scale-110"
            )}
          />
        </button>

        {/* Add to cart button - bottom right */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10",
            "shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]",
            "hover:shadow-[0_3px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]",
            "active:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.1)] active:translate-y-[1px]",
            product.inStock
              ? "bg-gradient-to-b from-gold via-gold to-[#c4a24d] text-navy hover:from-gold-light hover:to-gold"
              : "bg-gradient-to-b from-gray-500 to-gray-600 text-gray-400 cursor-not-allowed"
          )}
          aria-label={product.inStock ? "Adaugă în coș" : "Indisponibil"}
        >
          <ShoppingCart className="w-4 h-4 drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]" />
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
            {/* Availability dot */}
            {product.inStock && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
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
