"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useCart } from "@/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in production this would integrate with a payment provider
    alert("Order submitted! (This is a demo)");
  };

  const shipping = 2500; // 25 lei
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-light text-white mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-8">
            Add some items to your cart before checkout.
          </p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/cart"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-10">
          Checkout
        </h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-lg font-medium text-white mb-4 tracking-wide">
                  Contact Information
                </h2>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-lg font-medium text-white mb-4 tracking-wide">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </section>

              {/* Payment notice */}
              <section className="p-4 bg-[#071018] rounded-lg border border-[#1e3a50]/30">
                <div className="flex items-center gap-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                  <p className="text-sm">
                    This is a demo checkout. In production, a payment form would
                    appear here.
                  </p>
                </div>
              </section>

              <Button type="submit" size="lg" className="w-full">
                Place Order • {formatPrice(total)}
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gradient-to-br from-[#122535]/80 to-[#0d1a28]/60 rounded-xl border border-[#1e3a50]/30 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-white mb-6 tracking-wide">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#122535] flex-shrink-0">
                      <Image
                        src={item.product.images[0]?.url || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-[#1e3a50] text-white rounded-full">
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
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-[#1e3a50]/30 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-[#1e3a50]/30 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-white">Total</span>
                    <span className="text-xl font-medium text-gold">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
