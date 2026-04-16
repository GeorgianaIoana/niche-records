"use client";

import { CircularGallery } from "@/components/ui/circular-gallery";

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
    text: "Colecția de vinyl e incredibilă!",
    author: "Andrei M.",
  },
  {
    image: "/testimonial-1.jpg",
    text: "Vinylurile sună absolut fantastic!",
    author: "Laura B.",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&crop=face",
    text: "Livrare rapidă, calitate premium.",
    author: "Maria D.",
  },
  {
    image: "/testimonial-2.jpg",
    text: "Colecția mea de CD-uri a crescut!",
    author: "Alexandru N.",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=face",
    text: "Am găsit albume rare aici.",
    author: "Cristian P.",
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=face",
    text: "Cel mai bun magazin de vinyl!",
    author: "Elena R.",
  },
  {
    image: "/testimonial-3.jpg",
    text: "Atmosferă unică, muzică autentică.",
    author: "Vlad G.",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&crop=face",
    text: "Recomand cu încredere.",
    author: "Mihai T.",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&crop=face",
    text: "Servicii excelente, mulțumesc!",
    author: "Ana S.",
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop&crop=face",
    text: "Prețuri corecte, produse originale.",
    author: "Dan V.",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&crop=face",
    text: "O experiență perfectă.",
    author: "Ioana C.",
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
          scrollSpeed={2}
          scrollEase={0.075}
        />
      </div>
    </section>
  );
}
