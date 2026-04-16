"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product, FavoritesContextType } from "@/types";

const FAVORITES_STORAGE_KEY = "niche-favorites";

type FavoritesAction =
  | { type: "ADD_ITEM"; payload: { product: Product } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "CLEAR_FAVORITES" }
  | { type: "LOAD_FAVORITES"; payload: { items: Product[] } };

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, product],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.productId),
      };
    }

    case "CLEAR_FAVORITES":
      return { ...state, items: [] };

    case "LOAD_FAVORITES":
      return { ...state, items: action.payload.items };

    default:
      return state;
  }
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) {
          dispatch({ type: "LOAD_FAVORITES", payload: { items: parsed.items } });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save favorites to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({ items: state.items })
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [state.items]);

  const addItem = useCallback((product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: { product } });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => {
      return state.items.some((item) => item.id === productId);
    },
    [state.items]
  );

  const toggleItem = useCallback(
    (product: Product) => {
      if (isFavorite(product.id)) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
    },
    [isFavorite, removeItem, addItem]
  );

  const clearFavorites = useCallback(() => {
    dispatch({ type: "CLEAR_FAVORITES" });
  }, []);

  const totalItems = state.items.length;

  const value: FavoritesContextType = {
    ...state,
    addItem,
    removeItem,
    toggleItem,
    clearFavorites,
    isFavorite,
    totalItems,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
