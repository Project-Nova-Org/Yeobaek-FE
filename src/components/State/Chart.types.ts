export interface DonutStatItem {
  label: string;
  value: number;
  color: string;
}

export interface DonutStat {
  title: string;
  items: DonutStatItem[];
}
