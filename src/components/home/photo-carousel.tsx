"use client";

import Image from "next/image";
import CircularGallery from "@/components/CircularGallery";

const galleryItems = [
  {
    image: "/testimonial-cassette.jpg",
    text: "The vinyl collection is incredible! I found albums I've been looking for for years. The sound quality is perfect. — Andrew M.",
  },
  {
    image: "/testimonial-vinyl-collection.jpg",
    text: "Excellent quality and impeccable packaging! Every vinyl arrived in perfect condition. I'll definitely be back for more orders. — Laura B.",
  },
  {
    image: "/testimonial-maria.jpg",
    text: "Fast delivery and premium quality. The team is very attentive to details and customer needs. Highly recommend! — Maria D.",
  },
  {
    image: "/testimonial-vinyl-room.jpg",
    text: "My CD collection has grown considerably thanks to this store. Fair prices and varied selection. — Alex N.",
  },
  {
    image: "/testimonial-cds-room.jpg",
    text: "I found rare albums I haven't seen anywhere else. A true paradise for collectors! — Chris P.",
  },
  {
    image: "/testimonial-player.jpg",
    text: "The best vinyl store around! Impressive selection and impeccable service. I'm a loyal customer. — Elena R.",
  },
  {
    image: "/testimonial-3.jpg",
    text: "Unique atmosphere and authentic music. Every purchase from here brings joy to my home. Thank you for everything! — Victor G.",
  },
  {
    image: "/testimonial-cds-stack.jpg",
    text: "I confidently recommend to all music enthusiasts. Professionalism and dedication to art and customers. — Michael T.",
  },
  {
    image: "/testimonial-record-store.jpg",
    text: "Excellent service from start to finish! Perfect communication and record-time delivery. Thank you! — Anna S.",
  },
  {
    image: "/testimonial-2.jpg",
    text: "Fair prices and 100% original products. I checked every vinyl and they're all impeccable. Great store! — Daniel V.",
  },
  {
    image: "/testimonial-dvds.jpg",
    text: "A perfect shopping experience every time. Their collection is impressive and always updated. — Joanna C.",
  },
];

export function PhotoCarousel() {
  return (
    <section className="relative py-28 lg:py-40 bg-bleu-dark border-t-[0.5px] border-gold/20 overflow-hidden">
      {/* Corner light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={450}
        height={450}
        className="absolute -top-40 -right-32 pointer-events-none opacity-90"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={500}
        height={500}
        className="absolute -bottom-40 -left-40 pointer-events-none opacity-80"
      />

      <div className="h-[600px] w-full relative z-10">
        <CircularGallery
          items={galleryItems}
          bend={2}
          textColor="#FFFFFF"
          borderRadius={0.05}
          font="500 18px system-ui"
          scrollSpeed={2}
          scrollEase={0.075}
          cardWidth={750}
          cardHeight={950}
          gap={0.18}
        />
      </div>
    </section>
  );
}
