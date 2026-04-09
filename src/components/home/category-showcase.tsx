import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    slug: "cds",
    name: "CDs",
    description: "Crystal clear digital sound",
    image: "https://images.unsplash.com/photo-1629276301820-0f3eedc29571?w=600&h=800&fit=crop",
  },
  {
    slug: "vinyls",
    name: "Vinyls",
    description: "Warm analog experience",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&h=800&fit=crop",
  },
  {
    slug: "dvds",
    name: "DVDs",
    description: "Visual music experiences",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=800&fit=crop",
  },
];

export function CategoryShowcase() {
  return (
    <section className="pt-28 pb-36 lg:pt-40 lg:pb-52 relative border-t-[0.5px] border-gold/20">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(30, 58, 80, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Warm light effects */}
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute -top-20 -right-10 pointer-events-none opacity-60"
        aria-hidden="true"
      />
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute bottom-0 -left-20 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light">
            Choose your preferred way to experience music
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className={cn(
                "group relative aspect-[3/4] rounded-2xl overflow-hidden",
                "border border-[#1e3a50]/30",
                "transition-all duration-500 hover:-translate-y-2 hover:border-gold/30"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030810] via-[#030810]/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm font-light mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-gold text-sm font-medium tracking-wide">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
