"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { DiscoveryItem, RecommendationType } from "@/types/dashboard";

interface DiscoveryCarouselProps {
  items: DiscoveryItem[];
  className?: string;
}

const typeConfig: Record<RecommendationType, {
  icon: React.ElementType;
  gradient: string;
}> = {
  for_you: {
    icon: Sparkles,
    gradient: "from-gold/20 to-transparent",
  },
  because_you_liked: {
    icon: Heart,
    gradient: "from-pink-500/20 to-transparent",
  },
  new_from_artist: {
    icon: Sparkles,
    gradient: "from-blue-500/20 to-transparent",
  },
  trending: {
    icon: Sparkles,
    gradient: "from-green-500/20 to-transparent",
  },
};

export function DiscoveryCarousel({ items, className }: DiscoveryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Navigation arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-bleu-dark/90 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-bleu-dark/90 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/30 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {items.map((item, index) => (
          <DiscoveryCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

interface DiscoveryCardProps {
  item: DiscoveryItem;
  index: number;
}

function DiscoveryCard({ item, index }: DiscoveryCardProps) {
  const config = typeConfig[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex-shrink-0 w-[200px]"
    >
      <Link
        href={`/products/${item.product.category}/${item.product.slug}`}
        className="block group"
      >
        {/* Album art */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="200px"
          />

          {/* Gradient overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-60",
            config.gradient
          )} />

          {/* Play button */}
          {item.previewUrl && (
            <button
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center text-bleu-dark opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
              onClick={(e) => {
                e.preventDefault();
                // Play preview logic
              }}
              aria-label="Play preview"
            >
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </button>
          )}

          {/* Reason badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-bleu-dark/80 backdrop-blur-sm">
            <p className="text-[10px] text-white/80 flex items-center gap-1">
              <config.icon className="w-3 h-3 text-gold" />
              {item.reason}
            </p>
          </div>
        </div>

        {/* Info */}
        <h4 className="font-medium text-white text-sm truncate group-hover:text-gold transition-colors">
          {item.product.name}
        </h4>
        <p className="text-xs text-gray-500 truncate">{item.product.artist}</p>
        <p className="text-sm text-gold font-semibold mt-1">
          {formatPrice(item.product.price)}
        </p>
      </Link>
    </motion.div>
  );
}

interface DiscoveryGridProps {
  items: DiscoveryItem[];
  className?: string;
}

export function DiscoveryGrid({ items, className }: DiscoveryGridProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {items.map((item, index) => (
        <DiscoveryCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
