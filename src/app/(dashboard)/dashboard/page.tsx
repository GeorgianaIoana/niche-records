"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Heart,
  Truck,
  Tag,
  AlertTriangle,
  PackageCheck,
  ArrowRight,
  Disc3,
  ShoppingBag,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Play,
  Music,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import {
  mockCollectionStats,
  mockWishlist,
  mockOrders,
  mockDiscoveries,
  getActiveOrders,
  getWishlistWithAlerts,
} from "@/data/mock-dashboard";
import type { Order, WishlistItem, WishlistAlertType } from "@/types/dashboard";

const alertStyles: Record<WishlistAlertType, {
  icon: React.ElementType;
  color: string;
  bg: string;
  label: string;
  glow: string;
  iconBg: string;
}> = {
  price_drop: {
    icon: Tag,
    color: "text-gold",
    bg: "bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20",
    label: "Preț redus",
    glow: "shadow-[0_0_30px_rgba(212,184,122,0.15)]",
    iconBg: "bg-gold/20"
  },
  back_in_stock: {
    icon: PackageCheck,
    color: "text-emerald-400",
    bg: "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
    label: "În stoc",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    iconBg: "bg-emerald-500/20"
  },
  last_item: {
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-gradient-to-r from-rose-500/10 to-rose-500/5 border-rose-500/20",
    label: "Ultimul!",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    iconBg: "bg-rose-500/20"
  },
  pre_order: {
    icon: Clock,
    color: "text-sky-400",
    bg: "bg-gradient-to-r from-sky-500/10 to-sky-500/5 border-sky-500/20",
    label: "Pre-order",
    glow: "shadow-[0_0_30px_rgba(14,165,233,0.15)]",
    iconBg: "bg-sky-500/20"
  },
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bună dimineața";
  if (hour < 18) return "Bună ziua";
  return "Bună seara";
}

export default function DashboardPage() {
  const activeOrders = getActiveOrders();
  const wishlistAlerts = getWishlistWithAlerts();
  const hasActiveOrder = activeOrders.length > 0;
  const hasAlerts = wishlistAlerts.length > 0;
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Greeting - personalized */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <p className="text-sm text-gray-500 mb-1">{greeting}</p>
        <h1 className="text-2xl font-heading font-semibold text-white">
          Alexandru
        </h1>
      </motion.div>

      {/* PRIORITY 1: Active Orders - The #1 thing users check */}
      {hasActiveOrder && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ActiveOrderCard order={activeOrders[0]} />
        </motion.section>
      )}

      {/* PRIORITY 2: Wishlist Alerts - Direct conversion opportunity */}
      {hasAlerts && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold" />
              Oportunități din Wishlist
            </h2>
            <Link href="/dashboard/wishlist" className="text-sm text-gold hover:text-gold-light">
              Vezi toate ({mockWishlist.length})
            </Link>
          </div>
          <div className="space-y-3">
            {wishlistAlerts.slice(0, 3).map((item, index) => (
              <WishlistAlertCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* PRIORITY 3: Quick Stats - Visual hierarchy */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3"
      >
        <Link
          href="/dashboard/collection"
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] hover:border-gold/20 transition-all duration-300 overflow-hidden"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Disc3 className="w-4.5 h-4.5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{mockCollectionStats.totalItems}</p>
            <p className="text-xs text-gray-500 mt-0.5">În colecție</p>
          </div>

          <ChevronRight className="absolute top-4 right-3 w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/dashboard/wishlist"
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] hover:border-rose-500/20 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-4.5 h-4.5 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{mockWishlist.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">În wishlist</p>
            {wishlistAlerts.length > 0 && (
              <span className="absolute top-3 right-3 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                {wishlistAlerts.length} nou
              </span>
            )}
          </div>

          <ChevronRight className="absolute bottom-4 right-3 w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/dashboard/orders"
          className="group relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] hover:border-sky-500/20 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-sky-500/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Package className="w-4.5 h-4.5 text-sky-400" />
            </div>
            <p className="text-2xl font-bold text-white tracking-tight">{mockOrders.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Comenzi</p>
            {hasActiveOrder && (
              <span className="absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/20 text-sky-400 rounded-full">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                Activă
              </span>
            )}
          </div>

          <ChevronRight className="absolute bottom-4 right-3 w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </motion.section>

      {/* PRIORITY 4: Discoveries - Only if no orders/alerts to show */}
      {(!hasActiveOrder || !hasAlerts) && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              Pentru tine
            </h2>
            <Link href="/products" className="text-sm text-gold hover:text-gold-light flex items-center gap-1 group">
              Explorează
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockDiscoveries.slice(0, 4).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
              >
                <Link
                  href={`/products/${item.product.category}/${item.product.slug}`}
                  className="group block"
                >
                  {/* Image container with effects */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-white/[0.05] to-transparent">
                    <Image
                      src={item.product.images[0]?.url || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="150px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(212,184,122,0.15)] opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-4 h-4 text-bleu-dark ml-0.5" fill="currentColor" />
                      </div>
                    </div>

                    {/* Price badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-gold">{formatPrice(item.product.price)}</span>
                    </div>
                  </div>

                  {/* Text content */}
                  <p className="text-sm text-white truncate group-hover:text-gold transition-colors font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{item.product.artist}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Empty state - when nothing urgent - with premium polish */}
      {!hasActiveOrder && !hasAlerts && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative text-center py-12 px-6"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-gold/[0.02]" />
            {/* Subtle vinyl record pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03]">
              <div className="w-full h-full rounded-full border-[16px] border-white" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white" />
            </div>
          </div>

          {/* Icon illustration */}
          <motion.div
            className="relative mb-6 inline-flex"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shadow-[0_0_40px_rgba(212,184,122,0.15)]">
              <Music className="w-7 h-7 text-gold" />
            </div>
            {/* Decorative rings */}
            <div className="absolute -inset-2 rounded-full border border-gold/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 rounded-full border border-gold/5" />
          </motion.div>

          <p className="relative text-gray-400 mb-6 max-w-xs mx-auto leading-relaxed">
            Totul e în ordine. Poate e timpul pentru o nouă descoperire muzicală?
          </p>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/products"
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-bleu-dark font-semibold rounded-xl shadow-[0_4px_20px_rgba(212,184,122,0.3)] hover:shadow-[0_6px_30px_rgba(212,184,122,0.4)] transition-all overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <ShoppingBag className="w-4 h-4" />
              <span>Explorează colecția</span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Active Order Card - Clean, elegant design
function ActiveOrderCard({ order }: { order: Order }) {
  const latestEvent = order.trackingEvents[order.trackingEvents.length - 1];
  const daysUntilDelivery = order.estimatedDelivery
    ? Math.max(0, Math.ceil((new Date(order.estimatedDelivery).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const statusSteps = [
    { key: "processing", label: "Procesare" },
    { key: "shipped", label: "Expediat" },
    { key: "in_transit", label: "În drum" },
    { key: "delivered", label: "Livrat" },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <Link
      href={`/dashboard/orders`}
      className="group block p-5 rounded-xl bg-gradient-to-br from-gold/8 to-gold/3 border border-gold/20 hover:border-gold/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center">
            <Truck className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="font-medium text-white">Comandă în drum</p>
            <p className="text-sm text-gray-400">#{order.orderNumber}</p>
          </div>
        </div>

        {daysUntilDelivery !== null && (
          <div className="text-right">
            <p className="text-3xl font-bold text-gold">{daysUntilDelivery}</p>
            <p className="text-xs text-gray-500">{daysUntilDelivery === 1 ? "zi" : "zile"}</p>
          </div>
        )}
      </div>

      {/* Progress bar with step dots */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {statusSteps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-2 h-2 rounded-full mb-1.5 transition-colors",
                  index <= currentStepIndex ? "bg-gold" : "bg-white/20"
                )}
              />
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider",
                  index <= currentStepIndex ? "text-gold" : "text-gray-600"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / statusSteps.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Latest update */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{latestEvent.location || latestEvent.description}</span>
        </div>
        <span className="text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
          Detalii <ArrowRight className="w-4 h-4" />
        </span>
      </div>

      {/* Products preview */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, idx) => (
            <div
              key={item.product.id}
              className="w-10 h-10 rounded-md overflow-hidden border-2 border-bleu-dark"
              style={{ zIndex: 3 - idx }}
            >
              <Image
                src={item.product.images[0]?.url || "/placeholder.jpg"}
                alt={item.product.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {order.items.length} {order.items.length === 1 ? "produs" : "produse"} · {formatPrice(order.total)}
        </span>
      </div>
    </Link>
  );
}

// Wishlist Alert Card - Conversion focused with premium polish
function WishlistAlertCard({ item, index }: { item: WishlistItem; index: number }) {
  if (!item.alertType) return null;

  const style = alertStyles[item.alertType];
  const Icon = style.icon;
  const savings = item.previousPrice ? item.previousPrice - item.product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
        style.bg,
        style.glow,
        "hover:border-opacity-50"
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Product image with hover effect */}
      <Link
        href={`/products/${item.product.category}/${item.product.slug}`}
        className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group/img"
      >
        <Image
          src={item.product.images[0]?.url || "/placeholder.jpg"}
          alt={item.product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover/img:scale-110"
          sizes="64px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
      </Link>

      {/* Info */}
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {/* Icon with background */}
          <div className={cn("w-5 h-5 rounded-md flex items-center justify-center", style.iconBg)}>
            <Icon className={cn("w-3 h-3", style.color)} />
          </div>
          <span className={cn("text-xs font-medium uppercase tracking-wider", style.color)}>
            {style.label}
          </span>
        </div>
        <Link
          href={`/products/${item.product.category}/${item.product.slug}`}
          className="font-medium text-white hover:text-gold transition-colors line-clamp-1"
        >
          {item.product.name}
        </Link>
        <p className="text-xs text-gray-500">{item.product.artist}</p>
      </div>

      {/* Price & Action */}
      <div className="relative text-right flex-shrink-0">
        <p className="text-lg font-bold text-gold">{formatPrice(item.product.price)}</p>
        {savings > 0 && (
          <motion.p
            className="text-xs text-emerald-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.2 }}
          >
            -{formatPrice(savings)}
          </motion.p>
        )}
        <motion.button
          className="mt-2 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-gold to-gold-light text-bleu-dark rounded-lg shadow-[0_2px_8px_rgba(212,184,122,0.3)] hover:shadow-[0_4px_12px_rgba(212,184,122,0.4)] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Adaugă în coș
        </motion.button>
      </div>
    </motion.div>
  );
}
