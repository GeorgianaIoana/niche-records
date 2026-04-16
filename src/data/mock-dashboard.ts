import type {
  CollectionItem,
  CollectionStats,
  WishlistItem,
  Order,
  FollowedArtist,
  TasteProfile,
  DiscoveryItem,
  DashboardState,
} from "@/types/dashboard";
import { products } from "./products";

// Collection Items - simulating user's purchased items
export const mockCollection: CollectionItem[] = [
  {
    id: "col-1",
    product: products[0], // Rumours
    purchaseDate: "2024-01-15",
    purchasePrice: 8900,
    condition: "Mint",
    notes: "First pressing, excellent sound",
  },
  {
    id: "col-2",
    product: products[1], // IGOR
    purchaseDate: "2024-02-20",
    purchasePrice: 9900,
    condition: "Mint",
  },
  {
    id: "col-3",
    product: products[2], // AM
    purchaseDate: "2024-03-05",
    purchasePrice: 7900,
    condition: "Near Mint",
  },
  {
    id: "col-4",
    product: products[3], // Riot!
    purchaseDate: "2024-03-18",
    purchasePrice: 10900,
    condition: "Mint",
    notes: "Silver anniversary edition",
  },
  {
    id: "col-5",
    product: products[4], // CTRL
    purchaseDate: "2024-04-01",
    purchasePrice: 11900,
    condition: "Mint",
  },
  {
    id: "col-6",
    product: products[10], // Channel Orange CD
    purchaseDate: "2024-04-10",
    purchasePrice: 4500,
    condition: "Mint",
    notes: "Japan import with bonus tracks",
  },
  {
    id: "col-7",
    product: products[11], // Alice in Chains Unplugged
    purchaseDate: "2024-04-15",
    purchasePrice: 3500,
    condition: "Very Good",
  },
  {
    id: "col-8",
    product: products[15], // Stop Making Sense DVD
    purchaseDate: "2024-04-20",
    purchasePrice: 4900,
    condition: "Mint",
  },
];

export const mockCollectionStats: CollectionStats = {
  totalItems: 127,
  totalValue: 485000, // ~4850 RON in bani
  byFormat: {
    Vinyl: 78,
    CD: 34,
    DVD: 12,
    "Blu-Ray": 3,
    MC: 0,
    Audiofil: 0,
    Accesorii: 0,
  },
  newThisMonth: 12,
  preOrders: 3,
  inTransit: 5,
};

// Wishlist with alerts
export const mockWishlist: WishlistItem[] = [
  {
    id: "wish-1",
    product: products[5], // folklore
    addedDate: "2024-03-01",
    alertType: "price_drop",
    previousPrice: 14900,
    notifyOnRestock: true,
  },
  {
    id: "wish-2",
    product: products[6], // SOS
    addedDate: "2024-03-10",
    alertType: "back_in_stock",
    notifyOnRestock: true,
  },
  {
    id: "wish-3",
    product: products[8], // Led Zeppelin IV
    addedDate: "2024-03-15",
    alertType: "last_item",
    notifyOnRestock: true,
  },
  {
    id: "wish-4",
    product: products[9], // Legend Bob Marley
    addedDate: "2024-03-20",
    notifyOnRestock: false,
  },
];

// Orders
export const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "NR-2024-0412",
    items: [
      { product: products[7], quantity: 1, priceAtPurchase: 7500 }, // Pearl Jam Ten
      { product: products[12], quantity: 1, priceAtPurchase: 2900 }, // Audioslave
    ],
    status: "in_transit",
    trackingEvents: [
      {
        status: "processing",
        date: "2024-04-10T10:00:00",
        description: "Comanda a fost plasată",
      },
      {
        status: "processing",
        date: "2024-04-10T14:30:00",
        description: "Plata confirmată",
      },
      {
        status: "shipped",
        date: "2024-04-11T09:00:00",
        location: "București",
        description: "Coletul a fost predat curierului",
      },
      {
        status: "in_transit",
        date: "2024-04-12T08:00:00",
        location: "București",
        description: "În tranzit către destinație",
      },
    ],
    estimatedDelivery: "2024-04-14",
    shippingAddress: {
      name: "Alexandru Ionescu",
      street: "Str. Muzicii nr. 42",
      city: "Timișoara",
      postalCode: "300001",
      country: "România",
    },
    total: 10400,
    createdAt: "2024-04-10T10:00:00",
  },
  {
    id: "order-2",
    orderNumber: "NR-2024-0398",
    items: [
      { product: products[4], quantity: 1, priceAtPurchase: 11900 }, // CTRL
    ],
    status: "delivered",
    trackingEvents: [
      {
        status: "processing",
        date: "2024-04-01T10:00:00",
        description: "Comanda a fost plasată",
      },
      {
        status: "shipped",
        date: "2024-04-02T09:00:00",
        location: "București",
        description: "Coletul a fost predat curierului",
      },
      {
        status: "in_transit",
        date: "2024-04-03T08:00:00",
        location: "Brașov",
        description: "În tranzit",
      },
      {
        status: "delivered",
        date: "2024-04-04T14:30:00",
        location: "Timișoara",
        description: "Livrat cu succes",
      },
    ],
    shippingAddress: {
      name: "Alexandru Ionescu",
      street: "Str. Muzicii nr. 42",
      city: "Timișoara",
      postalCode: "300001",
      country: "România",
    },
    total: 11900,
    createdAt: "2024-04-01T10:00:00",
  },
];

// Followed Artists
export const mockFollowedArtists: FollowedArtist[] = [
  {
    id: "artist-1",
    name: "Tyler, The Creator",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    followedDate: "2024-01-10",
    itemsInCollection: 3,
    recentUpdates: [
      {
        id: "update-1",
        type: "new_album",
        title: "Nou album anunțat!",
        description: "CHROMAKOPIA va fi lansat pe 28 octombrie",
        date: "2024-04-08",
      },
    ],
  },
  {
    id: "artist-2",
    name: "SZA",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop",
    followedDate: "2024-02-15",
    itemsInCollection: 2,
    recentUpdates: [
      {
        id: "update-2",
        type: "reissue",
        title: "CTRL - Ediție aniversară",
        description: "10th Anniversary deluxe vinyl disponibil acum",
        date: "2024-04-05",
        relatedProduct: products[4],
      },
    ],
  },
  {
    id: "artist-3",
    name: "Arctic Monkeys",
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200&h=200&fit=crop",
    followedDate: "2024-03-01",
    itemsInCollection: 4,
    recentUpdates: [
      {
        id: "update-3",
        type: "back_in_stock",
        title: "AM înapoi în stoc",
        description: "Ediția 180g disponibilă din nou",
        date: "2024-04-01",
        relatedProduct: products[2],
      },
    ],
  },
  {
    id: "artist-4",
    name: "Fleetwood Mac",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop",
    followedDate: "2024-01-05",
    itemsInCollection: 5,
    recentUpdates: [],
  },
];

// Taste Profile
export const mockTasteProfile: TasteProfile = {
  topGenres: [
    { genre: "Rock", value: 85 },
    { genre: "R&B", value: 72 },
    { genre: "Alternative", value: 68 },
    { genre: "Pop", value: 55 },
    { genre: "Hip-Hop", value: 48 },
    { genre: "Indie", value: 42 },
  ],
  decadeDistribution: [
    { decade: "70s", count: 12 },
    { decade: "80s", count: 8 },
    { decade: "90s", count: 25 },
    { decade: "2000s", count: 35 },
    { decade: "2010s", count: 32 },
    { decade: "2020s", count: 15 },
  ],
  topArtists: [
    { name: "Fleetwood Mac", count: 5 },
    { name: "Tyler, The Creator", count: 4 },
    { name: "Arctic Monkeys", count: 4 },
    { name: "SZA", count: 3 },
    { name: "Pearl Jam", count: 3 },
  ],
  moodTags: ["Nostalgic", "Energetic", "Melancholic", "Chill"],
  badges: [
    {
      id: "vinyl_enthusiast",
      name: "Vinyl Enthusiast",
      description: "Ai peste 50 de viniluri în colecție",
      earnedDate: "2024-03-15",
      icon: "disc",
    },
    {
      id: "genre_explorer",
      name: "Explorator de Genuri",
      description: "Ai albume din peste 10 genuri diferite",
      earnedDate: "2024-02-20",
      icon: "compass",
    },
    {
      id: "early_adopter",
      name: "Early Adopter",
      description: "Printre primii membri Niche Records",
      earnedDate: "2024-01-05",
      icon: "star",
    },
  ],
  listeningStats: {
    totalAlbums: 127,
    totalArtists: 78,
    totalGenres: 14,
    avgReleaseYear: 2005,
  },
};

// Discovery recommendations
export const mockDiscoveries: DiscoveryItem[] = [
  {
    id: "disc-1",
    type: "for_you",
    reason: "Recomandat pentru tine",
    product: products[5], // folklore
  },
  {
    id: "disc-2",
    type: "because_you_liked",
    reason: "Pentru că ți-a plăcut IGOR",
    product: products[6], // SOS
  },
  {
    id: "disc-3",
    type: "new_from_artist",
    reason: "Nou de la artiștii urmăriți",
    product: products[8], // Led Zeppelin
  },
  {
    id: "disc-4",
    type: "trending",
    reason: "Popular săptămâna aceasta",
    product: products[9], // Bob Marley Legend
  },
  {
    id: "disc-5",
    type: "for_you",
    reason: "Potrivit cu gustul tău",
    product: products[13], // Grateful Dead
  },
];

// Full dashboard state
export const mockDashboardState: DashboardState = {
  collection: mockCollection,
  collectionStats: mockCollectionStats,
  wishlist: mockWishlist,
  orders: mockOrders,
  followedArtists: mockFollowedArtists,
  tasteProfile: mockTasteProfile,
  discoveries: mockDiscoveries,
};

// Helper functions
export function getActiveOrders(): Order[] {
  return mockOrders.filter(
    (order) => order.status !== "delivered" && order.status !== "cancelled"
  );
}

export function getWishlistWithAlerts(): WishlistItem[] {
  return mockWishlist.filter((item) => item.alertType);
}

export function getRecentPurchases(limit = 5): CollectionItem[] {
  return [...mockCollection]
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
    .slice(0, limit);
}

export function getArtistsWithUpdates(): FollowedArtist[] {
  return mockFollowedArtists.filter((artist) => artist.recentUpdates.length > 0);
}
