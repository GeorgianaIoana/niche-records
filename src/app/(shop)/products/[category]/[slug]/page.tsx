"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, ShoppingBag, Check, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui";
import { ProductGrid } from "@/components/product";
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart, useFavorites } from "@/store";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = use(params);
  const product = getProductBySlug(category, slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { addItem } = useCart();
  const { isFavorite, addItem: addToFavorites, removeItem: removeFromFavorites } = useFavorites();

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  // Calculate total duration for tracklist
  const getTotalDuration = () => {
    if (!product.tracklist || product.tracklist.length === 0) return null;
    let totalSeconds = 0;
    product.tracklist.forEach(track => {
      const parts = track.duration.split(':');
      if (parts.length === 2) {
        totalSeconds += parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }
    });
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalDuration = getTotalDuration();

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href={`/products/${category}`}
          className="group inline-flex items-center text-gray-500 hover:text-gold transition-all duration-300 mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm tracking-wide">Back to {category.charAt(0).toUpperCase() + category.slice(1)}</span>
        </Link>

        {/* Product Detail Grid */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#122535] to-[#0d1a28] border border-[#1e3a50]/30 mb-4"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <Image
                src={product.images[selectedImageIndex]?.url || "/placeholder.jpg"}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  isImageHovered && product.inStock && "scale-105"
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-[#030810]/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl font-light text-gray-300 tracking-wider">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300",
                      selectedImageIndex === index
                        ? "border-gold shadow-lg shadow-gold/20"
                        : "border-[#1e3a50]/30 hover:border-[#1e3a50]"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="gold" className="text-xs tracking-wider">{product.format}</Badge>
              {product.genre.map((g) => (
                <Badge key={g} variant="outline" className="text-xs tracking-wider">
                  {g}
                </Badge>
              ))}
            </div>

            {/* Title & Artist */}
            <h1 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {product.name}
            </h1>
            <p className="text-xl text-gray-400 mb-6 font-light">{product.artist}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-medium text-gold">
                {formatPrice(product.price)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.salePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-400 leading-relaxed mb-8 font-light">
                {product.description}
              </p>
            )}

            {/* Add to Cart Section */}
            {product.inStock ? (
              <div className="space-y-4 mb-8">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center border border-[#1e3a50] rounded-lg bg-[#0d1a28]/50">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-3 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-white font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="p-3 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 btn-gold-3d inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold rounded-lg transition-all duration-300",
                      added && "!bg-green-600 !shadow-green-600/30"
                    )}
                    style={added ? {
                      background: 'linear-gradient(to bottom, #22c55e 0%, #16a34a 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 #166534, 0 3px 6px rgba(0,0,0,0.2)'
                    } : undefined}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className={cn(
                      "btn-secondary-3d p-4 rounded-lg transition-all duration-300",
                      isFavorite(product.id) && "!text-red-400 !border-red-400/30"
                    )}
                    aria-label={isFavorite(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite(product.id) && "fill-current")} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <button
                  disabled
                  className="w-full px-6 py-4 text-sm font-semibold rounded-lg bg-gray-700/50 text-gray-400 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[#1e3a50]/30">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto text-gold mb-2" />
                <p className="text-xs text-gray-400 leading-tight">Free Shipping<br /><span className="text-gray-500">Orders $50+</span></p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto text-gold mb-2" />
                <p className="text-xs text-gray-400 leading-tight">Secure Payment<br /><span className="text-gray-500">SSL Encrypted</span></p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto text-gold mb-2" />
                <p className="text-xs text-gray-400 leading-tight">Easy Returns<br /><span className="text-gray-500">30 Days</span></p>
              </div>
            </div>

            {/* Product Details Table */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#1e3a50]/50"></span>
                Details
                <span className="h-px flex-1 bg-[#1e3a50]/50"></span>
              </h2>
              <div className="space-y-0">
                {product.releaseYear && (
                  <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                    <span className="text-gray-500 text-sm">Release Year</span>
                    <span className="text-white text-sm">{product.releaseYear}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                  <span className="text-gray-500 text-sm">Format</span>
                  <span className="text-white text-sm">{product.format}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                  <span className="text-gray-500 text-sm">Availability</span>
                  <span className={cn(
                    "text-sm flex items-center gap-2",
                    product.inStock ? "text-green-400" : "text-red-400"
                  )}>
                    {product.inStock && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracklist */}
            {product.tracklist && product.tracklist.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#1e3a50]/50"></span>
                  Tracklist
                  <span className="h-px flex-1 bg-[#1e3a50]/50"></span>
                </h2>
                <div className="rounded-xl overflow-hidden border border-[#1e3a50]/30 bg-gradient-to-br from-[#122535]/50 to-[#0d1a28]/50">
                  {product.tracklist.map((track, index) => (
                    <div
                      key={track.number}
                      className={cn(
                        "group flex items-center justify-between py-3 px-4 transition-all duration-300 hover:bg-[#1e3a50]/20",
                        index !== product.tracklist!.length - 1 && "border-b border-[#1e3a50]/20"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 group-hover:text-gold transition-colors duration-300 w-6 text-right font-mono">
                          {track.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-gray-300 text-sm">{track.title}</span>
                      </div>
                      <span className="text-sm text-gray-600 font-mono">
                        {track.duration}
                      </span>
                    </div>
                  ))}
                  {/* Total Duration */}
                  {totalDuration && (
                    <div className="flex items-center justify-between py-3 px-4 bg-[#0d1a28]/80 border-t border-[#1e3a50]/30">
                      <span className="text-sm text-gray-400">Total Duration</span>
                      <span className="text-sm text-gold font-mono">{totalDuration}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gradient-to-b from-transparent via-[#0d1a28]/50 to-transparent">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-extralight text-white tracking-tight mb-8 text-center">
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
