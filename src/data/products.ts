import type { Product } from "@/types";

export const products: Product[] = [
  // CDs
  {
    id: "cd-1",
    slug: "the-tortured-poets-department",
    name: "The Tortured Poets Department",
    artist: "Taylor Swift",
    price: 1899,
    category: "cds",
    format: "CD",
    genre: ["Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
        alt: "The Tortured Poets Department by Taylor Swift CD",
      },
    ],
    description:
      "Taylor Swift's eleventh studio album is a masterful exploration of heartbreak, fame, and self-reflection. Featuring collaborations with Post Malone and Florence + The Machine, this deeply personal record showcases Swift at her most vulnerable and poetic.",
    tracklist: [
      { number: 1, title: "Fortnight (feat. Post Malone)", duration: "3:48" },
      { number: 2, title: "The Tortured Poets Department", duration: "4:13" },
      { number: 3, title: "My Boy Only Breaks His Favorite Toys", duration: "3:14" },
      { number: 4, title: "Down Bad", duration: "4:23" },
      { number: 5, title: "So Long, London", duration: "4:24" },
      { number: 6, title: "But Daddy I Love Him", duration: "4:34" },
      { number: 7, title: "Fresh Out the Slammer", duration: "3:22" },
      { number: 8, title: "Florida!!! (feat. Florence + The Machine)", duration: "3:42" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-2",
    slug: "the-rise-and-fall-of-a-midwest-princess",
    name: "The Rise and Fall of a Midwest Princess",
    artist: "Chappell Roan",
    price: 1499,
    category: "cds",
    format: "CD",
    genre: ["Pop", "Indie"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
        alt: "The Rise and Fall of a Midwest Princess by Chappell Roan CD",
      },
    ],
    description:
      "Chappell Roan's debut studio album is a glittering, theatrical celebration of queer identity and Midwestern roots. With anthems like 'Pink Pony Club' and 'HOT TO GO!', this album defined the sound of 2024.",
    tracklist: [
      { number: 1, title: "Femininomenon", duration: "2:59" },
      { number: 2, title: "Red Wine Supernova", duration: "3:12" },
      { number: 3, title: "After Midnight", duration: "3:44" },
      { number: 4, title: "Coffee", duration: "3:01" },
      { number: 5, title: "Casual", duration: "3:58" },
      { number: 6, title: "Super Graphic Ultra Modern Girl", duration: "2:53" },
      { number: 7, title: "HOT TO GO!", duration: "2:49" },
      { number: 8, title: "My Kink Is Karma", duration: "3:19" },
      { number: 9, title: "Picture You", duration: "2:44" },
      { number: 10, title: "Kaleidoscope", duration: "3:15" },
      { number: 11, title: "Pink Pony Club", duration: "4:23" },
      { number: 12, title: "Naked in Manhattan", duration: "2:43" },
      { number: 13, title: "California", duration: "3:27" },
      { number: 14, title: "Guilty Pleasure", duration: "3:38" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-3",
    slug: "short-n-sweet",
    name: "Short n' Sweet",
    artist: "Sabrina Carpenter",
    price: 1399,
    category: "cds",
    format: "CD",
    genre: ["Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&h=600&fit=crop",
        alt: "Short n' Sweet by Sabrina Carpenter CD",
      },
    ],
    description:
      "Sabrina Carpenter's sixth studio album is a cheeky, confident pop masterpiece. Led by the viral hit 'Espresso' and 'Please Please Please', the album showcases Carpenter's sharp wit and undeniable vocal talent.",
    tracklist: [
      { number: 1, title: "Taste", duration: "2:30" },
      { number: 2, title: "Please Please Please", duration: "3:06" },
      { number: 3, title: "Good Graces", duration: "2:55" },
      { number: 4, title: "Sharpest Tool", duration: "3:12" },
      { number: 5, title: "Coincidence", duration: "2:41" },
      { number: 6, title: "Bed Chem", duration: "3:26" },
      { number: 7, title: "Espresso", duration: "2:55" },
      { number: 8, title: "Dumb & Poetic", duration: "3:09" },
      { number: 9, title: "Slim Pickins", duration: "2:31" },
      { number: 10, title: "Juno", duration: "3:04" },
      { number: 11, title: "Lie to Girls", duration: "2:59" },
      { number: 12, title: "Don't Smile", duration: "3:31" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-4",
    slug: "hit-me-hard-and-soft",
    name: "Hit Me Hard and Soft",
    artist: "Billie Eilish",
    price: 1599,
    category: "cds",
    format: "CD",
    genre: ["Pop", "Alternative"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&h=600&fit=crop",
        alt: "Hit Me Hard and Soft by Billie Eilish CD",
      },
    ],
    description:
      "Billie Eilish's third studio album is her most mature and sonically adventurous work yet. Produced entirely with brother FINNEAS, the album moves seamlessly between intimate ballads and bold experimental pop.",
    tracklist: [
      { number: 1, title: "SKINNY", duration: "3:42" },
      { number: 2, title: "LUNCH", duration: "2:59" },
      { number: 3, title: "CHIHIRO", duration: "5:04" },
      { number: 4, title: "BIRDS OF A FEATHER", duration: "3:30" },
      { number: 5, title: "WILDFLOWER", duration: "4:21" },
      { number: 6, title: "THE GREATEST", duration: "4:53" },
      { number: 7, title: "L'AMOUR DE MA VIE", duration: "5:34" },
      { number: 8, title: "THE DINER", duration: "3:07" },
      { number: 9, title: "BITTERSUITE", duration: "4:49" },
      { number: 10, title: "BLUE", duration: "5:40" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-5",
    slug: "brat",
    name: "BRAT",
    artist: "Charli XCX",
    price: 1499,
    category: "cds",
    format: "CD",
    genre: ["Electronic", "Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
        alt: "BRAT by Charli XCX CD",
      },
    ],
    description:
      "Charli XCX's sixth studio album is a hyperpop masterpiece that defined 'brat summer'. Raw, honest, and defiantly cool, featuring hits like '360', 'Apple', and 'Guess' featuring Billie Eilish.",
    tracklist: [
      { number: 1, title: "360", duration: "2:12" },
      { number: 2, title: "Club classics", duration: "2:30" },
      { number: 3, title: "Sympathy is a knife", duration: "2:34" },
      { number: 4, title: "I might say something stupid", duration: "3:06" },
      { number: 5, title: "Talk talk (feat. Troye Sivan)", duration: "2:43" },
      { number: 6, title: "Von dutch", duration: "2:46" },
      { number: 7, title: "Everything is romantic", duration: "2:37" },
      { number: 8, title: "Rewind", duration: "2:19" },
      { number: 9, title: "So I", duration: "2:51" },
      { number: 10, title: "Girl, so confusing", duration: "3:09" },
      { number: 11, title: "Apple", duration: "2:41" },
      { number: 12, title: "B2b", duration: "2:34" },
      { number: 13, title: "Mean girls", duration: "3:21" },
      { number: 14, title: "I think about it all the time", duration: "2:41" },
      { number: 15, title: "365", duration: "3:11" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: false,
  },

  // Vinyls
  {
    id: "vinyl-1",
    slug: "romance",
    name: "Romance",
    artist: "Fontaines D.C.",
    price: 3299,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Post-Punk", "Rock"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&h=600&fit=crop",
        alt: "Romance by Fontaines D.C. Vinyl",
      },
    ],
    description:
      "The fourth album from Dublin's Fontaines D.C. marks a bold evolution in their sound. 'Romance' sees the band exploring new sonic territories while maintaining their poetic lyrical edge. 180g black vinyl pressing.",
    tracklist: [
      { number: 1, title: "Romance", duration: "3:34" },
      { number: 2, title: "Starburster", duration: "4:22" },
      { number: 3, title: "Here's the Thing", duration: "3:56" },
      { number: 4, title: "Desire", duration: "4:11" },
      { number: 5, title: "In the Modern World", duration: "3:45" },
      { number: 6, title: "Bug", duration: "4:08" },
      { number: 7, title: "Motorcycle Boy", duration: "3:52" },
      { number: 8, title: "Sundowner", duration: "4:33" },
      { number: 9, title: "Horseness Is the Whatness", duration: "3:28" },
      { number: 10, title: "Death Kink", duration: "4:15" },
      { number: 11, title: "Favourite", duration: "5:12" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-2",
    slug: "songs-of-a-lost-world",
    name: "Songs of a Lost World",
    artist: "The Cure",
    price: 3499,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Gothic"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=600&h=600&fit=crop",
        alt: "Songs of a Lost World by The Cure Vinyl",
      },
    ],
    description:
      "The Cure's first album in 16 years is a triumphant return to form. 'Songs of a Lost World' is a deeply emotional, atmospheric masterpiece that sees Robert Smith reflecting on loss, aging, and mortality. Gatefold sleeve, 180g vinyl.",
    tracklist: [
      { number: 1, title: "Alone", duration: "6:38" },
      { number: 2, title: "And Nothing Is Forever", duration: "5:25" },
      { number: 3, title: "A Fragile Thing", duration: "4:35" },
      { number: 4, title: "Warsong", duration: "5:11" },
      { number: 5, title: "Drone:Nodrone", duration: "6:17" },
      { number: 6, title: "I Can Never Say Goodbye", duration: "5:49" },
      { number: 7, title: "All I Ever Am", duration: "4:44" },
      { number: 8, title: "Endsong", duration: "10:22" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-3",
    slug: "definitely-maybe-30th-anniversary",
    name: "Definitely Maybe (30th Anniversary)",
    artist: "Oasis",
    price: 3999,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Britpop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1544785349-c4a5301826fd?w=600&h=600&fit=crop",
        alt: "Definitely Maybe 30th Anniversary by Oasis Vinyl",
      },
    ],
    description:
      "Deluxe 30th anniversary reissue of Oasis's legendary debut album. Remastered from original tapes with bonus tracks including demos and B-sides. Double LP gatefold with extensive liner notes.",
    tracklist: [
      { number: 1, title: "Rock 'n' Roll Star", duration: "5:22" },
      { number: 2, title: "Shakermaker", duration: "5:08" },
      { number: 3, title: "Live Forever", duration: "4:36" },
      { number: 4, title: "Up in the Sky", duration: "4:28" },
      { number: 5, title: "Columbia", duration: "6:17" },
      { number: 6, title: "Supersonic", duration: "4:43" },
      { number: 7, title: "Bring It On Down", duration: "4:15" },
      { number: 8, title: "Cigarettes & Alcohol", duration: "4:48" },
      { number: 9, title: "Digsy's Dinner", duration: "2:36" },
      { number: 10, title: "Slide Away", duration: "6:30" },
      { number: 11, title: "Married with Children", duration: "3:13" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-4",
    slug: "rumours",
    name: "Rumours",
    artist: "Fleetwood Mac",
    price: 2999,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
        alt: "Rumours by Fleetwood Mac Vinyl",
      },
    ],
    description:
      "One of the best-selling albums of all time, 'Rumours' remains a timeless classic. This remastered pressing delivers the full emotional weight of tracks like 'Go Your Own Way', 'Dreams', and 'The Chain'. 180g vinyl pressing.",
    tracklist: [
      { number: 1, title: "Second Hand News", duration: "2:56" },
      { number: 2, title: "Dreams", duration: "4:14" },
      { number: 3, title: "Never Going Back Again", duration: "2:14" },
      { number: 4, title: "Don't Stop", duration: "3:13" },
      { number: 5, title: "Go Your Own Way", duration: "3:38" },
      { number: 6, title: "Songbird", duration: "3:20" },
      { number: 7, title: "The Chain", duration: "4:30" },
      { number: 8, title: "You Make Loving Fun", duration: "3:31" },
      { number: 9, title: "I Don't Want to Know", duration: "3:15" },
      { number: 10, title: "Oh Daddy", duration: "3:56" },
      { number: 11, title: "Gold Dust Woman", duration: "4:56" },
    ],
    releaseYear: 1977,
    inStock: true,
    featured: false,
  },
  {
    id: "vinyl-5",
    slug: "gnx",
    name: "GNX",
    artist: "Kendrick Lamar",
    price: 3199,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Hip-Hop", "Rap"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=600&h=600&fit=crop",
        alt: "GNX by Kendrick Lamar Vinyl",
      },
    ],
    description:
      "Kendrick Lamar's surprise-released sixth studio album. A raw, powerful statement featuring production from Jack Antonoff and others. Following the success of 'Not Like Us', this album cements Lamar's status as hip-hop's greatest. Double LP pressing.",
    tracklist: [
      { number: 1, title: "wacced out murals", duration: "5:46" },
      { number: 2, title: "squabble up", duration: "2:37" },
      { number: 3, title: "luther (with SZA)", duration: "2:57" },
      { number: 4, title: "man at the garden", duration: "3:20" },
      { number: 5, title: "hey now (with Dody6)", duration: "3:42" },
      { number: 6, title: "reincarnated", duration: "3:52" },
      { number: 7, title: "tv off (with Lefty Gunplay)", duration: "4:08" },
      { number: 8, title: "dodger blue (with Wallie the Sensei, Silas & Roddy Ricch)", duration: "3:55" },
      { number: 9, title: "peekaboo (with AzChike)", duration: "3:33" },
      { number: 10, title: "heart pt. 6", duration: "5:12" },
      { number: 11, title: "gnx", duration: "3:29" },
      { number: 12, title: "gloria (with SZA & Dody6)", duration: "4:03" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },

  // DVDs
  {
    id: "dvd-1",
    slug: "the-eras-tour",
    name: "The Eras Tour",
    artist: "Taylor Swift",
    price: 2499,
    category: "dvds",
    format: "DVD",
    genre: ["Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
        alt: "Taylor Swift: The Eras Tour DVD",
      },
    ],
    description:
      "The concert film of Taylor Swift's record-breaking Eras Tour. Captured across multiple nights at SoFi Stadium, experience the full spectacle of Swift's career-spanning setlist in stunning quality.",
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "dvd-2",
    slug: "renaissance-a-film",
    name: "Renaissance: A Film",
    artist: "Beyoncé",
    price: 2299,
    category: "dvds",
    format: "DVD",
    genre: ["R&B", "Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop",
        alt: "Beyoncé: Renaissance A Film DVD",
      },
    ],
    description:
      "Beyoncé's Renaissance World Tour captured in this stunning concert film. Directed by Beyoncé herself, the film showcases the groundbreaking stage production and celebrates the legacy of Black and queer dance music.",
    releaseYear: 2023,
    inStock: true,
    featured: true,
  },
  {
    id: "dvd-3",
    slug: "stop-making-sense-4k",
    name: "Stop Making Sense (4K Restoration)",
    artist: "Talking Heads",
    price: 2199,
    category: "dvds",
    format: "DVD",
    genre: ["New Wave", "Rock"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop",
        alt: "Stop Making Sense 4K Restoration DVD",
      },
    ],
    description:
      "The definitive 4K restoration of Jonathan Demme's legendary 1984 concert film. Widely regarded as the greatest concert movie ever made, now looking and sounding better than ever.",
    releaseYear: 2024,
    inStock: true,
    featured: false,
  },
  {
    id: "dvd-4",
    slug: "shut-up-and-play-the-hits",
    name: "Shut Up and Play the Hits",
    artist: "LCD Soundsystem",
    price: 1999,
    category: "dvds",
    format: "DVD",
    genre: ["Electronic", "Dance-Punk"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1598517834890-67c09fa98b4e?w=600&h=600&fit=crop",
        alt: "Shut Up and Play the Hits DVD",
      },
    ],
    description:
      "Documentary capturing LCD Soundsystem's epic final concert at Madison Square Garden in 2011. Features the full performance intercut with interviews with James Murphy.",
    releaseYear: 2012,
    inStock: true,
    featured: false,
  },
  {
    id: "dvd-5",
    slug: "oasis-knebworth-1996",
    name: "Oasis Knebworth 1996",
    artist: "Oasis",
    price: 2099,
    category: "dvds",
    format: "DVD",
    genre: ["Rock", "Britpop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
        alt: "Oasis Knebworth 1996 DVD",
      },
    ],
    description:
      "The legendary Knebworth concerts of August 1996, where Oasis played to 250,000 fans over two nights. This documentary features the complete performances, behind-the-scenes footage, and interviews with fans who were there.",
    releaseYear: 2021,
    inStock: true,
    featured: true,
  },
];

export function getProductBySlug(
  category: string,
  slug: string
): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByGenre(genre: string): Product[] {
  return products.filter((p) =>
    p.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.artist.toLowerCase().includes(lowerQuery) ||
      p.genre.some((g) => g.toLowerCase().includes(lowerQuery))
  );
}
