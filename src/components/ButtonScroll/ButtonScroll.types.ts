export type TopCategory = "종류" | "계절" | "소재";
export type ActiveTopCategory = TopCategory | null;

export interface CategoryState {
  top: ActiveTopCategory;

  // 종류
  typeCategory: string | null;
  typeDetail: string | null;

  // 계절
  season: string | null;

  // 소재
  material: string | null;
}
