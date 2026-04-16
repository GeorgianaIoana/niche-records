"use client";

import { Questrial } from "next/font/google";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    name: "Andrei M.",
    text: "Colecția de vinyl e incredibilă!",
  },
  {
    image: "/testimonial-1.jpg",
    name: "Laura B.",
    text: "Vinylurile sună absolut fantastic!",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    name: "Maria D.",
    text: "Livrare rapidă, calitate premium.",
  },
  {
    image: "/testimonial-2.jpg",
    name: "Alexandru N.",
    text: "Colecția mea de CD-uri a crescut!",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    name: "Cristian P.",
    text: "Am găsit albume rare aici.",
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    name: "Elena R.",
    text: "Cel mai bun magazin de vinyl!",
  },
  {
    image: "/testimonial-3.jpg",
    name: "Vlad G.",
    text: "Atmosferă unică, muzică autentică.",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    name: "Mihai T.",
    text: "Recomand cu încredere.",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
    name: "Ana S.",
    text: "Servicii excelente, mulțumesc!",
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
    name: "Dan V.",
    text: "Prețuri corecte, produse originale.",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face",
    name: "Ioana C.",
    text: "O experiență de cumpărare perfectă.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="relative w-[200px] h-[260px] flex-shrink-0 rounded-2xl overflow-hidden group">
      {/* Photo using img tag */}
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bleu-deepest via-bleu-deepest/40 to-transparent" />

      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className={`${questrial.className} text-white text-sm font-medium mb-1 leading-tight tracking-wider`}>
          "{testimonial.text}"
        </p>
        <p className="text-gold text-xs">
          — {testimonial.name}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Duplicate for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <h2
          className={`${questrial.className} text-2xl lg:text-3xl text-white uppercase mb-4`}
          style={{
            textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
          }}
        >
          Ce spun clienții noștri
        </h2>
        <p className={`${questrial.className} text-gray-400 max-w-md tracking-wider`}>
          Peste 1000 de iubitori de muzică au ales Niche Records.
        </p>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        <div className="flex gap-5 animate-scroll-testimonials hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
