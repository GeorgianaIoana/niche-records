import type { Product } from "@/types";

export const products: Product[] = [
  // Vinyls
  {
    id: "vinyl-1",
    slug: "rumours",
    name: "Rumours",
    artist: "Fleetwood Mac",
    price: 8900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Pop"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258495709489_85quality_Fleetwood_Mac_Vinyl_Rumours_LP.webp",
        alt: "Fleetwood Mac Rumours Vinyl",
      },
    ],
    description:
      "One of the best-selling albums of all time. Features iconic tracks 'Go Your Own Way', 'Dreams', 'The Chain', and 'Don't Stop'.",
    tracklist: [
      { number: 1, title: "Second Hand News", duration: "2:56" },
      { number: 2, title: "Dreams", duration: "4:14" },
      { number: 3, title: "Never Going Back Again", duration: "2:14" },
      { number: 4, title: "Don't Stop", duration: "3:13" },
      { number: 5, title: "Go Your Own Way", duration: "3:43" },
      { number: 6, title: "Songbird", duration: "3:20" },
      { number: 7, title: "The Chain", duration: "4:30" },
      { number: 8, title: "You Make Loving Fun", duration: "3:31" },
    ],
    releaseYear: 1977,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-2",
    slug: "igor",
    name: "IGOR",
    artist: "Tyler, The Creator",
    price: 9900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Hip-Hop", "R&B", "Neo-Soul"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp",
        alt: "Tyler The Creator IGOR Vinyl",
      },
    ],
    description:
      "Grammy Award-winning album exploring heartbreak and identity. Features 'EARFQUAKE', 'NEW MAGIC WAND', and 'A BOY IS A GUN*'.",
    tracklist: [
      { number: 1, title: "IGOR'S THEME", duration: "4:00" },
      { number: 2, title: "EARFQUAKE", duration: "3:10" },
      { number: 3, title: "I THINK", duration: "3:35" },
      { number: 4, title: "EXACTLY WHAT YOU RUN FROM YOU END UP CHASING", duration: "0:47" },
      { number: 5, title: "RUNNING OUT OF TIME", duration: "2:58" },
      { number: 6, title: "NEW MAGIC WAND", duration: "3:15" },
      { number: 7, title: "A BOY IS A GUN*", duration: "3:46" },
      { number: 8, title: "PUPPET", duration: "3:00" },
    ],
    releaseYear: 2019,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-3",
    slug: "am-180gram",
    name: "AM [180-gram]",
    artist: "Arctic Monkeys",
    price: 7900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Indie"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258500198705_85quality_arctic-monkeys-am-lp_1024x1024_b88bbb6b-9eec-460b-80bb-a00687dfa348.webp",
        alt: "Arctic Monkeys AM Vinyl",
      },
    ],
    description:
      "The critically acclaimed fifth album. Features 'Do I Wanna Know?', 'R U Mine?', and 'Why'd You Only Call Me When You're High?'.",
    tracklist: [
      { number: 1, title: "Do I Wanna Know?", duration: "4:32" },
      { number: 2, title: "R U Mine?", duration: "3:21" },
      { number: 3, title: "One for the Road", duration: "3:26" },
      { number: 4, title: "Arabella", duration: "3:27" },
      { number: 5, title: "I Want It All", duration: "3:04" },
      { number: 6, title: "No. 1 Party Anthem", duration: "4:03" },
      { number: 7, title: "Mad Sounds", duration: "3:35" },
      { number: 8, title: "Fireside", duration: "3:01" },
      { number: 9, title: "Why'd You Only Call Me When You're High?", duration: "2:41" },
      { number: 10, title: "Snap Out of It", duration: "3:16" },
      { number: 11, title: "Knee Socks", duration: "4:18" },
      { number: 12, title: "I Wanna Be Yours", duration: "3:04" },
    ],
    releaseYear: 2013,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-4",
    slug: "riot-silver",
    name: "Riot! (25th Anniversary) [Silver]",
    artist: "Paramore",
    price: 10900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Pop Punk", "Alternative"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp",
        alt: "Paramore Riot Vinyl",
      },
    ],
    description:
      "FBR's 25th Anniversary silver vinyl edition. Features 'Misery Business', 'crushcrushcrush', and 'That's What You Get'.",
    tracklist: [
      { number: 1, title: "For a Pessimist, I'm Pretty Optimistic", duration: "3:41" },
      { number: 2, title: "That's What You Get", duration: "3:40" },
      { number: 3, title: "Hallelujah", duration: "3:24" },
      { number: 4, title: "Misery Business", duration: "3:31" },
      { number: 5, title: "When It Rains", duration: "3:36" },
      { number: 6, title: "Let the Flames Begin", duration: "3:22" },
      { number: 7, title: "Miracle", duration: "3:27" },
      { number: 8, title: "crushcrushcrush", duration: "3:10" },
      { number: 9, title: "We Are Broken", duration: "3:55" },
      { number: 10, title: "Fences", duration: "3:19" },
      { number: 11, title: "Born for This", duration: "3:57" },
    ],
    releaseYear: 2007,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-5",
    slug: "ctrl-green-2lp",
    name: "CTRL [Green 2LP]",
    artist: "SZA",
    price: 11900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["R&B", "Neo-Soul", "Pop"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp",
        alt: "SZA CTRL Vinyl",
      },
    ],
    description:
      "Limited green vinyl pressing of SZA's groundbreaking debut. Features 'Love Galore', 'The Weekend', and 'Broken Clocks'.",
    tracklist: [
      { number: 1, title: "Supermodel", duration: "3:24" },
      { number: 2, title: "Love Galore", duration: "5:20" },
      { number: 3, title: "Doves in the Wind", duration: "4:33" },
      { number: 4, title: "Drew Barrymore", duration: "3:54" },
      { number: 5, title: "Prom", duration: "3:45" },
      { number: 6, title: "The Weekend", duration: "3:38" },
      { number: 7, title: "Go Gina", duration: "2:28" },
      { number: 8, title: "Garden (Say It Like Dat)", duration: "4:26" },
      { number: 9, title: "Broken Clocks", duration: "4:02" },
      { number: 10, title: "Anything", duration: "3:20" },
      { number: 11, title: "Normal Girl", duration: "2:55" },
      { number: 12, title: "Pretty Little Birds", duration: "4:18" },
      { number: 13, title: "20 Something", duration: "4:37" },
    ],
    releaseYear: 2017,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-6",
    slug: "folklore-beige-2lp",
    name: "folklore [2LP Beige]",
    artist: "Taylor Swift",
    price: 12900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Pop", "Indie", "Folk"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/477929-Product-0-I-637317959467683009_grande_a6f82db0-1cb7-45c5-8892-ed79af261e80.webp",
        alt: "Taylor Swift folklore Vinyl",
      },
    ],
    description:
      "Limited beige vinyl pressing of Taylor Swift's intimate indie folk masterpiece. Features 'cardigan', 'exile', and 'august'.",
    tracklist: [
      { number: 1, title: "the 1", duration: "3:30" },
      { number: 2, title: "cardigan", duration: "3:59" },
      { number: 3, title: "the last great american dynasty", duration: "3:51" },
      { number: 4, title: "exile (feat. Bon Iver)", duration: "4:45" },
      { number: 5, title: "my tears ricochet", duration: "4:15" },
      { number: 6, title: "mirrorball", duration: "3:29" },
      { number: 7, title: "seven", duration: "3:28" },
      { number: 8, title: "august", duration: "4:21" },
      { number: 9, title: "this is me trying", duration: "3:15" },
      { number: 10, title: "betty", duration: "4:54" },
    ],
    releaseYear: 2020,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-7",
    slug: "sos-2lp",
    name: "SOS [2LP]",
    artist: "SZA",
    price: 11900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["R&B", "Pop", "Hip-Hop"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8446355833137_85quality_sza_sos_vinyl.webp",
        alt: "SZA SOS Vinyl",
      },
    ],
    description:
      "SZA's sophomore album on double LP. Features 'Kill Bill', 'Shirt', 'Good Days', and collaborations with Travis Scott and Don Toliver.",
    tracklist: [
      { number: 1, title: "SOS", duration: "1:34" },
      { number: 2, title: "Kill Bill", duration: "2:33" },
      { number: 3, title: "Seek & Destroy", duration: "3:14" },
      { number: 4, title: "Low", duration: "3:52" },
      { number: 5, title: "Love Language", duration: "3:25" },
      { number: 6, title: "Blind", duration: "2:29" },
      { number: 7, title: "Used", duration: "3:45" },
      { number: 8, title: "Snooze", duration: "3:21" },
      { number: 9, title: "Notice Me", duration: "2:57" },
      { number: 10, title: "Gone Girl", duration: "3:23" },
    ],
    releaseYear: 2022,
    inStock: true,
    featured: false,
  },
  {
    id: "vinyl-8",
    slug: "ten-pearl-jam",
    name: "Ten",
    artist: "Pearl Jam",
    price: 7500,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Grunge", "Rock", "Alternative"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258508783921_85quality_Pearl_jam_vinyl_ten_LP.webp",
        alt: "Pearl Jam Ten Vinyl",
      },
    ],
    description:
      "The debut album that defined the grunge era. Features timeless tracks like 'Alive', 'Jeremy', and 'Even Flow'.",
    tracklist: [
      { number: 1, title: "Once", duration: "3:51" },
      { number: 2, title: "Even Flow", duration: "4:53" },
      { number: 3, title: "Alive", duration: "5:40" },
      { number: 4, title: "Why Go", duration: "3:19" },
      { number: 5, title: "Black", duration: "5:43" },
      { number: 6, title: "Jeremy", duration: "5:18" },
      { number: 7, title: "Oceans", duration: "2:41" },
      { number: 8, title: "Porch", duration: "3:30" },
      { number: 9, title: "Garden", duration: "4:58" },
      { number: 10, title: "Deep", duration: "4:18" },
      { number: 11, title: "Release", duration: "9:05" },
    ],
    releaseYear: 1991,
    inStock: true,
    featured: true,
  },
  {
    id: "vinyl-9",
    slug: "led-zeppelin-iv-clear",
    name: "Led Zeppelin IV (ATL75 Edition) [Clear]",
    artist: "Led Zeppelin",
    price: 9900,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Rock", "Classic Rock"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/4251062-3047062.jpg",
        alt: "Led Zeppelin IV Vinyl",
      },
    ],
    description:
      "ATL75 Anniversary Edition on clear vinyl. One of the best-selling albums featuring 'Stairway to Heaven', 'Black Dog', and 'Rock and Roll'.",
    tracklist: [
      { number: 1, title: "Black Dog", duration: "4:54" },
      { number: 2, title: "Rock and Roll", duration: "3:40" },
      { number: 3, title: "The Battle of Evermore", duration: "5:51" },
      { number: 4, title: "Stairway to Heaven", duration: "8:02" },
      { number: 5, title: "Misty Mountain Hop", duration: "4:38" },
      { number: 6, title: "Four Sticks", duration: "4:44" },
      { number: 7, title: "Going to California", duration: "3:31" },
      { number: 8, title: "When the Levee Breaks", duration: "7:07" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: false,
  },
  {
    id: "vinyl-10",
    slug: "legend-50th-anniversary",
    name: "LEGEND (50th Anniversary)",
    artist: "Bob Marley",
    price: 8500,
    category: "vinyls",
    format: "Vinyl",
    genre: ["Reggae"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/8258495807793_85quality_Bob_Marley_Legend_50th_Anniversary_Edition_Vinyl.webp",
        alt: "Bob Marley Legend Vinyl",
      },
    ],
    description:
      "50th Anniversary Edition of the best-selling reggae album of all time. Features 'No Woman, No Cry', 'One Love', and 'Redemption Song'.",
    tracklist: [
      { number: 1, title: "Is This Love", duration: "3:50" },
      { number: 2, title: "No Woman, No Cry", duration: "7:08" },
      { number: 3, title: "Could You Be Loved", duration: "3:57" },
      { number: 4, title: "Three Little Birds", duration: "3:00" },
      { number: 5, title: "Buffalo Soldier", duration: "4:16" },
      { number: 6, title: "Get Up, Stand Up", duration: "3:14" },
      { number: 7, title: "Stir It Up", duration: "5:32" },
      { number: 8, title: "One Love/People Get Ready", duration: "2:50" },
      { number: 9, title: "I Shot the Sheriff", duration: "4:39" },
      { number: 10, title: "Waiting in Vain", duration: "4:15" },
      { number: 11, title: "Redemption Song", duration: "3:45" },
      { number: 12, title: "Satisfy My Soul", duration: "4:32" },
      { number: 13, title: "Exodus", duration: "7:35" },
      { number: 14, title: "Jamming", duration: "3:31" },
    ],
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },

  // CDs
  {
    id: "cd-1",
    slug: "channel-orange",
    name: "Channel Orange (Japan Import)",
    artist: "Frank Ocean",
    price: 4500,
    category: "cds",
    format: "CD",
    genre: ["R&B", "Soul", "Pop"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/Frank_Ocean_-_Channel_Orange_Japan_Import_Edition.jpg",
        alt: "Frank Ocean Channel Orange CD",
      },
    ],
    description:
      "Japan Import Edition of Frank Ocean's critically acclaimed debut. Features 'Thinkin Bout You', 'Pyramids', and 'Super Rich Kids'.",
    tracklist: [
      { number: 1, title: "Start", duration: "0:46" },
      { number: 2, title: "Thinkin Bout You", duration: "3:21" },
      { number: 3, title: "Fertilizer", duration: "0:40" },
      { number: 4, title: "Sierra Leone", duration: "2:28" },
      { number: 5, title: "Sweet Life", duration: "4:23" },
      { number: 6, title: "Super Rich Kids", duration: "5:04" },
      { number: 7, title: "Pilot Jones", duration: "3:04" },
      { number: 8, title: "Crack Rock", duration: "3:44" },
      { number: 9, title: "Pyramids", duration: "9:52" },
      { number: 10, title: "Lost", duration: "3:54" },
      { number: 11, title: "White", duration: "1:16" },
      { number: 12, title: "Monks", duration: "3:19" },
      { number: 13, title: "Bad Religion", duration: "2:55" },
      { number: 14, title: "Pink Matter", duration: "4:28" },
      { number: 15, title: "Forrest Gump", duration: "3:15" },
      { number: 16, title: "End", duration: "1:49" },
    ],
    releaseYear: 2012,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-2",
    slug: "unplugged-alice-in-chains",
    name: "Unplugged",
    artist: "Alice in Chains",
    price: 3500,
    category: "cds",
    format: "CD",
    genre: ["Grunge", "Rock", "Alternative"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/1993887.jpg",
        alt: "Alice in Chains Unplugged CD",
      },
    ],
    description:
      "The legendary MTV Unplugged performance. A haunting acoustic set featuring 'Nutshell', 'Down in a Hole', and 'Would?'.",
    tracklist: [
      { number: 1, title: "Nutshell", duration: "4:57" },
      { number: 2, title: "Brother", duration: "4:28" },
      { number: 3, title: "No Excuses", duration: "4:22" },
      { number: 4, title: "Sludge Factory", duration: "7:08" },
      { number: 5, title: "Down in a Hole", duration: "5:37" },
      { number: 6, title: "Angry Chair", duration: "4:48" },
      { number: 7, title: "Rooster", duration: "7:19" },
      { number: 8, title: "Got Me Wrong", duration: "4:16" },
      { number: 9, title: "Heaven Beside You", duration: "5:35" },
      { number: 10, title: "Would?", duration: "4:08" },
      { number: 11, title: "Frogs", duration: "8:22" },
      { number: 12, title: "Over Now", duration: "6:21" },
      { number: 13, title: "Killer Is Me", duration: "3:43" },
    ],
    releaseYear: 1996,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-3",
    slug: "audioslave",
    name: "Audioslave",
    artist: "Audioslave",
    price: 2900,
    category: "cds",
    format: "CD",
    genre: ["Rock", "Alternative", "Hard Rock"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/Audioslave_-_Audioslave.jpg",
        alt: "Audioslave CD",
      },
    ],
    description:
      "The debut album from the supergroup featuring Chris Cornell and members of Rage Against the Machine. Features 'Cochise', 'Like a Stone', and 'Show Me How to Live'.",
    tracklist: [
      { number: 1, title: "Cochise", duration: "3:45" },
      { number: 2, title: "Show Me How to Live", duration: "4:50" },
      { number: 3, title: "Gasoline", duration: "4:18" },
      { number: 4, title: "What You Are", duration: "4:34" },
      { number: 5, title: "Like a Stone", duration: "4:53" },
      { number: 6, title: "Set It Off", duration: "4:41" },
      { number: 7, title: "Shadow on the Sun", duration: "5:35" },
      { number: 8, title: "I Am the Highway", duration: "5:39" },
      { number: 9, title: "Exploder", duration: "3:36" },
      { number: 10, title: "Hypnotize", duration: "3:30" },
      { number: 11, title: "Bring Em Back Alive", duration: "4:30" },
      { number: 12, title: "Light My Way", duration: "5:09" },
      { number: 13, title: "Getaway Car", duration: "4:20" },
      { number: 14, title: "The Last Remaining Light", duration: "5:44" },
    ],
    releaseYear: 2002,
    inStock: true,
    featured: false,
  },
  {
    id: "cd-4",
    slug: "cornell-5-8-77",
    name: "Cornell 5/8/77 [3CD]",
    artist: "Grateful Dead",
    price: 6900,
    category: "cds",
    format: "CD",
    genre: ["Rock", "Psychedelic", "Jam"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/GratefulDead-Cornell5877.png",
        alt: "Grateful Dead Cornell 5/8/77 CD",
      },
    ],
    description:
      "The legendary Barton Hall concert, widely considered the greatest Grateful Dead show ever. Triple CD set capturing the complete performance.",
    tracklist: [
      { number: 1, title: "New Minglewood Blues", duration: "6:02" },
      { number: 2, title: "Loser", duration: "7:30" },
      { number: 3, title: "El Paso", duration: "4:24" },
      { number: 4, title: "They Love Each Other", duration: "7:21" },
      { number: 5, title: "Jack Straw", duration: "5:18" },
      { number: 6, title: "Deal", duration: "5:22" },
      { number: 7, title: "Lazy Lightnin'", duration: "3:24" },
      { number: 8, title: "Supplication", duration: "4:47" },
      { number: 9, title: "Brown-Eyed Women", duration: "5:18" },
      { number: 10, title: "Mama Tried", duration: "3:01" },
    ],
    releaseYear: 2017,
    inStock: true,
    featured: true,
  },
  {
    id: "cd-5",
    slug: "all-time-greatest-hits",
    name: "All-Time Greatest Hits",
    artist: "Neil Diamond",
    price: 3900,
    category: "cds",
    format: "CD",
    genre: ["Pop", "Rock", "Folk"],
    images: [
      {
        url: "https://vinyl.com/cdn/shop/files/NeilDiamond-All-TimeGreatestHits.png",
        alt: "Neil Diamond All-Time Greatest Hits CD",
      },
    ],
    description:
      "The definitive collection featuring 'Sweet Caroline', 'Song Sung Blue', 'America', and 'Cracklin' Rosie'.",
    tracklist: [
      { number: 1, title: "Sweet Caroline", duration: "3:23" },
      { number: 2, title: "Song Sung Blue", duration: "3:15" },
      { number: 3, title: "Cracklin' Rosie", duration: "3:00" },
      { number: 4, title: "I Am... I Said", duration: "4:00" },
      { number: 5, title: "America", duration: "4:45" },
      { number: 6, title: "Holly Holy", duration: "4:28" },
      { number: 7, title: "Cherry, Cherry", duration: "3:04" },
      { number: 8, title: "Play Me", duration: "3:42" },
      { number: 9, title: "You Don't Bring Me Flowers", duration: "3:56" },
      { number: 10, title: "Love on the Rocks", duration: "4:00" },
    ],
    releaseYear: 2014,
    inStock: true,
    featured: true,
  },

  // DVDs
  {
    id: "dvd-1",
    slug: "stop-making-sense-4k",
    name: "Stop Making Sense (4K Restoration)",
    artist: "Talking Heads",
    price: 4900,
    category: "dvds",
    format: "DVD",
    genre: ["New Wave", "Rock"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
        alt: "Stop Making Sense 4K Restoration DVD",
      },
    ],
    description:
      "The definitive 4K restoration of Jonathan Demme's legendary 1984 concert film. Widely regarded as the greatest concert movie ever made.",
    releaseYear: 2024,
    inStock: true,
    featured: true,
  },
  {
    id: "dvd-2",
    slug: "the-last-waltz",
    name: "The Last Waltz (Collector's Edition)",
    artist: "The Band",
    price: 5500,
    category: "dvds",
    format: "DVD",
    genre: ["Rock", "Folk"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop",
        alt: "The Last Waltz DVD",
      },
    ],
    description:
      "Martin Scorsese's legendary documentary of The Band's farewell concert. Features Bob Dylan, Eric Clapton, Neil Young, Joni Mitchell, and more.",
    releaseYear: 2022,
    inStock: true,
    featured: true,
  },
  {
    id: "dvd-3",
    slug: "pulse",
    name: "Pulse",
    artist: "Pink Floyd",
    price: 5900,
    category: "dvds",
    format: "DVD",
    genre: ["Rock", "Progressive"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop",
        alt: "Pink Floyd Pulse DVD",
      },
    ],
    description:
      "Full concert film from Pink Floyd's Division Bell tour. Features the complete performance of Dark Side of the Moon plus visual spectacular.",
    releaseYear: 2006,
    inStock: true,
    featured: false,
  },
  {
    id: "dvd-4",
    slug: "live-at-pompeii",
    name: "Live at Pompeii (Director's Cut)",
    artist: "David Gilmour",
    price: 5500,
    category: "dvds",
    format: "DVD",
    genre: ["Rock", "Progressive"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1598517834890-67c09fa98b4e?w=600&h=600&fit=crop",
        alt: "David Gilmour Live at Pompeii DVD",
      },
    ],
    description:
      "David Gilmour returns to the ancient Roman amphitheatre in Pompeii for an unforgettable concert experience.",
    releaseYear: 2017,
    inStock: true,
    featured: true,
  },
  {
    id: "dvd-5",
    slug: "homecoming",
    name: "Homecoming: A Film by Beyonce",
    artist: "Beyonce",
    price: 4500,
    category: "dvds",
    format: "DVD",
    genre: ["R&B", "Pop"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
        alt: "Beyonce Homecoming DVD",
      },
    ],
    description:
      "Beyonce's groundbreaking Coachella performance captured in stunning detail. A celebration of Black culture, music, and history.",
    releaseYear: 2019,
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
