"use client";

import Link from "next/link";
import { Disc3, Disc, Film, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { VinylStack3D, CDStack3D, DVDStack3D } from "./vinyl-stack-3d";
import { StatRow } from "./stat-card";
import type { CollectionStats } from "@/types/dashboard";

interface CollectionHeroProps {
  stats: CollectionStats;
  className?: string;
}

export function CollectionHero({ stats, className }: CollectionHeroProps) {
  const formatBreakdown = [
    { format: "Vinyl", count: stats.byFormat.Vinyl, icon: Disc3, color: "text-gold" },
    { format: "CD", count: stats.byFormat.CD, icon: Disc, color: "text-gray-300" },
    { format: "DVD", count: stats.byFormat.DVD + stats.byFormat["Blu-Ray"], icon: Film, color: "text-blue-400" },
  ];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10 rounded-xl" />

      <div className="relative p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gold/80 uppercase tracking-wider mb-1">Colecția Mea</p>
            <div className="flex items-baseline gap-2">
              <motion.h2
                className="text-5xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {stats.totalItems}
              </motion.h2>
              <span className="text-2xl text-white/60 font-light">Albume</span>
            </div>
          </div>

          {/* 3D Vinyl Stack */}
          <div className="hidden sm:block">
            <VinylStack3D count={5} size="lg" />
          </div>
        </div>

        {/* Format breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {formatBreakdown.map((item) => (
            <motion.div
              key={item.format}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <item.icon className={cn("w-5 h-5", item.color)} />
              <div>
                <p className="text-lg font-semibold text-white">{item.count}</p>
                <p className="text-xs text-gray-400">{item.format}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value estimation */}
        <motion.div
          className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-gold/10 border border-gold/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TrendingUp className="w-4 h-4 text-gold" />
          <span className="text-sm text-gold/80">Valoare estimată:</span>
          <span className="text-lg font-semibold text-gold">
            ~{formatPrice(stats.totalValue)}
          </span>
          <span className="text-sm text-gold/60">investiți</span>
        </motion.div>

        {/* Quick stats row */}
        <StatRow
          stats={[
            { value: stats.newThisMonth, label: "Noi luna asta" },
            { value: stats.preOrders, label: "Pre-comenzi" },
            { value: stats.inTransit, label: "Pe drum" },
          ]}
          className="mb-6"
        />

        {/* CTA */}
        <Link
          href="/dashboard/collection"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors group"
        >
          Vezi Colecția Completă
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

interface MiniCollectionPreviewProps {
  vinylCount: number;
  cdCount: number;
  dvdCount: number;
  className?: string;
}

export function MiniCollectionPreview({
  vinylCount,
  cdCount,
  dvdCount,
  className,
}: MiniCollectionPreviewProps) {
  return (
    <div className={cn("flex items-end gap-6", className)}>
      <div className="text-center">
        <VinylStack3D count={Math.min(vinylCount, 5)} size="sm" />
        <p className="mt-2 text-xs text-gray-400">{vinylCount} Vinyls</p>
      </div>
      <div className="text-center">
        <CDStack3D count={Math.min(cdCount, 5)} size="sm" />
        <p className="mt-2 text-xs text-gray-400">{cdCount} CDs</p>
      </div>
      <div className="text-center">
        <DVDStack3D count={Math.min(dvdCount, 4)} size="sm" />
        <p className="mt-2 text-xs text-gray-400">{dvdCount} DVDs</p>
      </div>
    </div>
  );
}
