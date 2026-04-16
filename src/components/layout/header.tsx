"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";
import { Questrial } from "next/font/google";
import { cn } from "@/lib/utils";
import { useCart } from "@/store";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

// Main categories for mega menu
const mainCategories = [
  {
    slug: "vinyls",
    name: "Vinyls",
    description: "Warm analog experience",
    image: "https://vinyl.com/cdn/shop/files/8258495709489_85quality_Fleetwood_Mac_Vinyl_Rumours_LP.webp",
    productCount: 10,
  },
  {
    slug: "cds",
    name: "CDs",
    description: "Crystal clear digital sound",
    image: "https://vinyl.com/cdn/shop/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp",
    productCount: 5,
  },
  {
    slug: "cassettes",
    name: "Cassettes",
    description: "Retro music vibes",
    image: "https://vinyl.com/cdn/shop/files/8258500198705_85quality_arctic-monkeys-am-lp_1024x1024_b88bbb6b-9eec-460b-80bb-a00687dfa348.webp",
    productCount: 7,
  },
  {
    slug: "dvds",
    name: "DVDs",
    description: "Visual music experiences",
    image: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp",
    productCount: 5,
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Complete your setup",
    image: "https://vinyl.com/cdn/shop/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp",
    productCount: 8,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, toggleCart } = useCart();

  const catalogTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter/leave for catalog dropdown with delay
  const handleCatalogMouseEnter = () => {
    if (catalogTimeoutRef.current) {
      clearTimeout(catalogTimeoutRef.current);
    }
    setCatalogDropdownOpen(true);
  };

  const handleCatalogMouseLeave = () => {
    catalogTimeoutRef.current = setTimeout(() => {
      setCatalogDropdownOpen(false);
    }, 150);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (catalogTimeoutRef.current) clearTimeout(catalogTimeoutRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bleu-dark/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Niche Records"
              width={160}
              height={64}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Left side */}
          <nav className="hidden lg:flex items-center gap-8 ml-8">
            <div
              className="relative"
              onMouseEnter={handleCatalogMouseEnter}
              onMouseLeave={handleCatalogMouseLeave}
            >
              <button
                className={cn(
                  questrial.className,
                  "text-sm font-bold tracking-wider transition-all flex items-center gap-1 hover:-translate-y-0.5",
                  catalogDropdownOpen ? "text-gold" : "text-white hover:text-gold"
                )}
                style={{
                  textShadow: catalogDropdownOpen
                    ? "0 2px 4px rgba(179, 153, 105, 0.3)"
                    : "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                CATALOG
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  catalogDropdownOpen && "rotate-180"
                )} />
              </button>
            </div>
            <Link
              href="/artists"
              className={cn(questrial.className, "text-sm font-bold tracking-wider text-white hover:text-gold transition-all hover:-translate-y-0.5")}
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              ARTISTI
            </Link>
            <Link
              href="/contact"
              className={cn(questrial.className, "text-sm font-bold tracking-wider text-white hover:text-gold transition-all hover:-translate-y-0.5")}
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              CONTACT
            </Link>
          </nav>

          {/* Search Bar - Centered & Large */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Caută după artist, album, gen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 text-sm bg-bleu-medium border border-white/10 rounded-full text-white placeholder-gray-400 outline-none focus:border-white/10 transition-all"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))" }}
              />
            </div>
          </div>

          {/* Right Side - Account, Cart with 3D icon effects */}
          <div className="flex items-center gap-2">
            {/* Search Icon - Mobile */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search
                className="w-5 h-5"
                style={{ filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.9)) drop-shadow(1px 2px 0 rgba(0,0,0,0.7)) drop-shadow(0px 1px 0 rgba(0,0,0,0.5))" }}
              />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
            >
              <User
                className="w-5 h-5"
                style={{ filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.9)) drop-shadow(1px 2px 0 rgba(0,0,0,0.7)) drop-shadow(0px 1px 0 rgba(0,0,0,0.5))" }}
              />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.9)) drop-shadow(1px 2px 0 rgba(0,0,0,0.7)) drop-shadow(0px 1px 0 rgba(0,0,0,0.5))" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 text-bleu-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(to bottom, #c9ad7a 0%, #b39969 100%)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            searchOpen ? "max-h-16 pb-4" : "max-h-0"
          )}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Caută după artist, album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-bleu-medium border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Full-Screen Mega Dropdown - CATALOG */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 transition-all duration-300 hidden lg:block",
          catalogDropdownOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
        onMouseEnter={handleCatalogMouseEnter}
        onMouseLeave={handleCatalogMouseLeave}
      >
        <div className="h-full bg-bleu-dark/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-8 py-16 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-white">Categorii</h2>
              <Link
                href="/products"
                className="text-sm text-gold hover:underline"
                onClick={() => setCatalogDropdownOpen(false)}
              >
                Vezi toate produsele →
              </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-5 gap-6">
              {mainCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="group block"
                  onClick={() => setCatalogDropdownOpen(false)}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-white/70">{category.productCount} produse</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className={`${questrial.className} text-sm text-gray-400 tracking-wider`}>{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-bleu-dark z-50 transition-all duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Niche Records"
              width={140}
              height={56}
              className="h-11 w-auto"
            />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <input
              type="text"
              placeholder="Caută după artist, album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-bleu-medium border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gold/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Mobile Nav Links */}
        <nav className="p-4 space-y-1">
          <Link
            href="/products"
            className={cn(questrial.className, "block py-3 px-4 text-lg font-bold text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors")}
            onClick={() => setMobileMenuOpen(false)}
          >
            CATALOG
          </Link>
          <Link
            href="/artists"
            className={cn(questrial.className, "block py-3 px-4 text-lg font-bold text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors")}
            onClick={() => setMobileMenuOpen(false)}
          >
            ARTISTI
          </Link>
          <Link
            href="/contact"
            className={cn(questrial.className, "block py-3 px-4 text-lg font-bold text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors")}
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  );
}
