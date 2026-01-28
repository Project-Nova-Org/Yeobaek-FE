export interface ClosetItem {
  id: number;
  name: string;
  imageUrl: string;
  isFavorite: boolean;
  createdAt: number;
}

export type ItemColor =
  | "black"
  | "white"
  | "gray"
  | "beige"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

export interface FashionItem {
  id: number;
  brand: string;
  imageUrl: string;
  createdAt: number;

  category: string;
  color: ItemColor;
  season: string;
  material: string;
  size: string;
  price: number;
  lastWornAt: string;
  wearCount: number;
  memo?: string;
}

export interface ItemClosetMap {
  closetId: number;
  fashionItemId: number;
}

export interface ItemClosetMap {
  closetId: number;
  fashionItemId: number;
}

export const MOCK_CLOSETS: ClosetItem[] = [
  {
    id: 1,
    name: "데일리룩",
    imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    isFavorite: false,
    createdAt: 3,
  },
  {
    id: 2,
    name: "출근룩",
    imageUrl: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    isFavorite: true,
    createdAt: 1,
  },
  {
    id: 3,
    name: "데이트룩",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    isFavorite: false,
    createdAt: 8,
  },
  {
    id: 4,
    name: "여행룩",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    isFavorite: true,
    createdAt: 2,
  },
  {
    id: 5,
    name: "겨울 아우터",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    isFavorite: false,
    createdAt: 10,
  },
  {
    id: 6,
    name: "여름 상의",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    isFavorite: false,
    createdAt: 4,
  },
];

export const MOCK_ITEMS: FashionItem[] = [
  {
    id: 1,
    brand: "ZARA",
    imageUrl: "https://images.unsplash.com/photo-1526178616049-9f8f10a33f0c",
    createdAt: 1,
    category: "아우터",
    color: "black",
    season: "겨울",
    material: "울",
    size: "L",
    price: 129000,
    lastWornAt: "2025.01.12",
    wearCount: 3,
    memo: "코트치곤 가벼움",
  },
  {
    id: 2,
    brand: "NIKE",
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    createdAt: 2,
    category: "운동화",
    color: "white",
    season: "사계절",
    material: "합성섬유",
    size: "270",
    price: 99000,
    lastWornAt: "2025.02.03",
    wearCount: 10,
  },
  {
    id: 3,
    brand: "ADIDAS",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552",
    createdAt: 3,
    category: "후드티",
    color: "gray",
    season: "겨울",
    material: "면",
    size: "M",
    price: 79000,
    lastWornAt: "2025.03.21",
    wearCount: 6,
    memo: "편한데 보풀 조금 생김",
  },
  {
    id: 4,
    brand: "UNIQLO",
    imageUrl: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    createdAt: 4,
    category: "치마",
    color: "beige",
    season: "봄",
    material: "면",
    size: "M",
    price: 49900,
    lastWornAt: "2025.05.07",
    wearCount: 6,
    memo: "세일 전에 샀다…",
  },
  {
    id: 5,
    brand: "H&M",
    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    createdAt: 5,
    category: "운동화",
    color: "pink",
    season: "여름",
    material: "합성섬유",
    size: "260",
    price: 69000,
    lastWornAt: "2025.06.01",
    wearCount: 2,
  },
  {
    id: 6,
    brand: "MUSINSA",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    createdAt: 6,
    category: "반팔",
    color: "blue",
    season: "여름",
    material: "면",
    size: "L",
    price: 29000,
    lastWornAt: "2025.06.20",
    wearCount: 8,
  },
];

export const MOCK_ITEM_MAPS: ItemClosetMap[] = [
  { closetId: 1, fashionItemId: 1 },
  { closetId: 2, fashionItemId: 1 },

  { closetId: 1, fashionItemId: 2 },
  { closetId: 4, fashionItemId: 2 },

  { closetId: 3, fashionItemId: 3 },
  { closetId: 4, fashionItemId: 3 },

  { closetId: 1, fashionItemId: 4 },
  { closetId: 2, fashionItemId: 4 },
  { closetId: 6, fashionItemId: 4 },

  { closetId: 3, fashionItemId: 5 },
  { closetId: 4, fashionItemId: 5 },

  { closetId: 5, fashionItemId: 6 },

  { closetId: 1, fashionItemId: 5 },
  { closetId: 1, fashionItemId: 6 },
];
