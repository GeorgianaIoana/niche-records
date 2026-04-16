"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  Check,
  Package,
  ShoppingBag,
  ChevronDown,
  Heart,
  Plus,
} from "lucide-react";
import { Questrial } from "next/font/google";
import { useCart, useFavorites } from "@/store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
});

// Floating label input component matching login page style
function FloatingInput({
  type = "text",
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  autoFocus,
  required,
}: {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  autoFocus?: boolean;
  required?: boolean;
}) {
  return (
    <div className="relative flex-1">
      {/* Label above input */}
      <label
        className={cn(
          "block text-[11px] tracking-wider uppercase mb-2",
          error ? "text-red-400" : "text-white/60"
        )}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        className={cn(
          "w-full bg-bleu-dark/50 text-white text-[14px] px-4 py-3 rounded-lg border transition-colors focus:outline-none",
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-gold/50",
          "placeholder:text-white/30"
        )}
      />
    </div>
  );
}

// Progress steps component
function CheckoutProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: "Cart", icon: ShoppingBag },
    { number: 2, label: "Information", icon: Package },
    { number: 3, label: "Payment", icon: CreditCard },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const Icon = step.icon;

        return (
          <div key={step.number} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isCompleted
                    ? "bg-gold text-bleu-dark"
                    : isActive
                      ? "bg-gold/20 border-2 border-gold text-gold"
                      : "bg-white/5 border border-white/10 text-white/30"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:block transition-colors",
                  isCompleted || isActive ? "text-white" : "text-white/30"
                )}
              >
                {step.label}
              </span>
            </motion.div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="w-8 sm:w-16 h-px mx-2 sm:mx-4 bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: isCompleted ? "0%" : "-100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 bg-gold"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Trust badges component
function TrustBadges() {
  const badges = [
    { icon: Lock, text: "Secure Checkout" },
    { icon: Truck, text: "Free Shipping $50+" },
    { icon: ShieldCheck, text: "Easy Returns" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap justify-center gap-4 mt-6"
    >
      {badges.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="flex items-center gap-2 px-3 py-2 bg-gold/5 rounded-lg border border-gold/10"
        >
          <Icon className="w-4 h-4 text-gold/70" />
          <span className="text-xs text-white/60">{text}</span>
        </div>
      ))}
    </motion.div>
  );
}

// Empty cart state
function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Ambient effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
        <div className="absolute inset-0 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gold/60" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "text-2xl lg:text-3xl font-light text-white mb-4",
            questrial.className
          )}
        >
          Your cart is empty
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mb-8"
        >
          Add some items to your cart before checkout.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/products">
            <motion.button
              className="px-10 py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-200"
              style={{
                background:
                  "linear-gradient(180deg, #f5d998 0%, #e5c88a 20%, #d4b87a 50%, #c9a968 80%, #b89a58 100%)",
                boxShadow:
                  "0 6px 0 0 #8a6d35, 0 8px 20px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
                color: "#2a1f0a",
                textShadow: "0 1px 0 rgba(255,255,255,0.3)",
              }}
              whileHover={{
                y: -3,
                boxShadow:
                  "0 9px 0 0 #8a6d35, 0 12px 25px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
              }}
              whileTap={{
                y: 3,
                boxShadow:
                  "0 2px 0 0 #8a6d35, 0 3px 8px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
              }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, addItem } = useCart();
  const { items: favoriteItems } = useFavorites();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in production this would integrate with a payment provider
    alert("Order submitted! (This is a demo)");
  };

  const shipping = subtotal >= 5000 ? 0 : 2500; // Free shipping over 50 lei
  const total = subtotal + shipping;

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-12 lg:py-16 relative overflow-hidden"
    >
      {/* Ambient light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={600}
        height={600}
        className="absolute -top-40 -right-32 opacity-60 pointer-events-none select-none"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={500}
        height={500}
        className="absolute -bottom-40 -left-40 opacity-50 pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Cart
          </Link>
        </motion.div>

        {/* Progress steps */}
        <CheckoutProgress currentStep={2} />

        {/* Page title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "text-3xl lg:text-4xl font-light text-white tracking-tight mb-10 text-center lg:text-left",
            questrial.className
          )}
        >
          Checkout
        </motion.h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Section 1: Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pb-8 border-b border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <span className="text-xs font-medium text-gold">1</span>
                  </div>
                  <h2 className="text-lg font-medium text-white tracking-wide">
                    Contact Information
                  </h2>
                </div>
                <FloatingInput
                  type="email"
                  name="email"
                  label="Email address"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </motion.section>

              {/* Section 2: Shipping */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pb-8 border-b border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <span className="text-xs font-medium text-gold">2</span>
                  </div>
                  <h2 className="text-lg font-medium text-white tracking-wide">
                    Shipping Address
                  </h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                      type="text"
                      name="firstName"
                      label="First name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <FloatingInput
                      type="text"
                      name="lastName"
                      label="Last name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <FloatingInput
                    type="text"
                    name="address"
                    label="Address"
                    placeholder="Street name and number"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                      type="text"
                      name="city"
                      label="City"
                      placeholder="Bucharest"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <FloatingInput
                      type="text"
                      name="postalCode"
                      label="Postal code"
                      placeholder="012345"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <FloatingInput
                    type="tel"
                    name="phone"
                    label="Phone number"
                    placeholder="0712 345 678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </motion.section>

              {/* Section 3: Payment notice */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <span className="text-xs font-medium text-gold">3</span>
                  </div>
                  <h2 className="text-lg font-medium text-white tracking-wide">
                    Payment
                  </h2>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#122535]/60 to-[#0d1a28]/40 rounded-xl border border-[#1e3a50]/30">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gold/70" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Demo Checkout</p>
                      <p className="text-xs text-white/40">
                        In production, a secure payment form would appear here.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <TrustBadges />
              </motion.section>

              {/* Submit button - 3D Gold */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  className="w-full py-5 px-8 rounded-2xl font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-200 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, #f5d998 0%, #e5c88a 20%, #d4b87a 50%, #c9a968 80%, #b89a58 100%)",
                    boxShadow:
                      "0 6px 0 0 #8a6d35, 0 8px 20px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
                    color: "#2a1f0a",
                    textShadow: "0 1px 0 rgba(255,255,255,0.3)",
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow:
                      "0 9px 0 0 #8a6d35, 0 12px 25px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
                  }}
                  whileTap={{
                    y: 3,
                    boxShadow:
                      "0 2px 0 0 #8a6d35, 0 3px 8px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Place Order • {formatPrice(total)}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-[#122535]/80 to-[#0d1a28]/60 rounded-xl border border-[#1e3a50]/30 p-6 sticky top-24 transition-all duration-300 hover:border-gold/10 hover:shadow-[0_0_30px_rgba(212,184,122,0.05)]">
              <h2 className="text-lg font-medium text-white mb-6 tracking-wide">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#122535] flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || "/placeholder.jpg"}
                          alt={item.product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="64px"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-medium bg-gold text-bleu-dark rounded-full shadow-lg">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.product.artist}
                        </p>
                      </div>
                      <p className="text-sm text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Voucher code section */}
              <div className="border-t border-[#1e3a50]/30 pt-4 mb-4">
                <button
                  type="button"
                  onClick={() => setShowVoucher(!showVoucher)}
                  className="flex items-center justify-between w-full text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span>Have a voucher code?</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      showVoucher && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {showVoucher && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder="Enter code"
                            className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>
                        <button
                          type="button"
                          className="px-4 h-10 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-[#1e3a50]/30 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-white/40">
                    Free shipping on orders over {formatPrice(5000)}
                  </p>
                )}
                <div className="border-t border-[#1e3a50]/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-xl font-medium text-gold"
                    >
                      {formatPrice(total)}
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Favorites Section - Full Width */}
        {favoriteItems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-red-400" />
              </div>
              <h2 className="text-lg font-medium text-white tracking-wide">
                Your Favorites
              </h2>
            </div>

            <div className="flex gap-4">
              {favoriteItems.slice(0, 5).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="group flex-1 min-w-0"
                >
                  <Link
                    href={`/products/${product.category}/${product.slug}`}
                    className="block relative aspect-square rounded-xl overflow-hidden bg-bleu-dark/50 border border-white/5 hover:border-gold/30 transition-all"
                  >
                    <Image
                      src={product.images[0]?.url || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="20vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick add button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                      }}
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                      title="Add to cart"
                    >
                      <Plus className="w-4 h-4 text-bleu-dark" />
                    </button>

                    {/* Price tag */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-sm font-medium text-gold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                  <p className="mt-3 text-sm text-white/70 truncate text-center">
                    {product.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}
