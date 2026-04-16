import Link from "next/link";
import Image from "next/image";
import { Questrial } from "next/font/google";
import { SITE_NAME } from "@/lib/constants";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-gold/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Niche Records"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <p className={`${questrial.className} mt-6 text-xs text-white leading-relaxed max-w-xs uppercase tracking-wider`}>
              Curated music for the discerning collector. Vinyl, CDs, and DVDs — carefully selected.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Shop */}
          <div className="md:col-span-2">
            <p className={`${questrial.className} text-lg text-gold mb-6 uppercase tracking-wider`}>
              Shop
            </p>
            <ul className="space-y-3">
              {["All Products", "Vinyl", "CDs", "DVDs"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "All Products" ? "/products" : `/products/${item.toLowerCase()}`}
                    className={`${questrial.className} text-xs text-white hover:text-gold transition-colors uppercase tracking-wider`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <p className={`${questrial.className} text-lg text-gold mb-6 uppercase tracking-wider`}>
              Info
            </p>
            <ul className="space-y-3">
              {["About", "Shipping", "Returns", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={`${questrial.className} text-xs text-white hover:text-gold transition-colors uppercase tracking-wider`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-2">
            <p className={`${questrial.className} text-lg text-gold mb-6 uppercase tracking-wider`}>
              Contact
            </p>
            <ul className={`${questrial.className} space-y-3 text-xs text-white uppercase tracking-wider`}>
              <li>
                <a
                  href="mailto:contact@niche.ro"
                  className="hover:text-white transition-colors"
                >
                  contact@niche.ro
                </a>
              </li>
              <li className="text-white">București, România</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className={`${questrial.className} text-sm text-gray-600 tracking-wider`}>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className={`${questrial.className} text-sm text-gray-600 hover:text-gray-400 transition-colors tracking-wider`}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className={`${questrial.className} text-sm text-gray-600 hover:text-gray-400 transition-colors tracking-wider`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
