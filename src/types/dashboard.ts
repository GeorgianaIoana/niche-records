import type { Product, Format, Category } from "./product";

// Collection Types
export interface CollectionItem {
  id: string;
  product: Product;
  purchaseDate: string;
  purchasePrice: number;
  condition: "Mint" | "Near Mint" | "Very Good" | "Good" | "Fair";
  notes?: string;
}

export interface CollectionStats {
  totalItems: number;
  totalValue: number;
  byFormat: Record<Format, number>;
  newThisMonth: number;
  preOrders: number;
  inTransit: number;
}

// Wishlist Types
export type WishlistAlertType = "price_drop" | "back_in_stock" | "last_item" | "pre_order";

export interface WishlistItem {
  id: string;
  product: Product;
  addedDate: string;
  alertType?: WishlistAlertType;
  previousPrice?: number;
  notifyOnRestock: boolean;
}

// Order Types
export type OrderStatus = "processing" | "shipped" | "in_transit" | "delivered" | "cancelled";

export interface OrderTrackingEvent {
  status: OrderStatus;
  date: string;
  location?: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }[];
  status: OrderStatus;
  trackingEvents: OrderTrackingEvent[];
  estimatedDelivery?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  total: number;
  createdAt: string;
}

// Artist Types
export type ArtistUpdateType = "new_album" | "pre_order" | "back_in_stock" | "tour" | "reissue";

export interface ArtistUpdate {
  id: string;
  type: ArtistUpdateType;
  title: string;
  description: string;
  date: string;
  relatedProduct?: Product;
  imageUrl?: string;
}

export interface FollowedArtist {
  id: string;
  name: string;
  imageUrl: string;
  followedDate: string;
  itemsInCollection: number;
  recentUpdates: ArtistUpdate[];
}

// Taste Profile Types
export interface GenreData {
  genre: string;
  value: number; // 0-100 percentage
}

export interface DecadeData {
  decade: string;
  count: number;
}

export type MoodTag =
  | "Nostalgic"
  | "Energetic"
  | "Melancholic"
  | "Euphoric"
  | "Chill"
  | "Intense"
  | "Romantic"
  | "Rebellious";

export type BadgeType =
  | "vinyl_enthusiast"
  | "cd_collector"
  | "genre_explorer"
  | "decade_specialist"
  | "early_adopter"
  | "completionist"
  | "rare_finder"
  | "first_edition";

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  earnedDate: string;
  icon: string;
}

export interface TasteProfile {
  topGenres: GenreData[];
  decadeDistribution: DecadeData[];
  topArtists: { name: string; count: number }[];
  moodTags: MoodTag[];
  badges: Badge[];
  listeningStats: {
    totalAlbums: number;
    totalArtists: number;
    totalGenres: number;
    avgReleaseYear: number;
  };
}

// Discovery Types
export type RecommendationType = "for_you" | "because_you_liked" | "new_from_artist" | "trending";

export interface DiscoveryItem {
  id: string;
  type: RecommendationType;
  reason: string;
  product: Product;
  previewUrl?: string;
}

// Dashboard State
export interface DashboardState {
  collection: CollectionItem[];
  collectionStats: CollectionStats;
  wishlist: WishlistItem[];
  orders: Order[];
  followedArtists: FollowedArtist[];
  tasteProfile: TasteProfile;
  discoveries: DiscoveryItem[];
}
