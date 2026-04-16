import Image from "next/image";
import Link from "next/link";
import { Questrial } from "next/font/google";
import { getFeaturedProducts } from "@/data/products";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

export function HeroStatic() {
  const product = getFeaturedProducts()[0];

  if (!product) {
    return null;
  }

  return (
    <section className="relative h-screen min-h-[700px] grain-overlay">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={product.images[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/75" />
      </div>

      {/* Floating ambient light orbs */}
      <div className="ambient-lights">
        <div className="light-orb light-orb--gold light-orb--1" />
        <div className="light-orb light-orb--warm light-orb--2" />
        <div className="light-orb light-orb--soft light-orb--3" />
        <div className="light-orb light-orb--gold light-orb--4" />
      </div>

      {/* Content - centered */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6">
          {/* Badge */}
          <span className="inline-block border border-gold text-gold text-xs tracking-[0.2em] uppercase px-4 py-2 mb-8">
            Out Now
          </span>

          {/* Product name */}
          <h1
            className={`${questrial.className} text-5xl lg:text-7xl text-white mb-4 text-balance`}
            style={{
              textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
            }}
          >
            {product.name}
          </h1>

          {/* Artist */}
          <p className={`${questrial.className} text-xl lg:text-2xl text-gray-300 mb-10 tracking-wider`}>
            {product.artist}
          </p>

          {/* CTA */}
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="inline-block bg-gold text-navy px-8 py-3 text-sm tracking-wide font-medium hover:bg-gold/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
