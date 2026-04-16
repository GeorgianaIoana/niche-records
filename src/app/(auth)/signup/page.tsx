"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Check, Eye, EyeOff, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated vinyl record component
function FloatingVinyl() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full rounded-full border border-white/10 relative">
        <div className="absolute inset-8 rounded-full border border-white/10" />
        <div className="absolute inset-16 rounded-full border border-white/10" />
        <div className="absolute inset-24 rounded-full border border-white/10" />
        <div className="absolute inset-[45%] rounded-full bg-white/10" />
      </div>
    </motion.div>
  );
}

// Clean underline input
function Input({
  type = "text",
  label,
  value,
  onChange,
  error,
  autoFocus,
  showToggle,
  onToggle,
  isVisible,
}: {
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoFocus?: boolean;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const inputType = showToggle ? (isVisible ? "text" : "password") : type;

  return (
    <div className="space-y-1">
      <div className="relative flex items-center">
        <div className="relative flex-1 pt-5 pb-3">
          <label
            className={cn(
              "absolute left-0 transition-all duration-200 pointer-events-none",
              isActive
                ? "top-0 text-[12px] tracking-wide"
                : "top-1/2 -translate-y-1/2 text-[15px]",
              error
                ? "text-red-400"
                : focused
                  ? "text-gold"
                  : "text-white/40"
            )}
          >
            {label}
          </label>

          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus={autoFocus}
            className="no-focus-outline w-full bg-transparent text-white text-[15px]"
          />

          <div className={cn(
            "absolute bottom-0 left-0 right-0 h-px transition-colors duration-200",
            error ? "bg-red-500/50" : "bg-white/10"
          )} />

          <div
            className={cn(
              "absolute bottom-0 left-0 h-px bg-gold transition-all duration-300",
              focused ? "right-0" : "right-full"
            )}
          />
        </div>

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "pb-3 pt-5 pl-3 transition-colors duration-200",
              focused ? "text-gold/70 hover:text-gold" : "text-white/30 hover:text-white/50"
            )}
            tabIndex={-1}
          >
            {isVisible ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-red-400 text-[13px]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Password strength bar
function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: "Slabă", color: "bg-red-500" };
    if (score <= 2) return { score: 2, label: "Medie", color: "bg-orange-500" };
    if (score <= 3) return { score: 3, label: "Bună", color: "bg-yellow-500" };
    return { score: 4, label: "Puternică", color: "bg-green-500" };
  }, [password]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                level <= strength.score ? strength.color : "bg-white/10"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-white/40">{strength.label}</span>
      </div>
    </motion.div>
  );
}

// Success state
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <motion.div
        className="relative w-20 h-20 mx-auto mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Check className="w-10 h-10 text-gold" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-light text-white mb-3"
      >
        Cont creat cu succes!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/40"
      >
        Verifică-ți emailul pentru confirmare
      </motion.p>
    </motion.div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Introdu numele";
    if (!email.trim()) {
      newErrors.email = "Introdu emailul";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email invalid";
    }
    if (!password.trim()) {
      newErrors.password = "Introdu parola";
    } else if (password.length < 6) {
      newErrors.password = "Minim 6 caractere";
    }
    if (!acceptTerms) {
      newErrors.terms = "Acceptă termenii pentru a continua";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      window.location.href = "/login";
    }, 2500);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-bleu-dark flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bleu-deepest via-bleu-dark to-bleu" />
        <FloatingVinyl />
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Niche Records"
              width={180}
              height={72}
              className="h-12 w-auto"
            />
          </Link>

          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-gold/80 text-sm tracking-wider uppercase mb-6">
                <Sparkles className="w-4 h-4" />
                Comunitate Exclusivă
              </span>

              <h1 className="text-4xl xl:text-5xl font-light text-white leading-tight mb-6">
                Alătură-te
                <br />
                <span className="text-gold">colecționarilor</span>
              </h1>

              <p className="text-white/40 text-lg leading-relaxed">
                Creează un cont gratuit și descoperă viniluri rare,
                oferte exclusive și o comunitate de pasionați.
              </p>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {[
              "Acces la ediții limitate",
              "Notificări pentru artiștii preferați",
              "Reduceri exclusive pentru membri",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-gold" />
                </div>
                <span className="text-white/50 text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden p-6 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Niche Records"
              width={140}
              height={56}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[400px]">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <SuccessState key="success" />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header */}
                  <div className="mb-10">
                    <h1 className="text-3xl font-light text-white mb-2">
                      Creează un cont
                    </h1>
                    <p className="text-white/40">
                      E gratuit, durează doar 30 de secunde
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                      type="text"
                      label="Nume"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      error={errors.name}
                      autoFocus
                    />

                    <Input
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      error={errors.email}
                    />

                    <div>
                      <Input
                        type="password"
                        label="Parolă"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        error={errors.password}
                        showToggle
                        onToggle={() => setShowPassword(!showPassword)}
                        isVisible={showPassword}
                      />
                      <PasswordStrength password={password} />
                    </div>

                    {/* Terms checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group pt-2">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => {
                            setAcceptTerms(e.target.checked);
                            if (errors.terms) setErrors({ ...errors, terms: "" });
                          }}
                          className="sr-only"
                        />
                        <div className={cn(
                          "w-5 h-5 rounded-md border transition-all flex items-center justify-center",
                          errors.terms
                            ? "border-red-500/50"
                            : acceptTerms
                              ? "bg-gold border-gold"
                              : "border-white/20 group-hover:border-white/40"
                        )}>
                          {acceptTerms && <Check className="w-3 h-3 text-bleu-dark" strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="text-sm text-white/40 leading-relaxed">
                        Accept{" "}
                        <Link href="/terms" className="text-gold hover:text-gold-light">
                          termenii
                        </Link>{" "}
                        și{" "}
                        <Link href="/privacy" className="text-gold hover:text-gold-light">
                          politica de confidențialitate
                        </Link>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-red-400 text-sm -mt-3">{errors.terms}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-bleu-dark flex items-center justify-center gap-2 transition-all duration-200 mt-2",
                        isLoading && "opacity-80"
                      )}
                      style={{
                        background: "linear-gradient(180deg, #e5c88a 0%, #d4b87a 40%, #c9a968 100%)",
                        boxShadow: "0 4px 0 0 #a08045, 0 6px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
                      }}
                      whileHover={!isLoading ? { y: -2, boxShadow: "0 6px 0 0 #a08045, 0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)" } : {}}
                      whileTap={!isLoading ? { y: 2, boxShadow: "0 1px 0 0 #a08045, 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)" } : {}}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Se creează contul...
                        </>
                      ) : (
                        <>
                          Creează contul
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/[0.06]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-bleu-dark text-white/30 text-sm">sau</span>
                    </div>
                  </div>

                  {/* Social buttons */}
                  <div className="space-y-3">
                    <motion.button
                      type="button"
                      onClick={() => handleSocialSignup("google")}
                      className="w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-gray-800 flex items-center justify-center gap-3 transition-all duration-200"
                      style={{
                        background: "linear-gradient(180deg, #ffffff 0%, #f8f8f8 40%, #f0f0f0 100%)",
                        boxShadow: "0 3px 0 0 #d1d1d1, 0 4px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                      whileHover={{ y: -2, boxShadow: "0 5px 0 0 #d1d1d1, 0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)" }}
                      whileTap={{ y: 2, boxShadow: "0 1px 0 0 #d1d1d1, 0 2px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continuă cu Google
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => handleSocialSignup("apple")}
                      className="w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-white flex items-center justify-center gap-3 transition-all duration-200"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 100%)",
                        boxShadow: "0 3px 0 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                      whileHover={{ y: -2, boxShadow: "0 5px 0 0 rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                      whileTap={{ y: 2, boxShadow: "0 1px 0 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      Continuă cu Apple
                    </motion.button>
                  </div>

                  {/* Login link */}
                  <p className="text-center mt-10 text-white/40 text-[15px]">
                    Ai deja un cont?{" "}
                    <Link href="/login" className="text-gold hover:text-gold-light transition-colors">
                      Conectează-te
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 text-center lg:text-left lg:px-12">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Niche Records
          </p>
        </div>
      </div>
    </div>
  );
}
