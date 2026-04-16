"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Tag,
  PackageCheck,
  AlertTriangle,
  Bell,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { WishlistItem, WishlistAlertType } from "@/types/dashboard";

interface WishlistAlertsProps {
  items: WishlistItem[];
  maxItems?: number;
  className?: string;
}

const alertConfig: Record<WishlistAlertType, {
  label: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badge: string;
}> = {
  price_drop: {
    label: "Preț redus!",
    icon: Tag,
    bgColor: "bg-gold/10",
    textColor: "text-gold",
    borderColor: "border-gold/30",
    badge: "bg-gold text-bleu-dark",
  },
  back_in_stock: {
    label: "Înapoi în stoc",
    icon: PackageCheck,
    bgColor: "bg-green-500/10",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    badge: "bg-green-500 text-white",
  },
  last_item: {
    label: "Ultimul exemplar!",
    icon: AlertTriangle,
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    badge: "bg-red-500 text-white",
  },
  pre_order: {
    label: "Pre-comandă",
    icon: Bell,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    badge: "bg-blue-500 text-white",
  },
};

export function WishlistAlerts({ items, maxItems = 3, className }: WishlistAlertsProps) {
  const alertItems = items.filter((item) => item.alertType);
  const displayItems = alertItems.slice(0, maxItems);
  const remainingCount = alertItems.length - maxItems;

  if (alertItems.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <Bell className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-500 text-sm">Nicio alertă activă</p>
        <p className="text-gray-600 text-xs mt-1">
          Adaugă produse în wishlist pentru alerte
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <AnimatePresence mode="popLayout">
        {displayItems.map((item, index) => (
          <WishlistAlertCard key={item.id} item={item} index={index} />
        ))}
      </AnimatePresence>

      {remainingCount > 0 && (
        <Link
          href="/dashboard/wishlist"
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          +{remainingCount} alte alerte
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

interface WishlistAlertCardProps {
  item: WishlistItem;
  index: number;
}

function WishlistAlertCard({ item, index }: WishlistAlertCardProps) {
  if (!item.alertType) return null;

  const config = alertConfig[item.alertType];
  const savings = item.previousPrice
    ? item.previousPrice - item.product.price
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "relative p-3 rounded-xl border",
        config.bgColor,
        config.borderColor
      )}
    >
      {/* Alert badge */}
      <span className={cn(
        "absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg",
        config.badge
      )}>
        {config.label}
      </span>

      <div className="flex items-center gap-3">
        {/* Product image */}
        <Link
          href={`/products/${item.product.category}/${item.product.slug}`}
          className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
        >
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${item.product.category}/${item.product.slug}`}
            className="font-medium text-white text-sm hover:text-gold transition-colors line-clamp-1"
          >
            {item.product.name}
          </Link>
          <p className="text-xs text-gray-500">{item.product.artist}</p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-gold">
              {formatPrice(item.product.price)}
            </span>
            {item.previousPrice && (
              <>
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(item.previousPrice)}
                </span>
                <span className="text-xs text-green-400">
                  -{formatPrice(savings)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
            "bg-gold/20 text-gold hover:bg-gold hover:text-bleu-dark"
          )}
          aria-label="Adaugă în coș"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

interface WishlistStatsProps {
  totalItems: number;
  alertsCount: number;
  potentialSavings: number;
  className?: string;
}

export function WishlistStats({
  totalItems,
  alertsCount,
  potentialSavings,
  className,
}: WishlistStatsProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      <div className="text-center p-3 rounded-lg bg-white/5">
        <p className="text-2xl font-bold text-white">{totalItems}</p>
        <p className="text-xs text-gray-500">În wishlist</p>
      </div>
      <div className="text-center p-3 rounded-lg bg-white/5">
        <p className="text-2xl font-bold text-gold">{alertsCount}</p>
        <p className="text-xs text-gray-500">Alerte active</p>
      </div>
      <div className="text-center p-3 rounded-lg bg-white/5">
        <p className="text-2xl font-bold text-green-400">{formatPrice(potentialSavings)}</p>
        <p className="text-xs text-gray-500">Economii</p>
      </div>
    </div>
  );
}
