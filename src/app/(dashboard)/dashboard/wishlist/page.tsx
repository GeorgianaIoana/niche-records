"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Bell,
  BellOff,
  Tag,
  PackageCheck,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { WishlistStats } from "@/components/dashboard/wishlist-alerts";
import { mockWishlist } from "@/data/mock-dashboard";
import type { WishlistItem, WishlistAlertType } from "@/types/dashboard";

type FilterType = "all" | "alerts" | WishlistAlertType;

const alertConfig: Record<WishlistAlertType, {
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}> = {
  price_drop: {
    label: "Preț redus",
    icon: Tag,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  back_in_stock: {
    label: "Înapoi în stoc",
    icon: PackageCheck,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  last_item: {
    label: "Ultimul exemplar",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  pre_order: {
    label: "Pre-comandă",
    icon: Bell,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
};

export default function WishlistPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [items, setItems] = useState(mockWishlist);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "alerts") return item.alertType;
    return item.alertType === filter;
  });

  const alertsCount = items.filter((item) => item.alertType).length;
  const potentialSavings = items.reduce((acc, item) => {
    if (item.alertType === "price_drop" && item.previousPrice) {
      return acc + (item.previousPrice - item.product.price);
    }
    return acc;
  }, 0);

  const handleRemove = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const toggleNotifications = (itemId: string) => {
    setItems(items.map((item) =>
      item.id === itemId
        ? { ...item, notifyOnRestock: !item.notifyOnRestock }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">
          Lista de Dorințe
        </h1>
        <p className="text-gray-400 mt-1">
          {items.length} produse salvate
        </p>
      </div>

      {/* Stats */}
      <WishlistStats
        totalItems={items.length}
        alertsCount={alertsCount}
        potentialSavings={potentialSavings}
      />

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            filter === "all"
              ? "bg-gold/20 text-gold border border-gold/30"
              : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
          )}
        >
          Toate ({items.length})
        </button>
        <button
          onClick={() => setFilter("alerts")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            filter === "alerts"
              ? "bg-gold/20 text-gold border border-gold/30"
              : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
          )}
        >
          Cu alerte ({alertsCount})
        </button>
        {(Object.keys(alertConfig) as WishlistAlertType[]).map((type) => {
          const config = alertConfig[type];
          const count = items.filter((item) => item.alertType === type).length;
          if (count === 0) return null;

          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                filter === type
                  ? cn(config.bgColor, config.color, "border border-current/30")
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
              )}
            >
              <config.icon className="w-4 h-4" />
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <WishlistItemCard
                key={item.id}
                item={item}
                index={index}
                onRemove={handleRemove}
                onToggleNotifications={toggleNotifications}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">
                {filter === "all"
                  ? "Lista ta de dorințe este goală"
                  : "Niciun produs cu acest filtru"}
              </p>
              <Link
                href="/products"
                className="inline-block mt-4 text-gold hover:text-gold-light"
              >
                Explorează colecția
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface WishlistItemCardProps {
  item: WishlistItem;
  index: number;
  onRemove: (id: string) => void;
  onToggleNotifications: (id: string) => void;
}

function WishlistItemCard({ item, index, onRemove, onToggleNotifications }: WishlistItemCardProps) {
  const alertConf = item.alertType ? alertConfig[item.alertType] : null;
  const savings = item.previousPrice ? item.previousPrice - item.product.price : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={cn(
        "relative p-4 rounded-xl border",
        alertConf
          ? cn(alertConf.bgColor, "border-current/20")
          : "bg-white/5 border-white/10"
      )}
    >
      {/* Alert badge */}
      {alertConf && (
        <span className={cn(
          "absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg",
          alertConf.color === "text-gold" && "bg-gold text-bleu-dark",
          alertConf.color === "text-green-400" && "bg-green-500 text-white",
          alertConf.color === "text-red-400" && "bg-red-500 text-white",
          alertConf.color === "text-blue-400" && "bg-blue-500 text-white"
        )}>
          {alertConf.label}
        </span>
      )}

      <div className="flex items-start gap-4">
        {/* Product image */}
        <Link
          href={`/products/${item.product.category}/${item.product.slug}`}
          className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group"
        >
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="96px"
          />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${item.product.category}/${item.product.slug}`}
            className="font-medium text-white hover:text-gold transition-colors line-clamp-1"
          >
            {item.product.name}
          </Link>
          <p className="text-sm text-gray-500">{item.product.artist}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-lg font-semibold text-gold">
              {formatPrice(item.product.price)}
            </span>
            {item.previousPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(item.previousPrice)}
                </span>
                <span className="text-sm text-green-400">
                  -{formatPrice(savings)}
                </span>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Adăugat pe {new Date(item.addedDate).toLocaleDateString("ro-RO")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            className="w-10 h-10 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-bleu-dark transition-colors flex items-center justify-center"
            aria-label="Adaugă în coș"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <button
            onClick={() => onToggleNotifications(item.id)}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              item.notifyOnRestock
                ? "bg-gold/20 text-gold hover:bg-gold/30"
                : "bg-white/5 text-gray-500 hover:text-white"
            )}
            aria-label={item.notifyOnRestock ? "Dezactivează notificările" : "Activează notificările"}
          >
            {item.notifyOnRestock ? (
              <Bell className="w-5 h-5" />
            ) : (
              <BellOff className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="w-10 h-10 rounded-lg bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center justify-center"
            aria-label="Șterge din wishlist"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
