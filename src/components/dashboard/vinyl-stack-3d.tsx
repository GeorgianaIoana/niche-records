"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface VinylStack3DProps {
  count?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VinylStack3D({ count = 5, className, size = "md" }: VinylStack3DProps) {
  const sizeClasses = {
    sm: { base: "w-16 h-16", offset: 3 },
    md: { base: "w-24 h-24", offset: 4 },
    lg: { base: "w-32 h-32", offset: 5 },
  };

  const displayCount = Math.min(count, 5);
  const colors = [
    "from-[#1a1a1a] to-[#0a0a0a]",
    "from-[#2a2a2a] to-[#1a1a1a]",
    "from-[#333333] to-[#222222]",
    "from-[#3a3a3a] to-[#2a2a2a]",
    "from-[#444444] to-[#333333]",
  ];

  return (
    <div
      className={cn(
        "relative perspective-1000",
        sizeClasses[size].base,
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {Array.from({ length: displayCount }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute rounded-full border border-white/10",
            "bg-gradient-to-br",
            colors[index],
            "shadow-lg"
          )}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: `
              translateZ(${index * -sizeClasses[size].offset}px)
              translateY(${index * -sizeClasses[size].offset}px)
              rotateX(60deg)
              rotateZ(${index * 5}deg)
            `,
            zIndex: displayCount - index,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          {/* Vinyl grooves */}
          <div
            className="absolute inset-[15%] rounded-full border border-white/5"
            style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}
          />
          <div className="absolute inset-[30%] rounded-full border border-white/5" />
          <div className="absolute inset-[45%] rounded-full border border-white/5" />

          {/* Center label */}
          <div
            className={cn(
              "absolute rounded-full",
              "bg-gradient-to-br from-gold/80 to-gold-dark/80"
            )}
            style={{
              inset: "38%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          />

          {/* Center hole */}
          <div
            className="absolute rounded-full bg-bleu-dark"
            style={{ inset: "46%" }}
          />

          {/* Reflection */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      ))}

      {/* Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/30 blur-md"
        style={{
          width: "80%",
          height: "20%",
          transform: "translateX(-50%) rotateX(60deg)",
        }}
      />
    </div>
  );
}

interface CDStack3DProps {
  count?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CDStack3D({ count = 5, className, size = "md" }: CDStack3DProps) {
  const sizeClasses = {
    sm: { base: "w-14 h-14", offset: 2 },
    md: { base: "w-20 h-20", offset: 3 },
    lg: { base: "w-28 h-28", offset: 4 },
  };

  const displayCount = Math.min(count, 5);

  return (
    <div
      className={cn(
        "relative",
        sizeClasses[size].base,
        className
      )}
      style={{ perspective: "800px" }}
    >
      {Array.from({ length: displayCount }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-white/20 bg-gradient-to-br from-gray-300 to-gray-400"
          style={{
            width: "100%",
            height: "100%",
            transform: `
              translateZ(${index * -sizeClasses[size].offset}px)
              translateY(${index * -sizeClasses[size].offset}px)
              rotateX(55deg)
            `,
            zIndex: displayCount - index,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* CD surface reflection */}
          <div
            className="absolute inset-[2%] rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.3) 25%, rgba(150,150,150,0.5) 50%, rgba(200,200,200,0.3) 75%, rgba(255,255,255,0.6) 100%)",
            }}
          />

          {/* Center hole */}
          <div
            className="absolute rounded-full bg-white/80"
            style={{ inset: "40%" }}
          />
          <div
            className="absolute rounded-full bg-bleu-dark"
            style={{ inset: "44%" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

interface DVDStack3DProps {
  count?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function DVDStack3D({ count = 3, className, size = "md" }: DVDStack3DProps) {
  const sizeClasses = {
    sm: { width: "w-10", height: "h-14", offset: 3 },
    md: { width: "w-14", height: "h-20", offset: 4 },
    lg: { width: "w-18", height: "h-24", offset: 5 },
  };

  const displayCount = Math.min(count, 4);
  const colors = [
    "from-blue-900/80 to-blue-950/80",
    "from-purple-900/80 to-purple-950/80",
    "from-red-900/80 to-red-950/80",
    "from-green-900/80 to-green-950/80",
  ];

  return (
    <div
      className={cn(
        "relative",
        sizeClasses[size].width,
        sizeClasses[size].height,
        className
      )}
      style={{ perspective: "600px" }}
    >
      {Array.from({ length: displayCount }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute rounded-sm border border-white/10",
            "bg-gradient-to-br",
            colors[index]
          )}
          style={{
            width: "100%",
            height: "100%",
            transform: `
              translateX(${index * sizeClasses[size].offset}px)
              translateZ(${index * -2}px)
              rotateY(-15deg)
            `,
            zIndex: displayCount - index,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Spine highlight */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 via-white/10 to-white/20"
          />
        </motion.div>
      ))}
    </div>
  );
}
