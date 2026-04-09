"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4">
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="relative w-20 h-20 flex-shrink-0 bg-[#0d1a28]"
      >
        <Image
          src={product.images[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {product.artist}
            </p>
            <p className="text-sm text-white truncate">{product.name}</p>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="text-gray-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="text-gray-500 hover:text-white"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm text-white w-6 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="text-gray-500 hover:text-white"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm text-gold">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
