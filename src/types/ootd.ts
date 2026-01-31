/** 캔버스 상의 아이템 배치(위치·크기·회전) */
export interface OotdItemTransform {
  x: number;
  y: number;
  width: number;
  height: number;
  /** 라디안 */
  rotation: number;
}

/** 새 아이템 추가 시 기본 배치 */
export const DEFAULT_ITEM_TRANSFORM: OotdItemTransform = {
  x: 0,
  y: 0,
  width: 140,
  height: 140,
  rotation: 0,
};

/** 캔버스 아이템 + 배치 데이터 */
export interface OotdCanvasItem {
  key: string;
  image: any;
  transform: OotdItemTransform;
}

/** 저장된 OOTD 한 건 */
export interface SavedOotd {
  id: string;
  name: string;
  tpo: string;
  style: string;
  memo?: string;
  /** 즐겨찾기 여부 */
  isFavorite?: boolean;
  items: OotdCanvasItem[];
  /** 배치가 기록된 캔버스 크기 (미리보기 스케일용) */
  canvasSize: { width: number; height: number };
  /** OOTD 이미지 배경색 (등록/수정 화면에서 선택한 흰색·회색) */
  imageBgColor?: string;
  createdAt: number;
}
