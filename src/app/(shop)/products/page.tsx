"use client";

import { useState, useMemo } from "react";
import { ProductGrid, ProductFilters } from "@/components/product";
import { getAllProducts } from "@/data/products";
import type { Product } from "@/types";

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
    default:
      return sorted.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
  }
}

export default function ProductsPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const allProducts = getAllProducts();

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedGenres.length > 0) {
      result = result.filter((p) =>
        p.genre.some((g) => selectedGenres.includes(g))
      );
    }

    return sortProducts(result, selectedSort);
  }, [allProducts, selectedGenres, selectedSort]);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light text-white tracking-tight mb-4">
            All Products
          </h1>
          <p className="text-gray-400">
            {filteredProducts.length} items
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar filters */}
          <aside className="hidden lg:block">
            <ProductFilters
              selectedGenres={selectedGenres}
              onGenreChange={setSelectedGenres}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </aside>

          {/* Mobile sort */}
          <div className="lg:hidden mb-6">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-navy-dark border border-gray-600 text-white text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>

          {/* Product grid */}
          <div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
