export interface DonutStatItem {
  label: string; // "봄", "상의", "포멀"
  value: number; // 비율 또는 개수
  color: string;
}

export interface DonutStat {
  title: string; // 카드 제목
  items: DonutStatItem[];
}
