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
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);

  const allProducts = getAllProducts();

  // Calculate max price from products
  const maxPrice = useMemo(() => {
    const max = Math.max(...allProducts.map((p) => p.price));
    return Math.ceil(max / 100) * 100; // Round up to nearest 100
  }, [allProducts]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]); // 150 RON max initially

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Format filter
    if (selectedFormats.length > 0) {
      result = result.filter((p) => selectedFormats.includes(p.format));
    }

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

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // In stock filter
    if (showInStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // On sale filter
    if (showOnSaleOnly) {
      result = result.filter((p) => p.salePrice);
    }

    return sortProducts(result, selectedSort);
  }, [allProducts, selectedFormats, selectedGenres, selectedArtists, priceRange, selectedSort, showInStockOnly, showOnSaleOnly]);

  // All formats matching nicherecords.ro - always show all options
  const availableFormats = ["CD", "DVD", "Blu-Ray", "Vinyl", "MC", "Audiofil", "Accesorii"];

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

  // "You may also like" - random selection of products not in current filtered results
  const suggestedProducts = useMemo(() => {
    const filteredIds = new Set(filteredProducts.map((p) => p.id));
    const otherProducts = allProducts.filter((p) => !filteredIds.has(p.id));

    // If we have other products, show those; otherwise show random from all
    const pool = otherProducts.length >= 5 ? otherProducts : allProducts;

    // Shuffle and take 5
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [allProducts, filteredProducts]);

  return (
    <div className="min-h-screen bg-[#0a1620] pt-20">
      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:pl-8 lg:pr-12">
          {/* Header */}
          <div className="flex items-center justify-end mb-10">
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
                formats={availableFormats}
                selectedFormats={selectedFormats}
                onFormatChange={setSelectedFormats}
                genres={availableGenres}
                selectedGenres={selectedGenres}
                onGenreChange={setSelectedGenres}
                artists={availableArtists}
                selectedArtists={selectedArtists}
                onArtistChange={setSelectedArtists}
                priceRange={priceRange}
                maxPrice={maxPrice}
                onPriceChange={setPriceRange}
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
                      setSelectedFormats([]);
                      setSelectedGenres([]);
                      setSelectedArtists([]);
                      setPriceRange([0, maxPrice]);
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

      {/* You May Also Like Section */}
      <div className="border-t border-[#1e3a50]/50 mt-16 lg:mt-24 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            className={`${questrial.className} text-2xl lg:text-3xl text-white tracking-wide mb-8`}
          >
            You may also like
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-8 lg:gap-x-6">
            {suggestedProducts.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
