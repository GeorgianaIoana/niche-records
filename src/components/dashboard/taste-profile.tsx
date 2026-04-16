"use client";

import {
  Disc3,
  Compass,
  Star,
  Award,
  Sparkles,
  Users,
  Music,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { TasteProfile, GenreData, DecadeData, Badge, BadgeType } from "@/types/dashboard";

interface TasteProfileCardProps {
  profile: TasteProfile;
  className?: string;
}

export function TasteProfileCard({ profile, className }: TasteProfileCardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Genre Radar */}
      <div>
        <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Music className="w-4 h-4 text-gold" />
          Genuri Preferate
        </h4>
        <GenreRadar genres={profile.topGenres} />
      </div>

      {/* Decade Distribution */}
      <div>
        <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold" />
          Decade
        </h4>
        <DecadeChart decades={profile.decadeDistribution} />
      </div>

      {/* Mood Tags */}
      <div>
        <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
          Vibe-ul tău
        </h4>
        <div className="flex flex-wrap gap-2">
          {profile.moodTags.map((mood) => (
            <span
              key={mood}
              className="px-3 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium border border-gold/20"
            >
              {mood}
            </span>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
          Realizări
        </h4>
        <div className="flex gap-3">
          {profile.badges.map((badge) => (
            <BadgeIcon key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface GenreRadarProps {
  genres: GenreData[];
  size?: number;
  className?: string;
}

export function GenreRadar({ genres, size = 200, className }: GenreRadarProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 30;
  const angleStep = (2 * Math.PI) / genres.length;

  // Calculate points for each genre
  const points = genres.map((genre, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const radius = (genre.value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      labelX: center + (maxRadius + 20) * Math.cos(angle),
      labelY: center + (maxRadius + 20) * Math.sin(angle),
      genre: genre.genre,
      value: genre.value,
    };
  });

  // Create polygon path
  const polygonPath = points.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
  ).join(" ") + " Z";

  return (
    <div className={cn("relative", className)}>
      <svg width={size} height={size} className="mx-auto">
        {/* Background circles */}
        {[25, 50, 75, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {genres.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={center + maxRadius * Math.cos(angle)}
              y2={center + maxRadius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={polygonPath}
          fill="rgba(212, 184, 122, 0.2)"
          stroke="#D4B87A"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#D4B87A"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          />
        ))}

        {/* Labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.labelX}
            y={point.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-400 text-xs"
          >
            {point.genre}
          </text>
        ))}
      </svg>
    </div>
  );
}

interface DecadeChartProps {
  decades: DecadeData[];
  className?: string;
}

export function DecadeChart({ decades, className }: DecadeChartProps) {
  const maxCount = Math.max(...decades.map((d) => d.count));

  return (
    <div className={cn("space-y-3", className)}>
      {decades.map((decade, index) => {
        const percentage = (decade.count / maxCount) * 100;

        return (
          <motion.div
            key={decade.decade}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className="w-10 text-sm text-gray-400 text-right">
              {decade.decade}
            </span>
            <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            </div>
            <span className="w-8 text-sm text-white font-medium text-right">
              {decade.count}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

const badgeIcons: Record<BadgeType, React.ElementType> = {
  vinyl_enthusiast: Disc3,
  cd_collector: Disc3,
  genre_explorer: Compass,
  decade_specialist: Calendar,
  early_adopter: Star,
  completionist: Award,
  rare_finder: Sparkles,
  first_edition: Award,
};

interface BadgeIconProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function BadgeIcon({ badge, size = "md", showTooltip = true }: BadgeIconProps) {
  const Icon = badgeIcons[badge.id] || Award;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="group relative">
      <motion.div
        className={cn(
          "rounded-full bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 flex items-center justify-center",
          sizeClasses[size]
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className={cn("text-gold", iconSizes[size])} />
      </motion.div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="bg-bleu-dark border border-white/10 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium text-white">{badge.name}</p>
            <p className="text-xs text-gray-400">{badge.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface TopArtistsListProps {
  artists: TasteProfile["topArtists"];
  className?: string;
}

export function TopArtistsList({ artists, className }: TopArtistsListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Users className="w-4 h-4 text-gold" />
        Top Artiști
      </h4>
      {artists.map((artist, index) => (
        <div
          key={artist.name}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <span className="w-6 text-center text-sm text-gold font-bold">
            {index + 1}
          </span>
          <span className="flex-1 text-sm text-white">{artist.name}</span>
          <span className="text-sm text-gray-500">{artist.count} albume</span>
        </div>
      ))}
    </div>
  );
}

interface ListeningStatsProps {
  stats: TasteProfile["listeningStats"];
  className?: string;
}

export function ListeningStats({ stats, className }: ListeningStatsProps) {
  const items = [
    { label: "Albume", value: stats.totalAlbums, icon: Disc3 },
    { label: "Artiști", value: stats.totalArtists, icon: Users },
    { label: "Genuri", value: stats.totalGenres, icon: Music },
    { label: "An mediu", value: stats.avgReleaseYear, icon: Calendar },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
        >
          <item.icon className="w-5 h-5 text-gold/60" />
          <div>
            <p className="text-lg font-bold text-white">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
