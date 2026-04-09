"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gold/10 border-b border-gold/20 py-2.5 px-4 text-center relative">
      <p className="text-xs text-gold tracking-wide">
        Free shipping on orders over 200 lei
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
