export type Mandapam = {
  slug: string;
  name: string;
  locality: string;
  city: string;
  capacityMin: number;
  capacityMax: number;
  priceFrom: number;       // INR per day, starting price
  priceLabel: string;      // pretty-printed, e.g. "₹85,000 – ₹2.5L per day"
  rating: number;          // 0–5
  reviews: number;
  features: string[];
  description: string;
  emoji: string;           // banner / tile emoji
  tint: string;            // Tailwind gradient classes for the banner
  phone: string;
  address: string;
};

export const MANDAPAMS: Mandapam[] = [
  {
    slug: 'sri-mahalakshmi',
    name: 'Sri Mahalakshmi Kalyana Mandapam',
    locality: 'Jayanagar',
    city: 'Bengaluru',
    capacityMin: 500,
    capacityMax: 1200,
    priceFrom: 85000,
    priceLabel: '₹85,000 – ₹2.5L per day',
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
    capacityMin: 300,
    capacityMax: 800,
    priceFrom: 60000,
    priceLabel: '₹60,000 – ₹1.8L per day',
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
    capacityMin: 250,
    capacityMax: 700,
    priceFrom: 95000,
    priceLabel: '₹95,000 – ₹3L per day',
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
    capacityMin: 800,
    capacityMax: 2000,
    priceFrom: 1500_00,
    priceLabel: '₹1.5L – ₹5L per day',
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
    capacityMin: 200,
    capacityMax: 600,
    priceFrom: 75000,
    priceLabel: '₹75,000 – ₹2L per day',
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
    capacityMin: 400,
    capacityMax: 1500,
    priceFrom: 2000_00,
    priceLabel: '₹2L – ₹6L per day',
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

export function getMandapam(slug: string): Mandapam | undefined {
  return MANDAPAMS.find((m) => m.slug === slug);
}
