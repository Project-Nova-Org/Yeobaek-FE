import { DonutStat } from "@/components/State/Chart.types.ts";

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
