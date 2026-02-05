import type { OotdCanvasItem } from "@/types/ootd";

export type OotdStackParamList = {
  OOTD: undefined;
  OotdDetail: { ootdId: string };
  OotdCreate:
    | undefined
    | {
        canvasItems: OotdCanvasItem[];
        canvasSize: { width: number; height: number };
        editOotdId?: string;
        calendarDate?: string;
      };
  OotdCreateInfo: {
    /** 배치 데이터로 다음 화면에서 재렌더 */
    canvasItems: OotdCanvasItem[];
    canvasSize: { width: number; height: number };
    /** 수정 모드일 때 OOTD id */
    editOotdId?: string;
    calendarDate?: string;
  };
  // OotdEdit: { ootdId: number };
};
