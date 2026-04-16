"use client";

import { useState } from "react";
import Image from "next/image";
import { Questrial } from "next/font/google";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Phone, Clock, ChevronDown, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

// FAQ Data
const faqs = [
  {
    question: "Cât durează livrarea?",
    answer:
      "Livrarea standard durează între 2-4 zile lucrătoare pentru București și 3-5 zile pentru restul țării. Oferim și opțiunea de livrare express în 24 de ore pentru comenzi plasate înainte de ora 14:00.",
  },
  {
    question: "Pot returna un produs?",
    answer:
      "Da, acceptăm retururi în termen de 14 zile de la primire. Produsele trebuie să fie în stare originală, nesigilate doar în cazul defectelor de fabricație. Te rugăm să ne contactezi pentru a iniția procesul de retur.",
  },
  {
    question: "Aveți showroom fizic?",
    answer:
      "Momentan funcționăm exclusiv online, ceea ce ne permite să oferim prețuri competitive și o selecție mai largă. Planificăm deschiderea unui showroom în București în viitorul apropiat.",
  },
  {
    question: "Cum pot urmări comanda?",
    answer:
      "După expedierea comenzii, vei primi un email cu numărul AWB și linkul de tracking. Poți verifica statusul comenzii oricând în contul tău sau folosind numărul de comandă pe pagina noastră.",
  },
];

// Subject options
const subjects = [
  { value: "", label: "Selectează un subiect" },
  { value: "order", label: "Întrebare despre o comandă" },
  { value: "product", label: "Informații despre un produs" },
  { value: "rare", label: "Caut un album rar" },
  { value: "partnership", label: "Colaborare / Parteneriat" },
  { value: "other", label: "Altele" },
];

// Floating Label Input Component
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "peer w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300",
          error
            ? "border-red-400"
            : focused
              ? "border-gold/60"
              : "border-white/10 hover:border-white/20"
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          isActive
            ? "-top-2 text-xs"
            : "top-4 text-base",
          isActive
            ? focused
              ? "text-gold"
              : "text-gray-400"
            : "text-gray-500"
        )}
      >
        {label}
        {required && <span className="text-gold/60 ml-1">*</span>}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Floating Label Textarea Component
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        className={cn(
          "peer w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 resize-none",
          focused
            ? "border-gold/60"
            : "border-white/10 hover:border-white/20"
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          isActive
            ? "-top-2 text-xs"
            : "top-4 text-base",
          isActive
            ? focused
              ? "text-gold"
              : "text-gray-400"
            : "text-gray-500"
        )}
      >
        {label}
        {required && <span className="text-gold/60 ml-1">*</span>}
      </label>
    </div>
  );
}

// Custom Select Component
function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "peer w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer",
          focused
            ? "border-gold/60"
            : "border-white/10 hover:border-white/20",
          !hasValue && "text-gray-500"
        )}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-bleu-dark text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          isActive
            ? "-top-2 text-xs"
            : "top-4 text-base",
          isActive
            ? focused
              ? "text-gold"
              : "text-gray-400"
            : "text-gray-500"
        )}
      >
        {label}
        {required && <span className="text-gold/60 ml-1">*</span>}
      </label>
      <ChevronDown
        className={cn(
          "absolute right-0 top-4 w-5 h-5 transition-all duration-300 pointer-events-none",
          focused ? "text-gold" : "text-gray-500"
        )}
      />
    </div>
  );
}

// FAQ Accordion Item Component
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
        aria-expanded={isOpen}
      >
        <span className="text-white group-hover:text-gold transition-colors font-medium pr-8">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 transition-all duration-300 flex-shrink-0",
            isOpen && "rotate-180 text-gold"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className={`${questrial.className} pb-5 text-gray-400 text-sm leading-relaxed tracking-wider`}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Contact Info Item Component
function ContactInfoItem({
  icon: Icon,
  title,
  children,
  href,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  href?: string;
}) {
  const Content = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-1">
          {title}
        </p>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block group hover:opacity-80 transition-opacity"
      >
        {Content}
      </a>
    );
  }

  return Content;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time email validation
    if (name === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Te rugăm să introduci o adresă de email validă",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Numele este obligatoriu";
    if (!formData.email.trim()) {
      newErrors.email = "Emailul este obligatoriu";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Te rugăm să introduci o adresă de email validă";
    }
    if (!formData.subject) newErrors.subject = "Te rugăm să selectezi un subiect";
    if (!formData.message.trim()) newErrors.message = "Mesajul este obligatoriu";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bleu-dark relative overflow-hidden">
      {/* Ambient Light Effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={500}
        height={500}
        className="absolute -top-32 right-0 pointer-events-none opacity-50"
        aria-hidden="true"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={450}
        height={450}
        className="absolute bottom-40 -left-40 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Contact
            </p>
            <h1
              className={`${questrial.className} text-4xl lg:text-5xl xl:text-6xl text-white tracking-wide mb-6`}
              style={{
                textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              Hai să vorbim despre muzică.
            </h1>
            <p className={`${questrial.className} text-gray-400 text-lg max-w-2xl leading-relaxed tracking-wider`}>
              Fie că ai întrebări despre o comandă, cauți un album rar, sau vrei
              să colaborăm — suntem aici pentru tine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 lg:pb-32 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-center py-20 lg:py-32"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8"
                      >
                        <Check className="w-10 h-10 text-gold" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4"
                      >
                        Mesaj trimis cu succes
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-400 max-w-md mx-auto leading-relaxed"
                      >
                        Îți mulțumim pentru mesaj. Vom reveni cu un răspuns în
                        cel mai scurt timp posibil, de obicei în maxim 24 de
                        ore.
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="mt-8 text-gold hover:text-gold-light transition-colors text-sm"
                      >
                        Trimite un alt mesaj
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-10">
                      <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-3">
                        Trimite-ne un mesaj
                      </h2>
                      <p className={`${questrial.className} text-gray-500 text-sm tracking-wider`}>
                        Răspundem în maxim 24 de ore în zilele lucrătoare.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid sm:grid-cols-2 gap-8">
                        <FloatingInput
                          id="name"
                          label="Nume complet"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          error={errors.name}
                        />
                        <FloatingInput
                          id="email"
                          label="Adresă de email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          error={errors.email}
                        />
                      </div>

                      <FloatingSelect
                        id="subject"
                        label="Subiect"
                        value={formData.subject}
                        onChange={handleChange}
                        options={subjects}
                        required
                      />

                      <FloatingTextarea
                        id="message"
                        label="Mesajul tău"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                      />

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold rounded-full transition-all duration-300",
                            isSubmitting
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:-translate-y-0.5"
                          )}
                          style={{
                            background:
                              "linear-gradient(to bottom, #c9ad7a 0%, #b39969 50%, #9a8356 100%)",
                            color: "#0a1628",
                            boxShadow:
                              "0 4px 12px rgba(179, 153, 105, 0.4), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.15)",
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Se trimite...
                            </>
                          ) : (
                            "Trimite mesajul"
                          )}
                        </button>

                        <p className={`${questrial.className} text-gray-600 text-xs mt-6 tracking-wider`}>
                          Prin trimiterea acestui formular, ești de acord cu
                          politica noastră de confidențialitate.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:border-l lg:border-white/5 lg:pl-12"
            >
              <div className="space-y-8">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">
                  Contact rapid
                </h2>

                <ContactInfoItem
                  icon={Mail}
                  title="Email"
                  href="mailto:contact@nicherecords.ro"
                >
                  contact@nicherecords.ro
                </ContactInfoItem>

                <ContactInfoItem
                  icon={Phone}
                  title="Telefon"
                  href="tel:+40721000000"
                >
                  +40 721 000 000
                </ContactInfoItem>

                <ContactInfoItem icon={MapPin} title="Locație">
                  București, România
                </ContactInfoItem>
              </div>

              {/* Business Hours */}
              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-4 h-4 text-gold" />
                  <h3 className="text-xs uppercase tracking-[0.15em] text-gold">
                    Program
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Luni - Vineri</span>
                    <span className="text-white">10:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sâmbătă</span>
                    <span className="text-white">11:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duminică</span>
                    <span className="text-gray-500">Închis</span>
                  </div>
                </div>
              </div>

              {/* Response Time Promise */}
              <div className="mt-10 p-5 rounded-lg bg-white/[0.02] border border-white/5">
                <p className={`${questrial.className} text-sm text-gray-400 leading-relaxed tracking-wider`}>
                  <span className="text-gold">Răspuns rapid garantat.</span>{" "}
                  Ne-am propus să răspundem la toate mesajele în maxim 24 de ore
                  în zilele lucrătoare.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gold/10 py-20 lg:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-20">
              <div className="lg:max-w-xs">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  Întrebări frecvente
                </h2>
                <p className={`${questrial.className} text-gray-500 text-sm leading-relaxed tracking-wider`}>
                  Găsește răspunsuri rapide la cele mai comune întrebări despre
                  comenzi, livrare și produse.
                </p>
              </div>

              <div className="flex-1 lg:max-w-2xl">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
