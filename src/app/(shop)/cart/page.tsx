"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Package, Shield } from "lucide-react";
import { Button } from "@/components/ui";
import { useCart } from "@/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#122535] to-[#0d1a28] border border-[#1e3a50]/30 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gold/60" />
          </div>
          <h1 className="font-serif text-3xl font-light text-white mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-10 font-light">
            Discover our curated collection of music and add your favorites to the cart.
          </p>
          <Link href="/products">
            <Button size="lg">Browse Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <div className="flex items-baseline justify-between">
            <h1 className="font-serif text-4xl lg:text-5xl font-light text-white">
              Shopping Cart
            </h1>
            <p className="text-gray-400">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Cart items */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Column headers - desktop only */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 pb-4 border-b border-[#1e3a50]/30 text-xs uppercase tracking-wider text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="divide-y divide-[#1e3a50]/30">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-8 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center"
                >
                  {/* Product info */}
                  <div className="flex gap-5 lg:col-span-6 mb-6 lg:mb-0">
                    <Link
                      href={`/products/${item.product.category}/${item.product.slug}`}
                      className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#122535] to-[#0d1a28] border border-[#1e3a50]/30 group"
                    >
                      <Image
                        src={item.product.images[0]?.url || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="112px"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {item.product.artist}
                      </p>
                      <Link
                        href={`/products/${item.product.category}/${item.product.slug}`}
                        className="font-serif text-lg text-white hover:text-gold transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.format}
                      </p>
                      <p className="text-gold mt-2 lg:hidden">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between lg:justify-center lg:col-span-3 mb-4 lg:mb-0">
                    <div className="flex items-center bg-[#0d1a28] border border-[#1e3a50]/50 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-3 text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-3 text-gray-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="lg:hidden p-2 text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price & remove */}
                  <div className="hidden lg:flex lg:col-span-3 items-center justify-end gap-4">
                    <p className="text-lg font-medium text-gold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile total */}
                  <div className="flex justify-between items-center lg:hidden pt-4 border-t border-[#1e3a50]/20">
                    <span className="text-sm text-gray-400">Item total</span>
                    <span className="text-lg font-medium text-gold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0">
            <div className="bg-gradient-to-br from-[#122535]/60 to-[#0d1a28]/40 rounded-2xl border border-[#1e3a50]/30 p-8 lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl font-light text-white mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-gray-500 italic">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-[#1e3a50]/30 mt-6 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg text-white">Total</span>
                  <span className="text-2xl font-medium text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Taxes calculated at checkout
                </p>
              </div>

              <Link href="/checkout" className="block mt-8">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-[#1e3a50]/30">
                <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                  <Shield className="w-4 h-4 text-gold/60" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <Package className="w-4 h-4 text-gold/60" />
                  <span>Free shipping on orders over $75</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
