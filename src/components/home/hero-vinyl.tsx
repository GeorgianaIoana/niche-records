import Image from "next/image";
import Link from "next/link";

export function HeroVinyl() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="/hero-banner.png"
        alt="Music experience"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-bleu-dark/90 via-bleu-dark/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-2xl">
          {/* Heading - Staggered style with 3D depth effect */}
          <h1 className="font-heading font-black uppercase mb-8 leading-[0.9]">
            {/* First word - in front with 3D effect */}
            <span className="relative block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              {/* Shadow layers for 3D extrusion - back to front */}
              <span className="absolute top-[10px] left-[10px] text-black/15" aria-hidden="true">Niche</span>
              <span className="absolute top-[8px] left-[8px] text-black/25" aria-hidden="true">Niche</span>
              <span className="absolute top-[6px] left-[6px] text-black/35" aria-hidden="true">Niche</span>
              <span className="absolute top-[5px] left-[5px] text-black/45" aria-hidden="true">Niche</span>
              <span className="absolute top-[4px] left-[4px] text-[#2a3a4a]" aria-hidden="true">Niche</span>
              <span className="absolute top-[3px] left-[3px] text-[#3a4a5a]" aria-hidden="true">Niche</span>
              <span className="absolute top-[2px] left-[2px] text-[#5a6a7a]" aria-hidden="true">Niche</span>
              <span className="absolute top-[1px] left-[1px] text-[#7a8a9a]" aria-hidden="true">Niche</span>
              {/* Main text */}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(to bottom, #ffffff 0%, #e0e0e0 50%, #c0c0c0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Niche
              </span>
            </span>
            {/* Second word - behind effect with gradient ending in white */}
            <span
              className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ml-8 sm:ml-12 lg:ml-16 -mt-2 sm:-mt-4 lg:-mt-6"
              style={{
                background: "linear-gradient(to bottom, #ffffff 0%, #a0b4c8 50%, #4a6a8a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Records
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-md tracking-wide">
            Descoperă colecția noastră de vinyluri, CD-uri și accesorii audio
            pentru o experiență muzicală autentică.
          </p>

          {/* CTA Buttons - Pill style 3D */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/products"
              className="btn-gold-3d inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full"
            >
              <span>✦</span>
              Shop Now
            </Link>
            <Link
              href="/products/vinyls"
              className="btn-secondary-3d inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full"
            >
              + Explore Vinyls
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
