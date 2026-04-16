"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gold" | "highlight";
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  trend,
  size = "md",
  variant = "default",
  className,
}: StatCardProps) {
  const sizeClasses = {
    sm: {
      value: "text-2xl",
      label: "text-xs",
      icon: "w-4 h-4",
      padding: "p-3",
    },
    md: {
      value: "text-3xl",
      label: "text-sm",
      icon: "w-5 h-5",
      padding: "p-4",
    },
    lg: {
      value: "text-4xl lg:text-5xl",
      label: "text-base",
      icon: "w-6 h-6",
      padding: "p-5 lg:p-6",
    },
  };

  const variantClasses = {
    default: "text-white",
    gold: "bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent",
    highlight: "text-gold",
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        sizeClasses[size].padding,
        className
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon && (
          <span className={cn("text-gold/60", sizeClasses[size].icon)}>
            {icon}
          </span>
        )}
        <span className={cn("uppercase tracking-wider text-gray-400", sizeClasses[size].label)}>
          {label}
        </span>
      </div>

      <motion.span
        className={cn(
          "font-heading font-bold",
          sizeClasses[size].value,
          variantClasses[variant]
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {value}
      </motion.span>

      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-xs text-gray-500">vs luna trecută</span>
        </div>
      )}
    </div>
  );
}

interface StatRowProps {
  stats: {
    value: string | number;
    label: string;
  }[];
  className?: string;
}

export function StatRow({ stats, className }: StatRowProps) {
  return (
    <div className={cn("flex items-center gap-6 text-sm", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gold font-semibold">{stat.value}</span>
          <span className="text-gray-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

interface StatBadgeProps {
  value: string | number;
  label: string;
  variant?: "gold" | "green" | "red" | "blue";
}

export function StatBadge({ value, label, variant = "gold" }: StatBadgeProps) {
  const variantClasses = {
    gold: "bg-gold/10 text-gold border-gold/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border",
        variantClasses[variant]
      )}
    >
      <span className="font-semibold">{value}</span>
      <span className="opacity-80">{label}</span>
    </span>
  );
}
