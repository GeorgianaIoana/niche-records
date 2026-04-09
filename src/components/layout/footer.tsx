import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <Link
              href="/"
              className="font-serif text-lg italic tracking-wide text-white"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-xs">
              Curated music for the discerning collector. Vinyl, CDs, and DVDs — carefully selected.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Shop */}
          <div className="md:col-span-2">
            <p className="text-xs text-gold mb-6">
              Shop
            </p>
            <ul className="space-y-3">
              {["All Products", "Vinyl", "CDs", "DVDs"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "All Products" ? "/products" : `/products/${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <p className="text-xs text-gold mb-6">
              Info
            </p>
            <ul className="space-y-3">
              {["About", "Shipping", "Returns", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-2">
            <p className="text-xs text-gold mb-6">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:contact@niche.ro"
                  className="hover:text-white transition-colors"
                >
                  contact@niche.ro
                </a>
              </li>
              <li className="text-gray-500">București, România</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
