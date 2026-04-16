import Link from "next/link";
import Image from "next/image";
import { Questrial } from "next/font/google";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

const categories = [
  {
    slug: "vinyls",
    name: "Vinyls",
    image: "https://vinyl.com/cdn/shop/files/8258495709489_85quality_Fleetwood_Mac_Vinyl_Rumours_LP.webp",
    productCount: 10,
  },
  {
    slug: "cds",
    name: "CDs",
    image: "https://vinyl.com/cdn/shop/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp",
    productCount: 5,
  },
  {
    slug: "cassettes",
    name: "Cassettes",
    image: "https://vinyl.com/cdn/shop/files/8258500198705_85quality_arctic-monkeys-am-lp_1024x1024_b88bbb6b-9eec-460b-80bb-a00687dfa348.webp",
    productCount: 7,
  },
  {
    slug: "dvds",
    name: "DVDs",
    image: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp",
    productCount: 5,
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: "https://vinyl.com/cdn/shop/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp",
    productCount: 8,
  },
];

export function CategoryShowcase() {
  return (
    <section className="pt-28 pb-36 lg:pt-40 lg:pb-52 relative border-t-[0.5px] border-gold/20 overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(30, 58, 80, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Blue light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={450}
        height={450}
        className="absolute -top-40 -right-32 pointer-events-none opacity-90"
        aria-hidden="true"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={500}
        height={500}
        className="absolute -bottom-40 -left-40 pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2
            className={`${questrial.className} text-2xl lg:text-3xl text-white uppercase`}
            style={{
              textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
            }}
          >
            Popular Categories
          </h2>
          <p
            className={`${questrial.className} mt-3 text-lg max-w-xl mx-auto tracking-wider`}
            style={{
              background: 'linear-gradient(180deg, #b0e8ff 0%, #c8f0ff 50%, #1e3a50 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Explore our collection of vinyls, CDs, and accessories
          </p>
        </div>

        {/* Category Cards - Semicircle arc */}
        <div
          className="flex justify-center items-center gap-3 lg:gap-4 px-4"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          {categories.map((category, index) => {
            const middleIndex = 2;
            const position = index - middleIndex; // -2, -1, 0, 1, 2

            // Smooth arc rotation
            const rotateY = position * 18;

            // Arc depth - parabolic curve for natural feel
            const depth = Math.pow(position, 2);
            const translateZ = 50 - depth * 20;

            // Pull edge cards inward for tighter arc
            const translateX = position * -8;

            // Gradual scale reduction toward edges
            const scale = 1 - Math.abs(position) * 0.06;

            // Progressive shadow intensity
            const shadowOpacity = 0.25 + (2 - Math.abs(position)) * 0.1;

            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden w-full max-w-[220px] flex-shrink-0 transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  boxShadow: `0 ${20 + (2 - Math.abs(position)) * 10}px ${40 + (2 - Math.abs(position)) * 15}px -10px rgba(0, 0, 0, ${shadowOpacity})`,
                }}
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 220px"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-4 lg:p-5 flex flex-col justify-end">
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-0.5">
                    {category.name}
                  </h3>
                  <p className={`${questrial.className} text-xs text-white/70 mb-3 tracking-wider`}>
                    {category.productCount} Products
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Shop Now
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-gold/40 transition-all duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
