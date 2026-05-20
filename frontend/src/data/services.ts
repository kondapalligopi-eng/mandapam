// Wedding-service vendor listings across Karnataka, grouped by category.
// Sample data — swap for real vendors when available.

const photo = (keywords: string, lock: number, w = 480, h = 360) =>
  `https://loremflickr.com/${w}/${h}/${keywords}?lock=${lock}`;

// Shared city filter row (Karnataka) — reused by every service category.
export const SERVICE_CITIES: { name: string; img: string }[] = [
  { name: 'Bengaluru', img: photo('bangalore,india', 41, 200, 200) },
  { name: 'Mysuru', img: photo('mysore,palace', 42, 200, 200) },
  { name: 'Mangaluru', img: photo('mangalore,beach', 43, 200, 200) },
  { name: 'Hubballi', img: photo('hubli,city', 44, 200, 200) },
  { name: 'Belagavi', img: photo('belgaum,fort', 45, 200, 200) },
  { name: 'Shivamogga', img: photo('shimoga,waterfall', 46, 200, 200) },
  { name: 'Udupi', img: photo('udupi,temple', 47, 200, 200) },
  { name: 'Davanagere', img: photo('karnataka,town', 48, 200, 200) },
  { name: 'Kalaburagi', img: photo('gulbarga,fort', 49, 200, 200) },
  { name: 'Hampi', img: photo('hampi,ruins', 50, 200, 200) },
];

export type Vendor = {
  name: string;
  city: string;
  specialty: string;
  rating: number;
  reviews: number;
  priceLabel: string;
  img: string;
  handpicked?: boolean;
};

export type ServiceConfig = {
  slug: string;
  title: string;
  kicker: string;
  unit: string; // plural noun for the result count, e.g. "artists"
  emoji: string;
  searchPlaceholder: string;
  vendors: Vendor[];
};

export const SERVICES: Record<string, ServiceConfig> = {
  photographers: {
    slug: 'photographers',
    title: 'Wedding Photographers',
    kicker: 'Across Karnataka',
    unit: 'studios',
    emoji: '📷',
    searchPlaceholder: 'Search studios, cities, styles…',
    vendors: [
      { name: 'Lensa Wedding Co.', city: 'Bengaluru', specialty: 'Candid & cinematic films', rating: 4.8, reviews: 312, priceLabel: '₹45,000 – ₹1.5L', img: photo('couple,wedding', 61), handpicked: true },
      { name: 'Kshana Studios', city: 'Mysuru', specialty: 'Traditional & candid', rating: 4.7, reviews: 221, priceLabel: '₹35,000 – ₹1.2L', img: photo('indian,wedding', 62), handpicked: true },
      { name: 'Coastal Frames', city: 'Mangaluru', specialty: 'Beach & destination', rating: 4.6, reviews: 158, priceLabel: '₹40,000 – ₹1L', img: photo('beach,couple', 63), handpicked: true },
      { name: 'Namma Clicks', city: 'Bengaluru', specialty: 'Candid storytelling', rating: 4.5, reviews: 142, priceLabel: '₹30,000 – ₹90,000', img: photo('wedding,photography', 64) },
      { name: 'Malnad Memories', city: 'Shivamogga', specialty: 'Outdoor & nature shoots', rating: 4.6, reviews: 98, priceLabel: '₹28,000 – ₹85,000', img: photo('couple,nature', 65) },
      { name: 'Krishna Lens', city: 'Udupi', specialty: 'Temple weddings', rating: 4.7, reviews: 176, priceLabel: '₹38,000 – ₹1.1L', img: photo('temple,wedding', 66) },
      { name: 'Heritage Shutters', city: 'Belagavi', specialty: 'Traditional portraiture', rating: 4.5, reviews: 87, priceLabel: '₹32,000 – ₹95,000', img: photo('bride,portrait', 67) },
      { name: 'Benne Films', city: 'Davanagere', specialty: 'Cinematic wedding films', rating: 4.4, reviews: 64, priceLabel: '₹25,000 – ₹70,000', img: photo('wedding,film', 68) },
      { name: 'Royal Pixels', city: 'Kalaburagi', specialty: 'Candid & drone coverage', rating: 4.3, reviews: 53, priceLabel: '₹26,000 – ₹75,000', img: photo('wedding,drone', 69) },
      { name: 'Hampi Heritage Films', city: 'Hampi', specialty: 'Pre-wedding at heritage sites', rating: 4.8, reviews: 119, priceLabel: '₹42,000 – ₹1.3L', img: photo('couple,heritage', 70), handpicked: true },
      { name: 'Hubli Light Studio', city: 'Hubballi', specialty: 'Modern candid', rating: 4.4, reviews: 71, priceLabel: '₹27,000 – ₹80,000', img: photo('wedding,portrait', 71) },
    ],
  },
  makeup: {
    slug: 'makeup',
    title: 'Bridal Makeup Artists',
    kicker: 'Across Karnataka',
    unit: 'artists',
    emoji: '💄',
    searchPlaceholder: 'Search artists, cities, styles…',
    vendors: [
      { name: 'Glow by Anaha', city: 'Bengaluru', specialty: 'HD & airbrush bridal looks', rating: 4.8, reviews: 264, priceLabel: '₹15,000 – ₹45,000', img: photo('bride,makeup', 101), handpicked: true },
      { name: 'Roopa Studio', city: 'Mysuru', specialty: 'Traditional South-Indian bridal', rating: 4.7, reviews: 181, priceLabel: '₹12,000 – ₹35,000', img: photo('indian,bride', 102), handpicked: true },
      { name: 'Blush & Bloom', city: 'Mangaluru', specialty: 'Dewy & natural glam', rating: 4.6, reviews: 134, priceLabel: '₹14,000 – ₹40,000', img: photo('makeup,woman', 103) },
      { name: 'Bridal Canvas', city: 'Hubballi', specialty: 'Family & bridal packages', rating: 4.5, reviews: 92, priceLabel: '₹10,000 – ₹30,000', img: photo('beauty,bride', 104) },
      { name: 'Maya Makeovers', city: 'Belagavi', specialty: 'Maharashtrian & Kannada looks', rating: 4.6, reviews: 76, priceLabel: '₹11,000 – ₹32,000', img: photo('bride,portrait', 105) },
      { name: 'Lavanya Artistry', city: 'Udupi', specialty: 'Temple-wedding bridal', rating: 4.7, reviews: 110, priceLabel: '₹13,000 – ₹38,000', img: photo('bride,jewellery', 106) },
    ],
  },
  'planning-decor': {
    slug: 'planning-decor',
    title: 'Wedding Planners & Decorators',
    kicker: 'Across Karnataka',
    unit: 'teams',
    emoji: '🎀',
    searchPlaceholder: 'Search planners, cities, themes…',
    vendors: [
      { name: 'Shubha Events', city: 'Bengaluru', specialty: 'Full-service planning & décor', rating: 4.8, reviews: 198, priceLabel: '₹2L – ₹15L', img: photo('wedding,decoration', 111), handpicked: true },
      { name: 'Marigold Décor Co.', city: 'Mysuru', specialty: 'Floral mandap & stage design', rating: 4.7, reviews: 142, priceLabel: '₹1.5L – ₹8L', img: photo('flowers,wedding', 112), handpicked: true },
      { name: 'Coastal Celebrations', city: 'Mangaluru', specialty: 'Beach & resort weddings', rating: 4.6, reviews: 88, priceLabel: '₹2L – ₹10L', img: photo('wedding,stage', 113) },
      { name: 'Namma Weddings', city: 'Hubballi', specialty: 'Budget-friendly planning', rating: 4.4, reviews: 64, priceLabel: '₹1L – ₹5L', img: photo('wedding,event', 114) },
      { name: 'Royal Knots', city: 'Belagavi', specialty: 'Theme & destination décor', rating: 4.6, reviews: 71, priceLabel: '₹1.8L – ₹9L', img: photo('wedding,venue', 115) },
      { name: 'Hampi Heritage Events', city: 'Hampi', specialty: 'Heritage-site weddings', rating: 4.8, reviews: 96, priceLabel: '₹3L – ₹18L', img: photo('wedding,heritage', 116), handpicked: true },
    ],
  },
  mehndi: {
    slug: 'mehndi',
    title: 'Mehndi Artists',
    kicker: 'Across Karnataka',
    unit: 'artists',
    emoji: '🪷',
    searchPlaceholder: 'Search mehndi artists, cities…',
    vendors: [
      { name: 'Henna by Zoya', city: 'Bengaluru', specialty: 'Bridal & Arabic mehndi', rating: 4.8, reviews: 221, priceLabel: '₹4,000 – ₹18,000', img: photo('henna,hands', 121), handpicked: true },
      { name: 'Mehndi Magic', city: 'Mysuru', specialty: 'Intricate full-hand designs', rating: 4.7, reviews: 134, priceLabel: '₹3,500 – ₹15,000', img: photo('mehndi,hand', 122) },
      { name: 'Inked Petals', city: 'Mangaluru', specialty: 'Modern minimal mehndi', rating: 4.6, reviews: 87, priceLabel: '₹3,000 – ₹12,000', img: photo('henna,design', 123) },
      { name: 'Kala Henna', city: 'Hubballi', specialty: 'Traditional Rajasthani', rating: 4.5, reviews: 59, priceLabel: '₹2,500 – ₹10,000', img: photo('henna,art', 124) },
      { name: 'Aalia Mehndi Art', city: 'Belagavi', specialty: 'Bridal + family bookings', rating: 4.6, reviews: 73, priceLabel: '₹3,000 – ₹13,000', img: photo('henna,hands', 125) },
      { name: 'Lotus Henna Studio', city: 'Udupi', specialty: 'Temple-wedding mehndi', rating: 4.7, reviews: 91, priceLabel: '₹3,200 – ₹14,000', img: photo('mehndi,bride', 126) },
    ],
  },
  'music-dance': {
    slug: 'music-dance',
    title: 'Music & Dance',
    kicker: 'Across Karnataka',
    unit: 'acts',
    emoji: '🥁',
    searchPlaceholder: 'Search DJs, bands, choreographers…',
    vendors: [
      { name: 'Beats by Bangalore', city: 'Bengaluru', specialty: 'Wedding DJ & sound', rating: 4.7, reviews: 176, priceLabel: '₹25,000 – ₹1.2L', img: photo('dj,party', 131), handpicked: true },
      { name: 'Nadaswaram Ensemble', city: 'Mysuru', specialty: 'Traditional muhurtham music', rating: 4.8, reviews: 142, priceLabel: '₹18,000 – ₹60,000', img: photo('music,instrument', 132), handpicked: true },
      { name: 'Sangeet Steps', city: 'Bengaluru', specialty: 'Sangeet choreography', rating: 4.6, reviews: 98, priceLabel: '₹15,000 – ₹50,000', img: photo('dance,stage', 133) },
      { name: 'Coastal Drummers', city: 'Mangaluru', specialty: 'Dollu Kunitha & folk', rating: 4.7, reviews: 64, priceLabel: '₹12,000 – ₹40,000', img: photo('drum,folk', 134) },
      { name: 'Live Lounge Band', city: 'Hubballi', specialty: 'Live band & vocals', rating: 4.5, reviews: 52, priceLabel: '₹30,000 – ₹1.5L', img: photo('band,music', 135) },
      { name: 'Rhythm Riders', city: 'Belagavi', specialty: 'Baraat dhol & brass', rating: 4.6, reviews: 47, priceLabel: '₹14,000 – ₹45,000', img: photo('wedding,dance', 136) },
    ],
  },
  'invites-gifts': {
    slug: 'invites-gifts',
    title: 'Invites & Gifts',
    kicker: 'Across Karnataka',
    unit: 'vendors',
    emoji: '🎁',
    searchPlaceholder: 'Search invites, favors, packers…',
    vendors: [
      { name: 'Inkand Co.', city: 'Bengaluru', specialty: 'Custom & digital invites', rating: 4.7, reviews: 154, priceLabel: '₹80 – ₹450 / card', img: photo('wedding,invitation', 141), handpicked: true },
      { name: 'Trousseau Tales', city: 'Mysuru', specialty: 'Trousseau packing & favors', rating: 4.6, reviews: 88, priceLabel: '₹200 – ₹1,200 / unit', img: photo('gift,box', 142) },
      { name: 'Silk & Saffron Gifts', city: 'Mangaluru', specialty: 'Return gifts & hampers', rating: 4.6, reviews: 72, priceLabel: '₹150 – ₹900 / unit', img: photo('gift,hamper', 143) },
      { name: 'Paper Peacock', city: 'Hubballi', specialty: 'Handmade invitations', rating: 4.5, reviews: 49, priceLabel: '₹100 – ₹500 / card', img: photo('paper,card', 144) },
      { name: 'Mysore Silk Favors', city: 'Mysuru', specialty: 'Silk & sandalwood gifts', rating: 4.7, reviews: 96, priceLabel: '₹250 – ₹1,500 / unit', img: photo('silk,gift', 145), handpicked: true },
      { name: 'Festive Wraps', city: 'Belagavi', specialty: 'Gift wrapping & trousseau', rating: 4.4, reviews: 38, priceLabel: '₹120 – ₹800 / unit', img: photo('wrap,gift', 146) },
    ],
  },
  'food-catering': {
    slug: 'food-catering',
    title: 'Food & Catering',
    kicker: 'Across Karnataka',
    unit: 'caterers',
    emoji: '🍛',
    searchPlaceholder: 'Search caterers, cuisines, cities…',
    vendors: [
      { name: 'Adyar Annapoorna Catering', city: 'Bengaluru', specialty: 'Pure-veg South Indian', rating: 4.8, reviews: 312, priceLabel: '₹450 – ₹1,200 / plate', img: photo('indian,food', 151), handpicked: true },
      { name: 'Mysuru Royal Kitchen', city: 'Mysuru', specialty: 'Mysore-style feast', rating: 4.7, reviews: 198, priceLabel: '₹500 – ₹1,400 / plate', img: photo('thali,meal', 152), handpicked: true },
      { name: 'Coastal Curry Co.', city: 'Mangaluru', specialty: 'Mangalorean seafood & veg', rating: 4.6, reviews: 121, priceLabel: '₹550 – ₹1,500 / plate', img: photo('curry,food', 153) },
      { name: 'North Karnataka Rotis', city: 'Hubballi', specialty: 'Jolada rotti & uttar spread', rating: 4.6, reviews: 87, priceLabel: '₹400 – ₹1,000 / plate', img: photo('roti,food', 154) },
      { name: 'Sweet Symphony', city: 'Bengaluru', specialty: 'Cakes, chaat & live counters', rating: 4.5, reviews: 143, priceLabel: '₹300 – ₹900 / plate', img: photo('dessert,cake', 155) },
      { name: 'Saraswat Bhojan', city: 'Udupi', specialty: 'Udupi temple-style meals', rating: 4.7, reviews: 109, priceLabel: '₹420 – ₹1,100 / plate', img: photo('udupi,food', 156) },
    ],
  },
  'pandit-rituals': {
    slug: 'pandit-rituals',
    title: 'Pandit & Rituals',
    kicker: 'Across Karnataka',
    unit: 'purohits',
    emoji: '🛕',
    searchPlaceholder: 'Search purohits, rituals, cities…',
    vendors: [
      { name: 'Sri Vedavyasa Purohits', city: 'Bengaluru', specialty: 'Vedic weddings & homam', rating: 4.8, reviews: 167, priceLabel: '₹8,000 – ₹35,000', img: photo('pooja,ritual', 161), handpicked: true },
      { name: 'Mysuru Veda Pathashala', city: 'Mysuru', specialty: 'Madhwa & Smartha rituals', rating: 4.7, reviews: 121, priceLabel: '₹7,000 – ₹30,000', img: photo('temple,fire', 162), handpicked: true },
      { name: 'Tulu Nadu Purohits', city: 'Mangaluru', specialty: 'Coastal Brahmin rituals', rating: 4.6, reviews: 76, priceLabel: '₹6,500 – ₹28,000', img: photo('hindu,ritual', 163) },
      { name: 'Sharada Vidwans', city: 'Udupi', specialty: 'Temple-wedding ceremonies', rating: 4.7, reviews: 94, priceLabel: '₹7,500 – ₹32,000', img: photo('temple,pooja', 164) },
      { name: 'Veerashaiva Gurus', city: 'Hubballi', specialty: 'Lingayat wedding rites', rating: 4.5, reviews: 58, priceLabel: '₹6,000 – ₹25,000', img: photo('hindu,wedding', 165) },
      { name: 'Kalyana Vedam', city: 'Belagavi', specialty: 'Multi-tradition purohits', rating: 4.6, reviews: 41, priceLabel: '₹6,800 – ₹27,000', img: photo('fire,ceremony', 166) },
    ],
  },
  'pre-wedding-shoot': {
    slug: 'pre-wedding-shoot',
    title: 'Pre-Wedding Shoots',
    kicker: 'Across Karnataka',
    unit: 'studios',
    emoji: '📷',
    searchPlaceholder: 'Search studios, locations, themes…',
    vendors: [
      { name: 'Hampi Heritage Films', city: 'Hampi', specialty: 'Shoots among ancient ruins', rating: 4.9, reviews: 142, priceLabel: '₹35,000 – ₹1.2L', img: photo('couple,heritage', 171), handpicked: true },
      { name: 'Coorg Mist Studio', city: 'Mangaluru', specialty: 'Coffee-estate & misty hills', rating: 4.8, reviews: 118, priceLabel: '₹40,000 – ₹1.3L', img: photo('couple,nature', 172), handpicked: true },
      { name: 'Coastal Sunsets', city: 'Mangaluru', specialty: 'Beach pre-wedding', rating: 4.6, reviews: 84, priceLabel: '₹30,000 – ₹95,000', img: photo('couple,beach', 173) },
      { name: 'Palace Frames', city: 'Mysuru', specialty: 'Royal palace backdrops', rating: 4.7, reviews: 109, priceLabel: '₹38,000 – ₹1.1L', img: photo('couple,palace', 174) },
      { name: 'Urban Love Co.', city: 'Bengaluru', specialty: 'Cityscape & café themes', rating: 4.5, reviews: 96, priceLabel: '₹28,000 – ₹85,000', img: photo('couple,city', 175) },
      { name: 'Jog Falls Films', city: 'Shivamogga', specialty: 'Waterfall & forest shoots', rating: 4.6, reviews: 63, priceLabel: '₹32,000 – ₹90,000', img: photo('couple,waterfall', 176) },
    ],
  },
};

export function getService(slug: string | undefined): ServiceConfig | undefined {
  return slug ? SERVICES[slug] : undefined;
}
