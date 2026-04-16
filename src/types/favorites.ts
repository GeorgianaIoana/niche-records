import type { Product } from "./product";

export interface FavoritesState {
  items: Product[];
}

export interface FavoritesActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
}

export type FavoritesContextType = FavoritesState &
  FavoritesActions & {
    totalItems: number;
  };
