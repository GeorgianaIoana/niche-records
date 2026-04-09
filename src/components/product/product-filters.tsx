"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { GENRES, SORT_OPTIONS } from "@/lib/constants";

interface ProductFiltersProps {
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  className?: string;
}

export function ProductFilters({
  selectedGenres,
  onGenreChange,
  selectedSort,
  onSortChange,
  className,
}: ProductFiltersProps) {
  const [genreOpen, setGenreOpen] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenreChange(selectedGenres.filter((g) => g !== genre));
    } else {
      onGenreChange([...selectedGenres, genre]);
    }
  };

  const clearFilters = () => {
    onGenreChange([]);
  };

  const hasActiveFilters = selectedGenres.length > 0;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-white mb-2 tracking-wide">
          Sort by
        </label>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full h-10 px-3 rounded-lg bg-[#071018] border border-[#1e3a50] text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Genre filter */}
      <div>
        <button
          onClick={() => setGenreOpen(!genreOpen)}
          className="flex items-center justify-between w-full text-sm font-medium text-white mb-2 tracking-wide"
        >
          Genre
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              genreOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "space-y-2 overflow-hidden transition-all",
            genreOpen ? "max-h-96" : "max-h-0"
          )}
        >
          {GENRES.map((genre) => (
            <label
              key={genre}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="w-4 h-4 rounded border-[#1e3a50] bg-[#071018] text-gold focus:ring-gold focus:ring-offset-[#0a1620]"
              />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {genre}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
