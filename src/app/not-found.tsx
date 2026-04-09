import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(30, 58, 80, 0.2) 0%, transparent 60%)',
        }}
      />

      <div className="text-center px-4 relative z-10">
        <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4 font-light">
          404 Error
        </p>
        <h1 className="text-4xl lg:text-6xl font-extralight text-white tracking-tight mb-6">
          Page Not Found
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-10 font-light">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
