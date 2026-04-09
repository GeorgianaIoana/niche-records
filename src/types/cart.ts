import type { Product } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export type CartContextType = CartState & CartActions & {
  totalItems: number;
  subtotal: number;
};
