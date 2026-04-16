"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Disc3,
  Disc,
  Film,
  Grid3X3,
  List,
  Search,
  Filter,
  SortAsc,
  Calendar,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { mockCollection, mockCollectionStats } from "@/data/mock-dashboard";
import type { CollectionItem } from "@/types/dashboard";
import type { Format } from "@/types/product";

type ViewMode = "grid" | "list";
type SortBy = "date" | "name" | "artist" | "value";
type FilterFormat = "all" | Format;

const formatIcons: Record<string, React.ElementType> = {
  Vinyl: Disc3,
  CD: Disc,
  DVD: Film,
  "Blu-Ray": Film,
};

export default function CollectionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [filterFormat, setFilterFormat] = useState<FilterFormat>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollection = mockCollection
    .filter((item) => {
      if (filterFormat !== "all" && item.product.format !== filterFormat) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.product.name.toLowerCase().includes(query) ||
          item.product.artist.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        case "name":
          return a.product.name.localeCompare(b.product.name);
        case "artist":
          return a.product.artist.localeCompare(b.product.artist);
        case "value":
          return b.purchasePrice - a.purchasePrice;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">
            Colecția Mea
          </h1>
          <p className="text-gray-400 mt-1">
            {mockCollectionStats.totalItems} albume · Valoare ~{formatPrice(mockCollectionStats.totalValue)}
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-gold/20 text-gold"
                : "text-gray-500 hover:text-white"
            )}
            aria-label="Grid view"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "list"
                ? "bg-gold/20 text-gold"
                : "text-gray-500 hover:text-white"
            )}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Vinyl", count: mockCollectionStats.byFormat.Vinyl, icon: Disc3, color: "text-gold" },
          { label: "CD", count: mockCollectionStats.byFormat.CD, icon: Disc, color: "text-gray-300" },
          { label: "DVD/Blu-Ray", count: mockCollectionStats.byFormat.DVD + mockCollectionStats.byFormat["Blu-Ray"], icon: Film, color: "text-blue-400" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setFilterFormat(item.label === "DVD/Blu-Ray" ? "DVD" : item.label as FilterFormat)}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border transition-all",
              filterFormat === item.label || (filterFormat === "DVD" && item.label === "DVD/Blu-Ray")
                ? "bg-gold/10 border-gold/30"
                : "bg-white/5 border-white/10 hover:border-gold/20"
            )}
          >
            <item.icon className={cn("w-6 h-6", item.color)} />
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{item.count}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Caută în colecție..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-gold/50"
          />
        </div>

        {/* Format filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value as FilterFormat)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
          >
            <option value="all">Toate formatele</option>
            <option value="Vinyl">Vinyl</option>
            <option value="CD">CD</option>
            <option value="DVD">DVD</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50"
          >
            <option value="date">Dată achiziție</option>
            <option value="name">Nume album</option>
            <option value="artist">Artist</option>
            <option value="value">Valoare</option>
          </select>
        </div>

        {filterFormat !== "all" && (
          <button
            onClick={() => setFilterFormat("all")}
            className="text-sm text-gold hover:text-gold-light"
          >
            Șterge filtrele
          </button>
        )}
      </div>

      {/* Collection Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredCollection.map((item, index) => (
              <CollectionGridItem key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredCollection.map((item, index) => (
              <CollectionListItem key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredCollection.length === 0 && (
        <div className="text-center py-12">
          <Disc3 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Niciun album găsit</p>
          <Link
            href="/products"
            className="inline-block mt-4 text-gold hover:text-gold-light"
          >
            Explorează colecția
          </Link>
        </div>
      )}
    </div>
  );
}

function CollectionGridItem({ item, index }: { item: CollectionItem; index: number }) {
  const FormatIcon = formatIcons[item.product.format] || Disc3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Link
        href={`/products/${item.product.category}/${item.product.slug}`}
        className="block group"
      >
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Format badge */}
          <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-bleu-dark/80 backdrop-blur-sm text-xs text-gold flex items-center gap-1">
            <FormatIcon className="w-3 h-3" />
            {item.product.format}
          </span>

          {/* Condition badge */}
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-green-500/20 text-xs text-green-400">
            {item.condition}
          </span>
        </div>

        <h4 className="font-medium text-white text-sm truncate group-hover:text-gold transition-colors">
          {item.product.name}
        </h4>
        <p className="text-xs text-gray-500 truncate">{item.product.artist}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gold font-semibold">
            {formatPrice(item.purchasePrice)}
          </p>
          <p className="text-xs text-gray-600">
            {new Date(item.purchaseDate).toLocaleDateString("ro-RO", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function CollectionListItem({ item, index }: { item: CollectionItem; index: number }) {
  const FormatIcon = formatIcons[item.product.format] || Disc3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Link
        href={`/products/${item.product.category}/${item.product.slug}`}
        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/20 transition-all group"
      >
        {/* Album art */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate group-hover:text-gold transition-colors">
            {item.product.name}
          </h4>
          <p className="text-sm text-gray-500">{item.product.artist}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FormatIcon className="w-3 h-3" />
              {item.product.format}
            </span>
            <span className="text-xs text-green-400">{item.condition}</span>
          </div>
        </div>

        {/* Purchase info */}
        <div className="text-right">
          <p className="text-lg font-semibold text-gold">
            {formatPrice(item.purchasePrice)}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
            <Calendar className="w-3 h-3" />
            {new Date(item.purchaseDate).toLocaleDateString("ro-RO")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
