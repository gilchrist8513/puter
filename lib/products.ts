export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  price: number;
  marginPct: number;
  heatScore: number; // 0-100
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Smart Bottle Pro",
    description:
      "Self-cleaning water bottle with UV-C sterilization and hydration reminders.",
    category: "Health & Fitness",
    cost: 19.0,
    price: 49.0,
    marginPct: 61,
    heatScore: 89,
  },
  {
    id: "p2",
    name: "Pet Hair Eraser™ Mini",
    description:
      "Portable vacuum for couches and car seats; silent motor, strong suction.",
    category: "Pets",
    cost: 14.5,
    price: 39.0,
    marginPct: 63,
    heatScore: 86,
  },
  {
    id: "p3",
    name: "Galaxy Projector 2.0",
    description:
      "Turns any room into a starry night; Bluetooth speaker + sleep timer.",
    category: "Home & Living",
    cost: 17.0,
    price: 44.0,
    marginPct: 61,
    heatScore: 91,
  },
  {
    id: "p4",
    name: "PostureCorrector Lite",
    description:
      "Discrete back posture trainer with haptic reminders and app tracking.",
    category: "Health & Fitness",
    cost: 8.0,
    price: 29.0,
    marginPct: 72,
    heatScore: 77,
  },
  {
    id: "p5",
    name: "Clip-On Phone Selfie Light",
    description:
      "Rechargeable ring light for TikTok/IG creators with 3 color temperatures.",
    category: "Creator Gear",
    cost: 6.0,
    price: 24.0,
    marginPct: 75,
    heatScore: 84,
  },
  {
    id: "p6",
    name: "MagSafe Car Mount 360",
    description:
      "One-hand magnetic mount with 360° rotation and fast vent clip.",
    category: "Accessories",
    cost: 7.5,
    price: 27.0,
    marginPct: 72,
    heatScore: 80,
  },
  {
    id: "p7",
    name: "EcoBrew Reusable Pods",
    description:
      "Zero-waste stainless coffee pods; compatible with popular machines.",
    category: "Kitchen",
    cost: 5.0,
    price: 22.0,
    marginPct: 77,
    heatScore: 73,
  },
  {
    id: "p8",
    name: "TravelPack Compression Cubes",
    description:
      "Water-resistant packing cubes that compress clothes by up to 50%.",
    category: "Travel",
    cost: 9.0,
    price: 32.0,
    marginPct: 72,
    heatScore: 79,
  },
];

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getTopTrendingProducts(limit = 6): Product[] {
  return [...MOCK_PRODUCTS].sort((a, b) => b.heatScore - a.heatScore).slice(0, limit);
}

