"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product";
import type { Product } from "@/types";

interface ProductRowProps {
  title: string;
  viewAllHref?: string;
  products: Product[];
}

export function ProductRow({ title, viewAllHref, products }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 lg:py-32">
      {/* Warm light decoration - upper left */}
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute -top-32 -left-20 opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-xs tracking-[0.3em] uppercase text-white">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-white hover-line transition-colors"
            >
              View All
            </Link>
          )}
        </div>

        {/* Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
