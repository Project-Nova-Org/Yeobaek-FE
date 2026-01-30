export const TPO_LIST = [
  "데일리",
  "포멀",
  "데이트",
  "여행",
  "레저",
  "파티",
  "하객룩",
  "기타",
] as const;

export const STYLE_LIST = [
  "캐주얼",
  "클래식",
  "빈티지",
  "스트릿",
  "스포티",
  "힙합",
  "기타",
] as const;

export type TpoOption = (typeof TPO_LIST)[number];
export type StyleOption = (typeof STYLE_LIST)[number];
