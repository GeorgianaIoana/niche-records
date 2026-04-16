"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { FavoritesProvider } from "./favorites-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
