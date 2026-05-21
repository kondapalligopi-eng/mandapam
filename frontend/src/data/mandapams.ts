import { KARNATAKA_DISTRICTS, CITY_LOCALITIES } from './karnataka';

export type Mandapam = {
  slug: string;
  name: string;
  locality: string;
  city: string;
  district: string;
  taluk: string;
  capacityMin: number;
  capacityMax: number;
  priceFrom: number;       // INR per day, starting price
  priceLabel: string;      // pretty-printed, e.g. "₹85,000 – ₹2.5L per day"
  perPlateVeg: number;     // INR per veg plate, starting
  promotion?: number;      // optional discount % for "Deals"
  rating: number;          // 0–5
  reviews: number;
  features: string[];
  description: string;
  emoji: string;           // banner / tile emoji
  tint: string;            // Tailwind gradient classes for the banner
  phone: string;
  address: string;
};

// Hand-written flagship venues (richer detail).
const CURATED: Mandapam[] = [
  {
    slug: 'sri-mahalakshmi',
    name: 'Sri Mahalakshmi Kalyana Mandapam',
    locality: 'Jayanagar',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru South',
    capacityMin: 500,
    capacityMax: 1200,
    priceFrom: 85000,
    priceLabel: '₹85,000 – ₹2.5L per day',
    perPlateVeg: 850,
    promotion: 10,
    rating: 4.7,
    reviews: 312,
    features: [
      'Centralised A/C',
      'Bride & Groom rooms',
      'Vegetarian catering on-site',
      'Pooja altar & homam pit',
      'Parking for 200+ cars',
    ],
    description:
      'A landmark hall in the heart of Jayanagar with classical Karnataka-style architecture, an in-house catering team, and seating for up to 1,200 guests. Open courtyard for evening receptions.',
    emoji: '🕌',
    tint: 'from-maroon-700 to-maroon-500',
    phone: '+91 80 2654 1100',
    address: '11th Main, 4th Block, Jayanagar, Bengaluru 560011',
  },
  {
    slug: 'shri-rajalakshmi',
    name: 'Shri Rajalakshmi Convention Hall',
    locality: 'Malleshwaram',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru North',
    capacityMin: 300,
    capacityMax: 800,
    priceFrom: 60000,
    priceLabel: '₹60,000 – ₹1.8L per day',
    perPlateVeg: 700,
    rating: 4.5,
    reviews: 198,
    features: [
      'A/C banquet hall',
      'Stage & decoration package',
      'Veg + Jain catering',
      'Mehndi / Sangeet lounge',
      'Valet parking',
    ],
    description:
      'A two-floor convention hall with a stately marble lobby and a separate first-floor lounge perfect for mehndi or sangeet evenings. Trusted by Malleshwaram families for two generations.',
    emoji: '🎊',
    tint: 'from-maroon-600 to-gold-500',
    phone: '+91 80 2334 7800',
    address: '8th Cross, Sampige Road, Malleshwaram, Bengaluru 560003',
  },
  {
    slug: 'mantapa-gardens',
    name: 'Mantapa Gardens',
    locality: 'Whitefield',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru East',
    capacityMin: 250,
    capacityMax: 700,
    priceFrom: 95000,
    priceLabel: '₹95,000 – ₹3L per day',
    perPlateVeg: 1100,
    rating: 4.8,
    reviews: 156,
    features: [
      'Open-air lawn + covered pavilion',
      'Designer mandap setup',
      'Multi-cuisine catering',
      'Bridal suite with makeup room',
      'Drone & still photography permits',
    ],
    description:
      'A boutique open-air venue on Whitefield Main Road with manicured lawns, fairy-light pavilions, and an indoor backup hall. Best suited for daytime muhurthams and pastel-themed receptions.',
    emoji: '🌸',
    tint: 'from-rose-500 to-gold-400',
    phone: '+91 80 4133 9090',
    address: 'ITPL Main Rd, near Phoenix Marketcity, Whitefield, Bengaluru 560066',
  },
  {
    slug: 'lalbagh-grand',
    name: 'Lalbagh Grand Kalyana Mantapa',
    locality: 'Basavanagudi',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru South',
    capacityMin: 800,
    capacityMax: 2000,
    priceFrom: 1500_00,
    priceLabel: '₹1.5L – ₹5L per day',
    perPlateVeg: 950,
    promotion: 5,
    rating: 4.6,
    reviews: 421,
    features: [
      'Two adjoining halls (split or combined)',
      'Industrial kitchen & catering crew',
      'Vedic priests on call',
      'A/V & lighting included',
      '300+ car basement parking',
    ],
    description:
      'A flagship hall used for high-footfall weddings and engagements. Splittable into two 1,000-seat halls or opened up to a 2,000-guest banquet floor with double-height ceilings.',
    emoji: '🛕',
    tint: 'from-maroon-800 to-maroon-600',
    phone: '+91 80 2660 1234',
    address: 'Bull Temple Rd, Basavanagudi, Bengaluru 560004',
  },
  {
    slug: 'green-meadows',
    name: 'Green Meadows Wedding Lawns',
    locality: 'Sarjapur Road',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Anekal',
    capacityMin: 200,
    capacityMax: 600,
    priceFrom: 75000,
    priceLabel: '₹75,000 – ₹2L per day',
    perPlateVeg: 800,
    rating: 4.4,
    reviews: 102,
    features: [
      'Lawn + tented dining hall',
      'Bonfire / sangeet stage',
      'Open kitchen for live counters',
      'Cottage suites for the couple',
      'Pet-friendly venue',
    ],
    description:
      'A relaxed lawn-style venue ideal for boutique weddings of 300–500 guests. Two cottage suites on-site let the bride and groom stay overnight before and after the ceremony.',
    emoji: '🌿',
    tint: 'from-emerald-700 to-gold-500',
    phone: '+91 80 4499 1212',
    address: 'Sarjapur Main Rd, near Wipro Gate, Bengaluru 560035',
  },
  {
    slug: 'palace-banquet',
    name: 'Palace Banquet & Convention',
    locality: 'Sadashivanagar',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru North',
    capacityMin: 400,
    capacityMax: 1500,
    priceFrom: 2000_00,
    priceLabel: '₹2L – ₹6L per day',
    perPlateVeg: 1800,
    promotion: 5,
    rating: 4.9,
    reviews: 87,
    features: [
      'Luxury banquet hall',
      'Chandelier-lit ceilings',
      'In-house designer décor team',
      'Concierge service for guests',
      'Helipad nearby',
    ],
    description:
      'A premium banquet for high-profile and destination weddings — gold-leaf interiors, chandeliers, and a concierge team that handles every guest from arrival to departure.',
    emoji: '👑',
    tint: 'from-maroon-900 to-gold-600',
    phone: '+91 80 2345 5566',
    address: 'Sankey Rd, Sadashivanagar, Bengaluru 560080',
  },
];

// ── Generated venues ─────────────────────────────────────────────────────
// A few sample mandapams per district (spread across its taluks) so browsing
// any district surfaces venues in and around that place. Deterministic, so
// names/prices/ratings stay stable across reloads and SSG builds.
const kebab = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// One template per venue type so every "Type" filter has matching venues.
const NAME_TEMPLATES = [
  'Sri {deity} Kalyana Mantapa', // Mandapam
  'Hotel {place} Grand',         // Hotel
  '{place} Farmhouse & Lawns',   // Farmhouse
  '{place} Garden Court',        // Marriage Garden
  '{deity} Resort',              // Resort
  '{deity} Palace',              // Palace/Fort
  '{place} Banquets',            // Banquet
  '{place} Community Hall',      // Marriage or Community Halls
  '{place} Open Lawns',          // Lawn
];
const PLATE_TIERS = [450, 650, 850, 1100, 1400, 1800, 2200, 2800];
const DEITIES = ['Lakshmi', 'Venkateshwara', 'Rama', 'Krishna', 'Shiva', 'Ganesha', 'Durga', 'Saraswathi', 'Anjaneya', 'Basaveshwara'];
const EMOJIS = ['🛕', '🕌', '🎊', '🌸', '🌿', '👑', '💒', '🏛️'];
const TINTS = [
  'from-maroon-700 to-maroon-500',
  'from-maroon-600 to-gold-500',
  'from-rose-500 to-gold-400',
  'from-maroon-800 to-maroon-600',
  'from-emerald-700 to-gold-500',
  'from-orange-500 to-gold-400',
  'from-fuchsia-600 to-rose-400',
  'from-maroon-900 to-gold-600',
];
const FEATURES_POOL = [
  'A/C banquet hall',
  'Bride & groom rooms',
  'Vegetarian catering on-site',
  'Pooja altar & homam pit',
  'Ample car parking',
  'Stage & decoration package',
  'Open lawn area',
  'Generator backup',
  'Valet parking',
  'In-house dining hall',
];
const PRICE_TIERS = [
  { from: 40000, label: '₹40,000 – ₹1.2L per day' },
  { from: 60000, label: '₹60,000 – ₹1.8L per day' },
  { from: 85000, label: '₹85,000 – ₹2.5L per day' },
  { from: 120000, label: '₹1.2L – ₹3.5L per day' },
];
const CAP_TIERS = [
  { min: 150, max: 400 },
  { min: 250, max: 700 },
  { min: 400, max: 1000 },
  { min: 500, max: 1500 },
];

const GENERATED: Mandapam[] = (() => {
  const out: Mandapam[] = [];
  let id = 7; // continue past the curated venues
  for (const { district, taluks } of KARNATAKA_DISTRICTS) {
    const cityLocs = CITY_LOCALITIES[district]; // city areas, if any
    // Generate ~2 venues for every locality/town so each one has venues.
    const locs = cityLocs ?? taluks;
    locs.forEach((loc, j) => {
      const taluk = cityLocs ? taluks[j % taluks.length] : loc; // rural: town == locality
      for (let n = 0; n < 2; n += 1) {
        id += 1;
        const deity = DEITIES[id % DEITIES.length];
        const name = NAME_TEMPLATES[id % NAME_TEMPLATES.length]
          .replace('{deity}', deity)
          .replace('{place}', loc);
        const tier = id % 4;
        const perPlateVeg = PLATE_TIERS[id % PLATE_TIERS.length];
        const promotion = id % 8 === 0 ? 10 : id % 4 === 0 ? 5 : undefined;
        const cap = CAP_TIERS[tier];
        const price = PRICE_TIERS[tier];
        const start = id % FEATURES_POOL.length;
        const features = Array.from({ length: 4 }, (_, k) => FEATURES_POOL[(start + k) % FEATURES_POOL.length]);
        out.push({
          slug: `${kebab(district)}-${kebab(loc)}-${id}`,
          name,
          locality: loc,
          city: cityLocs ? loc : taluk,
          district,
          taluk,
          capacityMin: cap.min,
          capacityMax: cap.max,
          priceFrom: price.from,
          priceLabel: price.label,
          perPlateVeg,
          promotion,
          rating: Math.round((4.2 + ((id * 3) % 7) / 10) * 10) / 10,
          reviews: 30 + (id * 17) % 280,
          features,
          description: `A well-appointed kalyana mantapa in ${loc}, ${district} district — a popular choice for weddings and receptions in and around ${loc}.`,
          emoji: EMOJIS[id % EMOJIS.length],
          tint: TINTS[id % TINTS.length],
          phone: `+91 9${String(400000000 + (id * 1234567) % 599999999).padStart(9, '0')}`,
          address: `${loc}, ${district}, Karnataka`,
        });
      }
    });
  }
  return out;
})();

export const MANDAPAMS: Mandapam[] = [...CURATED, ...GENERATED];

export function getMandapam(slug: string): Mandapam | undefined {
  return MANDAPAMS.find((m) => m.slug === slug);
}
