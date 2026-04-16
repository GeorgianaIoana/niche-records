"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
  formats: string[];
  selectedFormats: string[];
  onFormatChange: (formats: string[]) => void;
  genres: string[];
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
  artists: string[];
  selectedArtists: string[];
  onArtistChange: (artists: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
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

function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  // Clamp values to valid range
  const localMin = Math.max(value[0], min);
  const localMax = Math.min(value[1], max);
  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  // Convert bani to RON for display
  const formatPrice = (bani: number) => Math.round(bani / 100);

  return (
    <div className="px-1 pb-2">
      {/* Price labels */}
      <div className="flex justify-between mb-4 text-sm">
        <span className="text-gray-400">{formatPrice(localMin)} RON</span>
        <span className="text-gray-400">{formatPrice(localMax)} RON</span>
      </div>

      {/* Slider track */}
      <div className="relative h-0.5 mb-4">
        {/* Background track */}
        <div className="absolute inset-0 rounded-full bg-[#1e3a50]" />

        {/* Active range - vibrant blue bar */}
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
            background: "#3b82f6",
          }}
        />

        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={localMin}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), localMax - 100);
            onChange([newMin, localMax]);
          }}
          className="absolute w-full h-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#3b82f6] [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#3b82f6]"
          style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
        />

        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={Math.min(localMax, max)}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), localMin + 100);
            onChange([localMin, newMax]);
          }}
          className="absolute w-full h-0.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#3b82f6] [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#3b82f6]"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}

const FORMAT_LABELS: Record<string, string> = {
  CD: "CD",
  DVD: "DVD",
  "Blu-Ray": "BLU-RAY",
  Vinyl: "VINYL",
  MC: "MC",
  Audiofil: "AUDIOFIL",
  Accesorii: "ACCESORII",
};

export function ShopFilters({
  formats,
  selectedFormats,
  onFormatChange,
  genres,
  selectedGenres,
  onGenreChange,
  artists,
  selectedArtists,
  onArtistChange,
  priceRange,
  maxPrice,
  onPriceChange,
  showInStockOnly,
  onInStockChange,
  showOnSaleOnly,
  onSaleChange,
}: ShopFiltersProps) {
  const [formatOpen, setFormatOpen] = useState(true);
  const [genreOpen, setGenreOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);

  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      onFormatChange(selectedFormats.filter((f) => f !== format));
    } else {
      onFormatChange([...selectedFormats, format]);
    }
  };

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
      {/* Format Filter */}
      <FilterSection
        title="Format"
        isOpen={formatOpen}
        onToggle={() => setFormatOpen(!formatOpen)}
      >
        {formats.map((format) => (
          <label
            key={format}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <input
              type="checkbox"
              checked={selectedFormats.includes(format)}
              onChange={() => toggleFormat(format)}
              className="w-4 h-4 rounded border-[#3a4a5a] bg-transparent text-gold focus:ring-gold focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {FORMAT_LABELS[format] || format}
            </span>
          </label>
        ))}
      </FilterSection>

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
        <PriceRangeSlider
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={onPriceChange}
        />
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
