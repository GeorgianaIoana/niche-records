"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = false,
  overlayContent,
  displayOverlayContent = false,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0, springValues);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateX.set((mouseY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((mouseX / (rect.width / 2)) * rotateAmplitude);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(scaleOnHover);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            width: imageWidth,
            height: imageHeight,
            backgroundColor: "#0a2736",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay - dark blue bottom, light blue top */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(56, 140, 180, 0.3) 0%, transparent 30%, rgba(10, 39, 54, 0.4) 60%, rgba(10, 39, 54, 0.9) 100%)",
            }}
          />

          {/* Overlay content */}
          {displayOverlayContent && overlayContent && (
            <div className="absolute inset-0 flex flex-col justify-end">
              {overlayContent}
            </div>
          )}
        </div>

        {/* Warm light shine effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            opacity,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 184, 122, 0.35) 0%, rgba(212, 184, 122, 0.15) 40%, transparent 70%)",
          }}
        />

        {showTooltip && isHovered && (
          <motion.div
            className="absolute z-10 px-3 py-1.5 text-xs bg-white text-navy rounded shadow-lg pointer-events-none"
            style={{
              x,
              y,
              translateX: "-50%",
              translateY: "-100%",
            }}
          >
            {altText}
          </motion.div>
        )}
      </motion.div>

      {showMobileWarning && (
        <p className="mt-2 text-xs text-gray-500 text-center lg:hidden">
          Best experienced on desktop
        </p>
      )}
    </div>
  );
}
