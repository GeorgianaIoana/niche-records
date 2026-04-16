"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/dashboard";

interface OrderTrackingProps {
  order: Order;
  compact?: boolean;
  className?: string;
}

const statusConfig: Record<OrderStatus, {
  label: string;
  icon: React.ElementType;
  color: string;
  step: number;
}> = {
  processing: {
    label: "În procesare",
    icon: Clock,
    color: "text-yellow-400",
    step: 1,
  },
  shipped: {
    label: "Expediat",
    icon: Package,
    color: "text-blue-400",
    step: 2,
  },
  in_transit: {
    label: "În drum",
    icon: Truck,
    color: "text-gold",
    step: 3,
  },
  delivered: {
    label: "Livrat",
    icon: CheckCircle2,
    color: "text-green-400",
    step: 4,
  },
  cancelled: {
    label: "Anulat",
    icon: Package,
    color: "text-red-400",
    step: 0,
  },
};

export function OrderTracking({ order, compact = false, className }: OrderTrackingProps) {
  const config = statusConfig[order.status];
  const progress = (config.step / 4) * 100;

  // Calculate days until delivery
  const daysUntilDelivery = order.estimatedDelivery
    ? Math.ceil((new Date(order.estimatedDelivery).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  if (compact) {
    return (
      <Link
        href={`/dashboard/orders/${order.id}`}
        className={cn(
          "block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all group",
          className
        )}
      >
        <div className="flex items-center gap-4">
          {/* Album art stack */}
          <div className="relative w-14 h-14 flex-shrink-0">
            {order.items.slice(0, 3).map((item, index) => (
              <div
                key={item.product.id}
                className="absolute rounded-md overflow-hidden border border-white/10"
                style={{
                  width: "100%",
                  height: "100%",
                  left: index * 4,
                  top: index * -4,
                  zIndex: 3 - index,
                }}
              >
                <Image
                  src={item.product.images[0]?.url || "/placeholder.jpg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {order.items.length} {order.items.length === 1 ? "produs" : "produse"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <config.icon className={cn("w-4 h-4", config.color)} />
              <span className={cn("text-sm", config.color)}>{config.label}</span>
            </div>
          </div>

          {daysUntilDelivery !== null && daysUntilDelivery > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-gold">{daysUntilDelivery}</p>
              <p className="text-xs text-gray-500">zile</p>
            </div>
          )}

          <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gold group-hover:translate-x-1 transition-all" />
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("p-6 rounded-xl bg-white/5 border border-white/10", className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Comanda #{order.orderNumber}</p>
          <p className="font-heading text-xl font-semibold text-white">
            {order.items.length} {order.items.length === 1 ? "produs" : "produse"}
          </p>
        </div>
        <span className="text-lg font-semibold text-gold">
          {formatPrice(order.total)}
        </span>
      </div>

      {/* Progress Steps */}
      <div className="relative mb-8">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="relative flex justify-between">
          {(["processing", "shipped", "in_transit", "delivered"] as OrderStatus[]).map((status, index) => {
            const stepConfig = statusConfig[status];
            const isCompleted = stepConfig.step <= config.step;
            const isCurrent = status === order.status;

            return (
              <div key={status} className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isCompleted
                      ? "bg-gold border-gold"
                      : "bg-bleu-dark border-white/20"
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <stepConfig.icon
                    className={cn(
                      "w-5 h-5",
                      isCompleted ? "text-bleu-dark" : "text-gray-500"
                    )}
                  />
                </motion.div>
                <p className={cn(
                  "mt-2 text-xs text-center",
                  isCurrent ? "text-gold font-medium" : "text-gray-500"
                )}>
                  {stepConfig.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery info */}
      {daysUntilDelivery !== null && daysUntilDelivery > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gold/10 border border-gold/20">
          <Truck className="w-5 h-5 text-gold" />
          <div className="flex-1">
            <p className="text-sm text-white">
              Estimare livrare: <span className="font-semibold">{daysUntilDelivery} zile</span>
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
          </div>
        </div>
      )}

      {/* Products preview */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex -space-x-3">
          {order.items.slice(0, 4).map((item) => (
            <div
              key={item.product.id}
              className="w-12 h-12 rounded-lg overflow-hidden border-2 border-bleu-dark"
            >
              <Image
                src={item.product.images[0]?.url || "/placeholder.jpg"}
                alt={item.product.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        {order.items.length > 4 && (
          <span className="text-sm text-gray-400">+{order.items.length - 4} altele</span>
        )}
      </div>
    </div>
  );
}

interface OrderTimelineProps {
  events: Order["trackingEvents"];
  className?: string;
}

export function OrderTimeline({ events, className }: OrderTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => {
        const config = statusConfig[event.status];
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                isLast ? "bg-gold/20" : "bg-white/10"
              )}>
                <config.icon className={cn("w-4 h-4", isLast ? "text-gold" : "text-gray-500")} />
              </div>
              {index < events.length - 1 && (
                <div className="w-px h-full min-h-[24px] bg-white/10" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className={cn(
                "font-medium",
                isLast ? "text-white" : "text-gray-400"
              )}>
                {event.description}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {new Date(event.date).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {event.location && ` · ${event.location}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
