import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Ambient glow effect - centered light source like Bleu de Chanel */}
      <div className="absolute inset-0">
        {/* Central glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(30, 58, 80, 0.4) 0%, rgba(18, 37, 53, 0.2) 40%, transparent 70%)',
          }}
        />
        {/* Subtle gold ambient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[400px] animate-glow-pulse"
          style={{
            background: 'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(196, 163, 90, 0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 30%, rgba(3, 8, 16, 0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6 font-light">
          Premium Music Collection
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
          Curated Sounds for
          <span className="block mt-2 text-gray-100">the Discerning Ear</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Explore our exclusive collection of CDs, Vinyls, and DVDs.
          Each piece selected for exceptional quality and timeless artistry.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="min-w-[200px]">
              Shop Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/products/vinyls">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Explore Vinyls
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
