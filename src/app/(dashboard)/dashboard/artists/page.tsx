"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  Bell,
  BellOff,
  Disc3,
  ChevronRight,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ArtistFeed, ArtistCard } from "@/components/dashboard/artist-feed";
import { mockFollowedArtists } from "@/data/mock-dashboard";
import type { FollowedArtist } from "@/types/dashboard";

export default function ArtistsPage() {
  const [artists, setArtists] = useState(mockFollowedArtists);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<FollowedArtist | null>(null);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnfollow = (artistId: string) => {
    setArtists(artists.filter((a) => a.id !== artistId));
    if (selectedArtist?.id === artistId) {
      setSelectedArtist(null);
    }
  };

  const totalUpdates = artists.reduce(
    (acc, artist) => acc + artist.recentUpdates.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-white">
            Artiști Urmăriți
          </h1>
          <p className="text-gray-400 mt-1">
            {artists.length} artiști · {totalUpdates} noutăți
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Caută artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <Users className="w-6 h-6 text-gold mb-2" />
          <p className="text-2xl font-bold text-white">{artists.length}</p>
          <p className="text-xs text-gray-500">Artiști urmăriți</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <Bell className="w-6 h-6 text-gold mb-2" />
          <p className="text-2xl font-bold text-white">{totalUpdates}</p>
          <p className="text-xs text-gray-500">Noutăți recente</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <Disc3 className="w-6 h-6 text-gold mb-2" />
          <p className="text-2xl font-bold text-white">
            {artists.reduce((acc, a) => acc + a.itemsInCollection, 0)}
          </p>
          <p className="text-xs text-gray-500">Albume în colecție</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Artists List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <button
                    onClick={() => setSelectedArtist(artist)}
                    className={cn(
                      "w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all",
                      selectedArtist?.id === artist.id
                        ? "bg-gold/10 border-gold/30"
                        : "bg-white/5 border-white/10 hover:border-gold/20"
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={artist.imageUrl}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      {artist.recentUpdates.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-xs text-bleu-dark font-bold">
                          {artist.recentUpdates.length}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {artist.itemsInCollection} {artist.itemsInCollection === 1 ? "album" : "albume"} în colecție
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Urmărit din {new Date(artist.followedDate).toLocaleDateString("ro-RO", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnfollow(artist.id);
                        }}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label={`Nu mai urmări ${artist.name}`}
                      >
                        <BellOff className="w-5 h-5" />
                      </button>
                      <ChevronRight className={cn(
                        "w-5 h-5 text-gray-500 transition-transform",
                        selectedArtist?.id === artist.id && "rotate-90 text-gold"
                      )} />
                    </div>
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">
                  {searchQuery
                    ? "Niciun artist găsit"
                    : "Nu urmărești niciun artist"}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Artist Details / Feed */}
        <div className="lg:sticky lg:top-28 h-fit">
          <AnimatePresence mode="wait">
            {selectedArtist ? (
              <motion.div
                key={selectedArtist.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                {/* Artist header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={selectedArtist.imageUrl}
                      alt={selectedArtist.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-white">
                      {selectedArtist.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedArtist.itemsInCollection} albume în colecție
                    </p>
                  </div>
                </div>

                {/* Recent updates */}
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                    Noutăți
                  </h4>
                  {selectedArtist.recentUpdates.length > 0 ? (
                    <ArtistFeed artists={[selectedArtist]} maxItems={5} />
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                      <p className="text-sm text-gray-500">
                        Nicio noutate recentă
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-dashed border-white/10 rounded-xl"
              >
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p className="text-gray-500">Selectează un artist pentru detalii</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
