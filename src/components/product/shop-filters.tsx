"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
  genres: string[];
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
  artists: string[];
  selectedArtists: string[];
  onArtistChange: (artists: string[]) => void;
  showInStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  showOnSaleOnly: boolean;
  onSaleChange: (value: boolean) => void;
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#1e3a50]/50">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-medium text-white">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-64 pb-4" : "max-h-0"
        )}
      >
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#1e3a50]/50">
      <span className="text-sm text-white">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors",
          checked ? "bg-gold" : "bg-[#2a3a4a]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

export function ShopFilters({
  genres,
  selectedGenres,
  onGenreChange,
  artists,
  selectedArtists,
  onArtistChange,
  showInStockOnly,
  onInStockChange,
  showOnSaleOnly,
  onSaleChange,
}: ShopFiltersProps) {
  const [genreOpen, setGenreOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenreChange(selectedGenres.filter((g) => g !== genre));
    } else {
      onGenreChange([...selectedGenres, genre]);
    }
  };

  const toggleArtist = (artist: string) => {
    if (selectedArtists.includes(artist)) {
      onArtistChange(selectedArtists.filter((a) => a !== artist));
    } else {
      onArtistChange([...selectedArtists, artist]);
    }
  };

  return (
    <div>
      {/* Genre Filter */}
      <FilterSection
        title="Genre"
        isOpen={genreOpen}
        onToggle={() => setGenreOpen(!genreOpen)}
      >
        {genres.map((genre) => (
          <label
            key={genre}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleGenre(genre)}
              className="w-4 h-4 rounded border-[#3a4a5a] bg-transparent text-gold focus:ring-gold focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {genre}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Artist Filter */}
      <FilterSection
        title="Artist"
        isOpen={artistOpen}
        onToggle={() => setArtistOpen(!artistOpen)}
      >
        {artists.map((artist) => (
          <label
            key={artist}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <input
              type="checkbox"
              checked={selectedArtists.includes(artist)}
              onChange={() => toggleArtist(artist)}
              className="w-4 h-4 rounded border-[#3a4a5a] bg-transparent text-gold focus:ring-gold focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate">
              {artist}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price"
        isOpen={priceOpen}
        onToggle={() => setPriceOpen(!priceOpen)}
      >
        {[
          { label: "Under 50 RON", value: "0-50" },
          { label: "50 - 100 RON", value: "50-100" },
          { label: "100 - 200 RON", value: "100-200" },
          { label: "Over 200 RON", value: "200+" },
        ].map((range) => (
          <label
            key={range.value}
            className="flex items-center gap-3 cursor-pointer group py-1 opacity-50"
          >
            <input
              type="checkbox"
              disabled
              className="w-4 h-4 rounded border-[#3a4a5a] bg-transparent"
            />
            <span className="text-sm text-gray-400">
              {range.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Toggle Switches */}
      <ToggleSwitch
        label="Show only in stock"
        checked={showInStockOnly}
        onChange={onInStockChange}
      />

      <ToggleSwitch
        label="Show only on sale"
        checked={showOnSaleOnly}
        onChange={onSaleChange}
      />
    </div>
  );
}
