"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/store";
import { SITE_NAME } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "/products", label: "Shop" },
  { href: "/products/vinyls", label: "Vinyl" },
  { href: "/products/cds", label: "CDs" },
  { href: "/products/dvds", label: "DVDs" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-navy/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Simple sans-serif */}
          <Link
            href="/"
            className="text-sm tracking-widest uppercase text-white"
          >
            {SITE_NAME}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-wide text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-8">
            <button
              onClick={toggleCart}
              className="text-xs tracking-wide text-gray-400 hover:text-white transition-colors"
            >
              Cart
              {totalItems > 0 && (
                <span className="ml-1 text-gold">({totalItems})</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-navy z-50 transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <Link
            href="/"
            className="text-sm tracking-widest uppercase text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            {SITE_NAME}
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col items-start justify-center h-[70vh] px-8 gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl font-light text-white hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
