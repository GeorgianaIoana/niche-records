"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  Truck,
  CreditCard,
  Check,
  Tag,
  ChevronRight,
  Shield,
  RotateCcw,
  Package,
  Gift,
  AlertCircle,
  X,
} from "lucide-react";
import { Questrial } from "next/font/google";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/store";
import { formatPrice, cn } from "@/lib/utils";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
});

// Progress Step Component
function ProgressStep({
  step,
  label,
  icon: Icon,
  isActive,
  isCompleted,
}: {
  step: number;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          isCompleted
            ? "bg-gold text-bleu-dark"
            : isActive
              ? "bg-gold/20 border-2 border-gold text-gold"
              : "bg-white/5 border border-white/10 text-gray-500"
        )}
      >
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
      <div className="hidden sm:block">
        <p
          className={cn(
            "text-xs uppercase tracking-wider",
            isActive || isCompleted ? "text-gold" : "text-gray-500"
          )}
        >
          Pasul {step}
        </p>
        <p
          className={cn(
            "font-medium",
            isActive || isCompleted ? "text-white" : "text-gray-400"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// Cart Item Component (eMAG style)
function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: {
    id: string;
    product: {
      id: string;
      slug: string;
      name: string;
      artist: string;
      price: number;
      salePrice?: number;
      category: string;
      format: string;
      images: { url: string; alt: string }[];
      inStock: boolean;
    };
    quantity: number;
  };
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const hasDiscount = item.product.salePrice && item.product.salePrice > item.product.price;
  const lineTotal = item.product.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-bleu-medium/30 rounded-xl border border-white/5 p-4 sm:p-6"
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        <Link
          href={`/products/${item.product.category}/${item.product.slug}`}
          className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-bleu-dark group"
        >
          <Image
            src={item.product.images[0]?.url || "/placeholder.jpg"}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="128px"
          />
          {/* Format badge */}
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-bleu-dark/90 text-xs text-gold font-medium rounded">
            {item.product.format}
          </span>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          {/* Title & Artist */}
          <div className="mb-2">
            <Link
              href={`/products/${item.product.category}/${item.product.slug}`}
              className="font-heading text-base sm:text-lg font-semibold text-white hover:text-gold transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-gray-400 mt-0.5">{item.product.artist}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1.5 mb-3">
            {item.product.inStock ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-green-400">În stoc</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs text-orange-400">Stoc limitat</span>
              </>
            )}
          </div>

          {/* Price - Mobile */}
          <div className="flex items-center gap-3 mb-3 sm:hidden">
            <span className="text-lg font-semibold text-gold">
              {formatPrice(item.product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(item.product.salePrice!)}
              </span>
            )}
          </div>

          {/* Quantity & Actions - Mobile */}
          <div className="flex items-center justify-between sm:hidden">
            <div className="flex items-center bg-bleu-dark rounded-lg border border-white/10">
              <button
                onClick={() =>
                  onUpdateQuantity(item.product.id, item.quantity - 1)
                }
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                disabled={item.quantity <= 1}
                aria-label="Scade cantitatea"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-white font-medium text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(item.product.id, item.quantity + 1)
                }
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Crește cantitatea"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onRemove(item.product.id)}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              aria-label="Șterge produsul"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: Price, Quantity, Total */}
        <div className="hidden sm:flex items-start gap-6">
          {/* Unit Price */}
          <div className="text-right w-28">
            <p className="text-xs text-gray-500 mb-1">Preț unitar</p>
            <p className="font-semibold text-white">
              {formatPrice(item.product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(item.product.salePrice!)}
              </p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Cantitate</p>
            <div className="flex items-center bg-bleu-dark rounded-lg border border-white/10">
              <button
                onClick={() =>
                  onUpdateQuantity(item.product.id, item.quantity - 1)
                }
                className="p-2.5 text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                disabled={item.quantity <= 1}
                aria-label="Scade cantitatea"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-white font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(item.product.id, item.quantity + 1)
                }
                className="p-2.5 text-gray-400 hover:text-white transition-colors"
                aria-label="Crește cantitatea"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Line Total */}
          <div className="text-right w-28">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="font-semibold text-gold text-lg">
              {formatPrice(lineTotal)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.product.id)}
            className="p-2 text-gray-500 hover:text-red-400 transition-colors mt-4"
            aria-label="Șterge produsul"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Line Total */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 sm:hidden">
        <span className="text-sm text-gray-400">Total produs</span>
        <span className="font-semibold text-gold">{formatPrice(lineTotal)}</span>
      </div>
    </motion.div>
  );
}

// Voucher Section Component
function VoucherSection({
  onApply,
  appliedVoucher,
  onRemoveVoucher,
}: {
  onApply: (code: string) => void;
  appliedVoucher: { code: string; discount: number } | null;
  onRemoveVoucher: () => void;
}) {
  const [code, setCode] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Te rugăm să introduci un cod");
      return;
    }
    // Simulate voucher validation
    if (code.toUpperCase() === "NICHE10") {
      onApply(code);
      setCode("");
      setError("");
      setIsExpanded(false);
    } else {
      setError("Codul introdus nu este valid sau a expirat");
    }
  };

  if (appliedVoucher) {
    return (
      <div className="flex items-center justify-between p-4 bg-gold/10 rounded-lg border border-gold/20">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm font-medium text-white">
              Voucher aplicat: {appliedVoucher.code}
            </p>
            <p className="text-xs text-gold">
              Economisești {formatPrice(appliedVoucher.discount)}
            </p>
          </div>
        </div>
        <button
          onClick={onRemoveVoucher}
          className="p-1.5 text-gray-400 hover:text-white transition-colors"
          aria-label="Elimină voucherul"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-gold" />
          <span className="text-sm text-white">Ai un cod de reducere?</span>
        </div>
        <ChevronRight
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-4 pt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="Introdu codul"
                  className="flex-1 bg-bleu-dark border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold/20 text-gold text-sm font-medium rounded-lg hover:bg-gold/30 transition-colors"
                >
                  Aplică
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Încearcă: NICHE10 pentru 10% reducere
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Trust Badge Component
function TrustBadge({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className={`${questrial.className} text-xs text-gray-500 tracking-wider`}>{description}</p>
      </div>
    </div>
  );
}

// Empty Cart Component
function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto px-6 text-center"
      >
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-bleu-medium to-bleu-dark border border-white/10 flex items-center justify-center">
          <ShoppingBag className="w-14 h-14 text-gold/40" />
        </div>
        <h1
          className={`${questrial.className} text-3xl text-white mb-4`}
          style={{
            textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
          }}
        >
          Coșul tău este gol
        </h1>
        <p className={`${questrial.className} text-gray-400 mb-8 leading-relaxed tracking-wider`}>
          Nu ai adăugat încă niciun produs în coș. Descoperă colecția noastră de
          viniluri, CD-uri și DVD-uri.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(to bottom, #c9ad7a 0%, #b39969 50%, #9a8356 100%)",
            color: "#0a1628",
            boxShadow:
              "0 4px 12px rgba(179, 153, 105, 0.4), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.15)",
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          Explorează colecția
        </Link>
      </motion.div>
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [voucher, setVoucher] = useState<{ code: string; discount: number } | null>(
    null
  );

  // Calculate discount (10% for NICHE10)
  const discount = voucher ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 15000 ? 0 : 1500; // Free shipping over 150 lei
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bleu-dark pt-24 lg:pt-32 pb-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bleu-dark pt-24 lg:pt-32 pb-16 relative overflow-hidden">
      {/* Ambient light effects */}
      <Image
        src="/blue-light.png"
        alt=""
        width={400}
        height={400}
        className="absolute -top-40 right-0 pointer-events-none opacity-40"
        aria-hidden="true"
      />
      <Image
        src="/light-glow.png"
        alt=""
        width={350}
        height={350}
        className="absolute bottom-20 -left-40 pointer-events-none opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Steps */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <ProgressStep
              step={1}
              label="Coș"
              icon={ShoppingCart}
              isActive={true}
              isCompleted={false}
            />
            <div className="w-12 sm:w-24 h-px bg-white/10" />
            <ProgressStep
              step={2}
              label="Livrare"
              icon={Truck}
              isActive={false}
              isCompleted={false}
            />
            <div className="w-12 sm:w-24 h-px bg-white/10" />
            <ProgressStep
              step={3}
              label="Plată"
              icon={CreditCard}
              isActive={false}
              isCompleted={false}
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1
            className={`${questrial.className} text-3xl lg:text-4xl text-white`}
            style={{
              textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
            }}
          >
            Coșul tău
          </h1>
          <p className={`${questrial.className} text-gray-400 mt-2 tracking-wider`}>
            {totalItems} {totalItems === 1 ? "produs" : "produse"} în coș
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Continuă cumpărăturile
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-bleu-medium/40 rounded-2xl border border-white/5 p-6 lg:sticky lg:top-28">
              <h2
                className={`${questrial.className} text-xl text-white mb-6`}
                style={{
                  textShadow: '1px 1px 0 rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.2)',
                }}
              >
                Sumar comandă
              </h2>

              {/* Voucher Section */}
              <div className="mb-6">
                <VoucherSection
                  onApply={(code) => setVoucher({ code, discount })}
                  appliedVoucher={voucher}
                  onRemoveVoucher={() => setVoucher(null)}
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Subtotal ({totalItems}{" "}
                    {totalItems === 1 ? "produs" : "produse"})
                  </span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>

                {voucher && (
                  <div className="flex justify-between text-green-400">
                    <span>Reducere ({voucher.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-400">Livrare</span>
                  {shipping === 0 ? (
                    <span className="text-green-400">Gratuită</span>
                  ) : (
                    <span className="text-white">{formatPrice(shipping)}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gold/70 flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Mai ai nevoie de {formatPrice(15000 - subtotal)} pentru
                    livrare gratuită
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 mt-6 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg text-white font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gold">
                      {formatPrice(total)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      TVA inclus
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block mt-6">
                <button
                  className="w-full py-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(to bottom, #c9ad7a 0%, #b39969 50%, #9a8356 100%)",
                    color: "#0a1628",
                    boxShadow:
                      "0 4px 12px rgba(179, 153, 105, 0.4), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.15)",
                  }}
                >
                  <CreditCard className="w-4 h-4" />
                  Finalizează comanda
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <TrustBadge
                  icon={Shield}
                  title="Plată securizată"
                  description="Datele tale sunt protejate SSL"
                />
                <TrustBadge
                  icon={Truck}
                  title="Livrare rapidă"
                  description="2-4 zile lucrătoare"
                />
                <TrustBadge
                  icon={RotateCcw}
                  title="Retur gratuit"
                  description="14 zile pentru retur"
                />
                <TrustBadge
                  icon={Package}
                  title="Ambalaj premium"
                  description="Produse protejate cu grijă"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-gold/5 to-transparent rounded-xl border border-gold/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg font-semibold text-white mb-1">
                Livrare gratuită pentru comenzi peste 150 lei
              </h3>
              <p className={`${questrial.className} text-sm text-gray-400 tracking-wider`}>
                Adaugă mai multe produse în coș și beneficiezi de transport
                gratuit în toată țara.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm text-gold hover:text-gold-light transition-colors whitespace-nowrap"
            >
              Vezi toate produsele →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
