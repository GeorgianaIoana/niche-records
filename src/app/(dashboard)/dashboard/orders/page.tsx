"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ChevronRight,
  Filter,
  Search,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { OrderTracking, OrderTimeline } from "@/components/dashboard/order-tracking";
import { mockOrders } from "@/data/mock-dashboard";
import type { Order, OrderStatus } from "@/types/dashboard";

type FilterStatus = "all" | OrderStatus;

const statusLabels: Record<FilterStatus, string> = {
  all: "Toate",
  processing: "În procesare",
  shipped: "Expediate",
  in_transit: "În drum",
  delivered: "Livrate",
  cancelled: "Anulate",
};

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some((item) =>
          item.product.name.toLowerCase().includes(query) ||
          item.product.artist.toLowerCase().includes(query)
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">
            Comenzile Mele
          </h1>
          <p className="text-gray-400 mt-1">
            {mockOrders.length} comenzi plasate
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Caută după comandă sau produs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
        {(Object.keys(statusLabels) as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === status
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
            )}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border transition-all",
                      selectedOrder?.id === order.id
                        ? "bg-gold/10 border-gold/30"
                        : "bg-white/5 border-white/10 hover:border-gold/20"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          #{order.orderNumber}
                        </p>
                        <p className="text-lg font-semibold text-white mt-1">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString("ro-RO")}
                        </p>
                      </div>
                    </div>

                    {/* Product previews */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 4).map((item) => (
                          <div
                            key={item.product.id}
                            className="w-10 h-10 rounded-lg overflow-hidden border-2 border-bleu-dark"
                          >
                            <Image
                              src={item.product.images[0]?.url || "/placeholder.jpg"}
                              alt={item.product.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400">
                        {order.items.length} {order.items.length === 1 ? "produs" : "produse"}
                      </p>
                      <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                    </div>

                    {/* Status indicator */}
                    <OrderTracking order={order} compact />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">Nicio comandă găsită</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Details */}
        <div className="lg:sticky lg:top-28 h-fit">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Detalii comandă</p>
                    <p className="text-xl font-heading font-semibold text-white mt-1">
                      #{selectedOrder.orderNumber}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-gold">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>

                {/* Products */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    Produse
                  </p>
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || "/placeholder.jpg"}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.product.artist}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gold font-semibold">
                          {formatPrice(item.priceAtPurchase)}
                        </p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                    Urmărire
                  </p>
                  <OrderTimeline events={selectedOrder.trackingEvents} />
                </div>

                {/* Shipping address */}
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                    Adresă livrare
                  </p>
                  <div className="p-3 rounded-lg bg-white/5 text-sm">
                    <p className="text-white font-medium">
                      {selectedOrder.shippingAddress.name}
                    </p>
                    <p className="text-gray-400">
                      {selectedOrder.shippingAddress.street}
                    </p>
                    <p className="text-gray-400">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p className="text-gray-400">
                      {selectedOrder.shippingAddress.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-dashed border-white/10 rounded-xl"
              >
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p className="text-gray-500">Selectează o comandă pentru detalii</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
