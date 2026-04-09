"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { CartItem } from "./cart-item";
import { useCart } from "@/store";

export function CartDrawer() {
  const { isOpen, closeCart, items, totalItems, subtotal } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0a1620]",
          "flex flex-col transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8">
          <p className="text-xs tracking-[0.3em] uppercase text-white">
            Cart ({totalItems})
          </p>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mb-8">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-xs tracking-[0.2em] uppercase text-white hover-line"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-8 border-t border-white/5">
            <div className="flex justify-between mb-8">
              <span className="text-xs tracking-[0.2em] uppercase text-gray-500">
                Subtotal
              </span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-white text-[#0a1620] text-xs tracking-[0.2em] uppercase text-center hover:bg-gold transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
