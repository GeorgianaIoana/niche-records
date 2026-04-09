"use client";

import { CircularGallery } from "@/components/ui/circular-gallery";

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    text: "Concert",
  },
  {
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=600&fit=crop",
    text: "Record Store",
  },
  {
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    text: "Live Music",
  },
  {
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
    text: "Vinyl Collection",
  },
  {
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    text: "Festival",
  },
  {
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
    text: "Studio",
  },
  {
    image: "https://images.unsplash.com/photo-1629276301820-0f3eedc29571?w=800&h=600&fit=crop",
    text: "Album Art",
  },
  {
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=600&fit=crop",
    text: "Turntable",
  },
];

export function PhotoCarousel() {
  return (
    <section className="py-28 lg:py-40 bg-bleu-dark border-t-[0.5px] border-gold/20">
      <div className="h-[600px] w-full">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#D4B87A"
          borderRadius={0.05}
          font="bold 24px system-ui"
        />
      </div>
    </section>
  );
}
