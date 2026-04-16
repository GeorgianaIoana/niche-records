"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Questrial } from "next/font/google";
import { cn, formatPrice } from "@/lib/utils";
import { useCart, useFavorites } from "@/store";
import type { Product } from "@/types";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleItem } = useFavorites();
  const isLiked = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      addItem(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className={cn("group block", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#122535] to-[#0d1a28] rounded-lg mb-4">
        <Image
          src={product.images[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.salePrice && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
              Sale
            </span>
          )}
          {product.featured && !product.salePrice && (
            <span className="px-2.5 py-1 bg-gold text-navy text-[10px] font-semibold uppercase tracking-wider rounded">
              Featured
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 bg-gray-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
              Sold Out
            </span>
          )}
        </div>

        {/* Format Badge & Favorite */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#0a1620]/80 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider rounded border border-[#1e3a50]/50">
            {product.format}
          </span>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90",
              isLiked
                ? "bg-gold/20 text-gold hover:bg-gold/30"
                : "bg-[#0a1620]/80 text-gray-400 hover:text-white hover:bg-[#1e3a50] border border-[#1e3a50]/50"
            )}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                isLiked && "fill-gold scale-110"
              )}
            />
          </button>
        </div>

        {/* Add to cart button - appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "w-full py-3 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors",
              product.inStock
                ? "bg-gold text-navy hover:bg-gold-light"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            )}
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        {/* Artist */}
        <p className={`${questrial.className} text-xs text-gray-500 uppercase tracking-wider`}>
          {product.artist}
        </p>

        {/* Product name */}
        <h3 className="font-heading text-base font-semibold text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Genre tags */}
        {product.genre.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] text-gray-500 uppercase tracking-wide"
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <p className="text-base font-medium text-gold">
            {formatPrice(product.price)}
          </p>
          {product.salePrice && (
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(product.salePrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
