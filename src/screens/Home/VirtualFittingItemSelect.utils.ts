import { TYPE_CATEGORIES, TYPE_DETAILS } from "@/theme/itemCategories";
import type { FashionItem } from "@/screens/Dressroom/dressroom.mock";

const MAIN_CATEGORIES = TYPE_CATEGORIES;

/** 아이템의 category(세부 종류)를 대분류(상의/하의/한벌 옷 등)로 변환 */
export function getMainCategory(item: FashionItem): string {
  const cat = item.category;
  if (MAIN_CATEGORIES.includes(cat)) return cat;
  for (const main of MAIN_CATEGORIES) {
    const subs = TYPE_DETAILS[main];
    if (subs?.includes(cat)) return main;
  }
  return "기타";
}

/** 상의/하의/아우터/신발: 1개씩만 선택 가능한 대분류인지 */
export function isSingleSlotMain(main: string): boolean {
  return ["상의", "하의", "아우터", "신발"].includes(main);
}

/** 한벌 옷 선택 시 상의+하의를 모두 사용한 것으로 간주 */
export function isOnepieceMain(main: string): boolean {
  return main === "한벌 옷";
}

export const MAX_TOTAL_SELECTION = 6;
