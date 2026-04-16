"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Disc3,
  ShoppingBag,
  PackageCheck,
  Ticket,
  RefreshCw,
  ArrowRight,
  Bell,
  BellOff,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { FollowedArtist, ArtistUpdate, ArtistUpdateType } from "@/types/dashboard";

interface ArtistFeedProps {
  artists: FollowedArtist[];
  maxItems?: number;
  className?: string;
}

const updateTypeConfig: Record<ArtistUpdateType, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
}> = {
  new_album: {
    icon: Disc3,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  pre_order: {
    icon: ShoppingBag,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  back_in_stock: {
    icon: PackageCheck,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  tour: {
    icon: Ticket,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  reissue: {
    icon: RefreshCw,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
};

export function ArtistFeed({ artists, maxItems = 4, className }: ArtistFeedProps) {
  // Flatten all updates with artist info
  const allUpdates = artists.flatMap((artist) =>
    artist.recentUpdates.map((update) => ({
      ...update,
      artist,
    }))
  );

  // Sort by date and limit
  const sortedUpdates = allUpdates
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems);

  if (sortedUpdates.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <Bell className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-500 text-sm">Nicio noutate recentă</p>
        <p className="text-gray-600 text-xs mt-1">
          Urmărește artiști pentru actualizări
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {sortedUpdates.map((update, index) => (
        <ArtistUpdateCard
          key={update.id}
          update={update}
          artist={update.artist}
          index={index}
        />
      ))}

      <Link
        href="/dashboard/artists"
        className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        Vezi toți artiștii
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

interface ArtistUpdateCardProps {
  update: ArtistUpdate;
  artist: FollowedArtist;
  index: number;
}

function ArtistUpdateCard({ update, artist, index }: ArtistUpdateCardProps) {
  const config = updateTypeConfig[update.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="flex gap-3"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          config.bgColor
        )}>
          <Icon className={cn("w-5 h-5", config.color)} />
        </div>
        {index < 3 && (
          <div className="w-px h-full min-h-[16px] bg-white/10 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-start gap-3">
          {/* Artist avatar */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium text-white">{artist.name}</span>
              <span className="text-gray-500"> · </span>
              <span className="text-gray-400 text-xs">
                {formatRelativeDate(update.date)}
              </span>
            </p>

            <h4 className="font-medium text-white mt-1">{update.title}</h4>
            <p className="text-sm text-gray-400 mt-0.5">{update.description}</p>

            {update.relatedProduct && (
              <Link
                href={`/products/${update.relatedProduct.category}/${update.relatedProduct.slug}`}
                className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gold hover:bg-white/10 transition-colors"
              >
                Vezi produsul
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Azi";
  if (diffDays === 1) return "Ieri";
  if (diffDays < 7) return `Acum ${diffDays} zile`;
  if (diffDays < 30) return `Acum ${Math.floor(diffDays / 7)} săpt.`;
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
}

interface ArtistCardProps {
  artist: FollowedArtist;
  onUnfollow?: (artistId: string) => void;
  className?: string;
}

export function ArtistCard({ artist, onUnfollow, className }: ArtistCardProps) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/20 transition-colors",
      className
    )}>
      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="object-cover"
          sizes="56px"
        />
        {artist.recentUpdates.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center text-[10px] text-bleu-dark font-bold">
            {artist.recentUpdates.length}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate">{artist.name}</h4>
        <p className="text-sm text-gray-500">
          {artist.itemsInCollection} {artist.itemsInCollection === 1 ? "album" : "albume"} în colecție
        </p>
      </div>

      {/* Unfollow button */}
      {onUnfollow && (
        <button
          onClick={() => onUnfollow(artist.id)}
          className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          aria-label={`Nu mai urmări ${artist.name}`}
        >
          <BellOff className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

interface ArtistGridProps {
  artists: FollowedArtist[];
  onUnfollow?: (artistId: string) => void;
  className?: string;
}

export function ArtistGrid({ artists, onUnfollow, className }: ArtistGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} onUnfollow={onUnfollow} />
      ))}
    </div>
  );
}
