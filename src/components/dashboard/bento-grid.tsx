"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  delay?: number;
  href?: string;
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
}: BentoCardProps) {
  const colSpanClasses = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-2 lg:col-span-3",
  };

  const rowSpanClasses = {
    1: "",
    2: "md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn(
        "bg-gradient-to-br from-[#122535]/80 to-[#0d1a28]/60",
        "backdrop-blur-sm rounded-xl",
        "border border-[#1e3a50]/30",
        "p-5 lg:p-6",
        "transition-all duration-300",
        "hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5",
        "group",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface BentoHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function BentoHeader({ title, subtitle, icon, action }: BentoHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
