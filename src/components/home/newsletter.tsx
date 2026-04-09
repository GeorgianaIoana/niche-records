"use client";

import { useState } from "react";
import Image from "next/image";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-28 lg:py-40 border-t-[0.5px] border-gold/20 relative overflow-hidden">
      {/* Warm light effect - center top */}
      <Image
        src="/warm-light.svg"
        alt=""
        width={288}
        height={511}
        className="absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left side - Headline */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl lg:text-4xl font-light italic text-white mb-4">
              Stay in the know
            </h2>
            <p className="text-base text-gray-400 max-w-md">
              New releases, rare finds, and exclusive offers — delivered to your inbox.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-6 flex items-end">
            {submitted ? (
              <div className="w-full">
                <p className="text-xl font-light text-white mb-2">Thank you</p>
                <p className="text-sm text-gray-400">
                  You&apos;ll hear from us soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 pr-24 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold transition-colors text-base"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-4 text-xs text-white hover:text-gold transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-600">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
