"use client";

import { useState } from "react";
import Image from "next/image";
import { Questrial } from "next/font/google";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-gold flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function NewsletterVideo() {
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 5) {
      video.currentTime = 0;
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.playbackRate = 0.5;
  };

  return (
    <div className="relative aspect-[5/6] w-full max-w-sm mx-auto lg:max-w-md">
      {/* Video container */}
      <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover scale-105"
        >
          <source src="/newsletter-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay - matches background at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-bleu-dark via-bleu-dark/60 to-bleu-medium/30 pointer-events-none" />

      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <Image
        src="/blue-light.png"
        alt=""
        width={350}
        height={350}
        className="absolute -top-40 -right-20 pointer-events-none opacity-60"
        aria-hidden="true"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={400}
        height={400}
        className="absolute -bottom-40 -left-32 pointer-events-none opacity-70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            {/* Success checkmark */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 mb-6 animate-[scale-in_0.3s_ease-out] shadow-lg shadow-gold/10">
              <svg
                className="w-7 h-7 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2
              className={`${questrial.className} text-2xl lg:text-3xl text-white uppercase mb-4`}
              style={{
                textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              Mulțumim pentru abonare!
            </h2>

            <p className={`${questrial.className} text-gray-400 text-lg leading-relaxed max-w-md tracking-wider`}>
              Verifică inbox-ul pentru a confirma abonamentul. Te așteptăm în comunitatea Niche Records.
            </p>
          </div>

          <NewsletterVideo />
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return <SuccessState />;
  }

  const benefits = [
    "Lansări noi",
    "Oferte exclusive",
    "Articole & povești",
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={350}
        height={350}
        className="absolute -top-40 -right-20 pointer-events-none opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content & Form */}
          <div className="order-2 lg:order-1">
            {/* Pill Badge */}
            <span className="inline-block bg-gradient-to-b from-bleu-light/80 to-bleu-medium text-white/90 text-xs font-medium px-5 py-2 rounded-full mb-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              Newsletter
            </span>

            {/* Headline */}
            <h2
              className={`${questrial.className} text-2xl lg:text-3xl text-white uppercase mb-6 leading-tight`}
              style={{
                textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              Fii primul care află noutățile.
            </h2>

            {/* Description */}
            <p className={`${questrial.className} text-gray-400 leading-relaxed mb-12 max-w-md tracking-wider`}>
              Primești lansări exclusive, oferte speciale și povești din lumea muzicii direct în inbox.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-8 max-w-md">
              <input
                type="email"
                placeholder="email@exemplu.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gradient-to-b from-bleu-deep to-bleu-medium rounded-full px-6 py-3 text-sm text-white placeholder:text-gray-500 border border-bleu-light/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)] focus:outline-none focus:border-gold/30 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2),0_0_0_1px_rgba(212,184,122,0.2)] transition-all"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex items-center justify-center px-6 py-3 bg-gradient-to-b from-gold-light via-gold to-gold-dark text-bleu-deepest text-sm font-semibold rounded-full shadow-[0_3px_0_0_#a08045,0_4px_10px_rgba(212,184,122,0.3)] hover:shadow-[0_1px_0_0_#a08045,0_3px_6px_rgba(212,184,122,0.3)] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#a08045,0_1px_3px_rgba(212,184,122,0.2)] active:translate-y-[3px] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_3px_0_0_#a08045,0_4px_10px_rgba(212,184,122,0.3)]"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Se procesează...
                  </span>
                ) : (
                  <>
                    Abonează-te acum
                    <ArrowIcon />
                  </>
                )}
              </button>
            </form>

            {/* Benefits List */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className={`${questrial.className} text-gray-400 text-sm tracking-wider`}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Video */}
          <div className="order-1 lg:order-2">
            <NewsletterVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
