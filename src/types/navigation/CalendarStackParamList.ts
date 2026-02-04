import { OotdCanvasItem } from "@/types/ootd";

export type CalendarStackParamList = {
  Calendar: undefined;
  CallOotd: { date: string };
  LoadOotd: {
    onSelectOotd: (selectedImage: any) => void;
  };
  OotdCreate:
    | undefined
    | {
        canvasItems: OotdCanvasItem[];
        canvasSize: { width: number; height: number };
        editOotdId?: string;
      };
};
