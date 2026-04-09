"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      addItem(product);
    }
  };

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className={cn("group block", className)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-navy-light mb-6">
        <Image
          src={product.images[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "absolute bottom-0 left-0 right-0",
            "py-3 text-xs text-center",
            "bg-white text-navy",
            "transition-all duration-300",
            "opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0",
            !product.inStock && "bg-gray-400"
          )}
        >
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>

      {/* Info */}
      <div className="space-y-2">
        {/* Artist */}
        <p className="text-xs text-gray-500">
          {product.artist}
        </p>

        {/* Product name */}
        <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-sm text-gray-400">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
