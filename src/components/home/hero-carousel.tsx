"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const products = getFeaturedProducts().slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % products.length);
        setIsTransitioning(false);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, [products.length]);

  const product = products[current];

  const handleSlideChange = (index: number) => {
    if (index !== current) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 400);
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] grain-overlay">
      {/* Background Images */}
      {products.map((p, i) => (
        <div
          key={p.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={p.images[0]?.url || "/placeholder.jpg"}
            alt={p.name}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Simple dark overlay */}
          <div className="absolute inset-0 bg-navy/70" />
        </div>
      ))}

      {/* Floating ambient light orbs */}
      <div className="ambient-lights">
        <div className="light-orb light-orb--gold light-orb--1" />
        <div className="light-orb light-orb--warm light-orb--2" />
        <div className="light-orb light-orb--soft light-orb--3" />
        <div className="light-orb light-orb--gold light-orb--4" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            {/* Left - Main content */}
            <div className="lg:col-span-7">
              <div
                className={cn(
                  "transition-opacity duration-500",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}
              >
                {/* Label */}
                <p className="text-xs text-gold mb-4">
                  Featured
                </p>

                {/* Headline */}
                <h1
                  className={`${questrial.className} text-4xl lg:text-6xl text-white mb-4 text-balance`}
                  style={{
                    textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {product.name}
                </h1>

                {/* Artist name */}
                <p className={`${questrial.className} text-xl text-gray-300 mb-8 tracking-wider`}>
                  {product.artist}
                </p>

                {/* CTA */}
                <Link
                  href={`/products/${product.category}/${product.slug}`}
                  className="inline-block text-xs tracking-wide text-white hover:text-gold transition-colors"
                >
                  View Product →
                </Link>
              </div>
            </div>

            {/* Right - Price & Indicators */}
            <div className="lg:col-span-5 lg:text-right">
              <div
                className={cn(
                  "transition-opacity duration-500",
                  isTransitioning ? "opacity-0" : "opacity-100"
                )}
              >
                <p className={`${questrial.className} text-xs text-gray-500 mb-2 tracking-wider`}>
                  {product.format}
                </p>
                <p className="text-2xl lg:text-3xl font-light text-white mb-8">
                  {formatPrice(product.price)}
                </p>

                {/* Slide indicators - Simple lines */}
                <div className="flex gap-4 lg:justify-end">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSlideChange(i)}
                      className="group"
                    >
                      <span
                        className={cn(
                          "block h-px transition-all duration-300",
                          i === current
                            ? "w-10 bg-gold"
                            : "w-6 bg-gray-600 group-hover:bg-gray-400"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
