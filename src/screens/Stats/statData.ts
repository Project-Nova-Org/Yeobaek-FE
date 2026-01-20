import { DonutStat } from "@/components/State/Chart.types.ts";
import { Item1Image, Item2Image, Item3Image } from "@/assets/images";

// 자주 착용한 아이템 데이터
export const FREQUENT_ITEMS = [
  { id: 1, brand: "Nike", image: Item1Image },
  { id: 2, brand: "Adidas", image: Item3Image },
  { id: 3, brand: "Zara", image: Item2Image },
  { id: 4, brand: "Gucci", image: Item3Image },
  { id: 5, brand: "Uniqlo", image: Item2Image },
  { id: 6, brand: "H&M", image: Item3Image },
];

// 최근 착용하지 않은 아이템 데이터
export const UNWORN_DATA = {
  previewItems: [
    { id: 1, image: Item1Image },
    { id: 2, image: Item2Image },
    { id: 3, image: Item3Image },
  ],
  totalCount: 17,
};

export const statData: DonutStat[] = [
  {
    title: "종류별 옷 비율",
    items: [
      { label: "상의", value: 12, color: "#6C3BEB" },
      { label: "하의", value: 8, color: "#7E57C2" },
      { label: "아우터", value: 6, color: "#B388FE" },
      { label: "신발", value: 4, color: "#B39DDB" },
      { label: "기타", value: 3, color: "#EEE8F6" },
    ],
  },
  {
    title: "계절별 옷 비율",
    items: [
      { label: "봄", value: 6, color: "#F8C5BE" },
      { label: "여름", value: 10, color: "#B0DAB7" },
      { label: "가을", value: 7, color: "#FFD790" },
      { label: "겨울", value: 9, color: "#C2E3FF" },
    ],
  },
  {
    title: "색상별 옷 비율",
    items: [
      { label: "블랙", value: 8, color: "#000000" },
      { label: "화이트", value: 6, color: "#FFFFFF" },
      { label: "그레이", value: 5, color: "#BDBDBD" },
      { label: "레드", value: 4, color: "#FF6F61" },
      { label: "블루", value: 3, color: "#3F51B5" },
    ],
  },
  {
    title: "TPO 비율",
    items: [
      { label: "포멀", value: 6, color: "#1D4DE8" },
      { label: "데일리", value: 10, color: "#7BA7F4" },
      { label: "데이트", value: 4, color: "#B4CDF9" },
      { label: "레저", value: 3, color: "#C1E7FF" },
      { label: "기타", value: 2, color: "#E4F5FF" },
    ],
  },
  {
    title: "Style 비율",
    items: [
      { label: "스트릿", value: 6, color: "#EB3B3B" },
      { label: "스포티", value: 5, color: "#FFA3A3" },
      { label: "캐주얼", value: 8, color: "#C25757" },
      { label: "힙합", value: 4, color: "#FF9474" },
      { label: "기타", value: 3, color: "#FF7700" },
    ],
  },
];

export const OOTD_CHART_DATA = [
  { label: "11", value: 1, subLabel: "2024" },
  { label: "12", value: 30, subLabel: "" },
  { label: "1", value: 15, subLabel: "2025" },
  { label: "2", value: 3, subLabel: "" },
  { label: "3", value: 12, subLabel: "" },
];

export const STATS_SUMMARY = {
  items: 101,
  closet: 6,
  ootd: 32,
};

export const UNWORN_ITEMS = [
  { id: "1", name: "허그유어스킨", image: Item3Image },
  { id: "2", name: "줄리", image: Item1Image },
  { id: "3", name: "허그유어스킨", image: Item3Image },
  { id: "4", name: "허그유어스킨", image: Item3Image },
  { id: "5", name: "허그유어스킨", image: Item2Image },
  { id: "6", name: "허그유어스킨", image: Item2Image },
  { id: "7", name: "허그유어스킨", image: Item3Image },
  { id: "8", name: "허그유어스킨", image: Item3Image },
  { id: "9", name: "허그유어스킨", image: Item2Image },
];
