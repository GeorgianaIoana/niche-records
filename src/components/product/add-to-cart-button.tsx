"use client";

import { useState } from "react";
import { ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useCart } from "@/store";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showQuantity?: boolean;
}

export function AddToCartButton({
  product,
  className,
  showQuantity = true,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  if (!product.inStock) {
    return (
      <Button disabled className={cn("w-full", className)}>
        Out of Stock
      </Button>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showQuantity && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Quantity</span>
          <div className="flex items-center border border-[#1e3a50] rounded-lg">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-white">{quantity}</span>
            <button
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Button
        onClick={handleAdd}
        size="lg"
        className={cn("w-full", added && "bg-green-600 hover:bg-green-600 shadow-green-600/30")}
      >
        {added ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
