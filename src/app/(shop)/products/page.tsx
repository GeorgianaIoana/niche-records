"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Questrial } from "next/font/google";
import { ShopProductCard } from "@/components/product/shop-product-card";
import { ShopFilters } from "@/components/product/shop-filters";
import { getAllProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "New arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
] as const;

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "popular":
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    case "newest":
    default:
      return sorted.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
  }
}

export default function ShopPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);

  const allProducts = getAllProducts();

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Genre filter
    if (selectedGenres.length > 0) {
      result = result.filter((p) =>
        p.genre.some((g) => selectedGenres.includes(g))
      );
    }

    // Artist filter
    if (selectedArtists.length > 0) {
      result = result.filter((p) => selectedArtists.includes(p.artist));
    }

    // In stock filter
    if (showInStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // On sale filter
    if (showOnSaleOnly) {
      result = result.filter((p) => p.salePrice);
    }

    return sortProducts(result, selectedSort);
  }, [allProducts, selectedGenres, selectedArtists, selectedSort, showInStockOnly, showOnSaleOnly]);

  // Get unique genres and artists from products
  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    allProducts.forEach((p) => p.genre.forEach((g) => genres.add(g)));
    return Array.from(genres).sort();
  }, [allProducts]);

  const availableArtists = useMemo(() => {
    const artists = new Set<string>();
    allProducts.forEach((p) => artists.add(p.artist));
    return Array.from(artists).sort();
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-[#0a1620] pt-20">
      <div className="py-8 lg:py-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 lg:pl-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1
              className={`${questrial.className} text-4xl lg:text-5xl text-white tracking-wide italic`}
              style={{
                textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              SHOP
            </h1>

            {/* Sort dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">Sort by</span>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-transparent border-none text-white text-sm font-medium pr-6 cursor-pointer focus:outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0a1620]">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <p className="text-sm text-gray-400 mb-4">Filter by</p>
              <ShopFilters
                genres={availableGenres}
                selectedGenres={selectedGenres}
                onGenreChange={setSelectedGenres}
                artists={availableArtists}
                selectedArtists={selectedArtists}
                onArtistChange={setSelectedArtists}
                showInStockOnly={showInStockOnly}
                onInStockChange={setShowInStockOnly}
                showOnSaleOnly={showOnSaleOnly}
                onSaleChange={setShowOnSaleOnly}
              />
            </aside>

            {/* Product Grid */}
            <div>
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-400 mb-4">No products match your filters.</p>
                  <button
                    onClick={() => {
                      setSelectedGenres([]);
                      setSelectedArtists([]);
                      setShowInStockOnly(false);
                      setShowOnSaleOnly(false);
                    }}
                    className="text-gold hover:text-gold-light transition-colors text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-10 lg:gap-x-6 lg:gap-y-12">
                  {filteredProducts.map((product) => (
                    <ShopProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
