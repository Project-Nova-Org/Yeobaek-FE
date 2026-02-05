import type { OotdCanvasItem, SavedOotd } from "@/types/ootd";
import type { ImageSourcePropType } from "react-native";

export type CalendarStackParamList = {
  Calendar: undefined;
  CallOotd: { date: string };
  LoadOotd: {
    /** 이미지만(목업) 또는 저장된 OOTD 전체. 저장된 OOTD면 풀 레이아웃으로 달력에 반영 */
    onSelectOotd: (payload: ImageSourcePropType | SavedOotd) => void;
  };
  OotdCreate:
    | undefined
    | {
        canvasItems?: OotdCanvasItem[];
        canvasSize?: { width: number; height: number };
        editOotdId?: string;
        /** 달력에서 진입 시 선택된 날짜(YYYY-MM-DD) */
        calendarDate?: string;
      };
  OotdCreateInfo: {
    canvasItems: OotdCanvasItem[];
    canvasSize: { width: number; height: number };
    editOotdId?: string;
    /** 달력에서 진입 시 선택된 날짜(YYYY-MM-DD) */
    calendarDate?: string;
  };
};
