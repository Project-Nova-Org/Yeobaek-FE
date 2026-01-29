import {
  SampleOOTD2Image,
  SampleOOTD3Image,
  SampleOOTD4Image,
  SampleOOTD5Image,
  SampleFittingImage,
} from "@/assets/images";

export interface OotdData {
  [key: string]: {
    id: string;
    name: string;
    image: any; // 달력 대표 이미지
    ootdImage: any; // OOTD 조합 이미지
    fullShotImage?: any; // 전신 사진
  };
}

export const MOCK_OOTD_DATA: OotdData = {
  "2024-10-02": {
    id: "1",
    name: "Library",
    image: SampleOOTD5Image,
    ootdImage: SampleOOTD5Image,
    fullShotImage: SampleFittingImage,
  },
  "2024-10-05": { id: "2", name: "Monday", image: SampleOOTD2Image, ootdImage: SampleOOTD2Image },
  "2024-10-08": { id: "3", name: "Sunny", image: SampleOOTD3Image, ootdImage: SampleOOTD3Image },
  "2024-09-30": {
    id: "4",
    name: "GoodDay",
    image: SampleOOTD4Image,
    ootdImage: SampleOOTD4Image,
    fullShotImage: SampleFittingImage,
  },
};

export const getCalendarDays = (year: number, month: number) => {
  const startDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDate - i,
      month: month === 1 ? 12 : month - 1,
      year: month === 1 ? year - 1 : year,
      isCurrentMonth: false,
    });
  }
  for (let i = 1; i <= lastDate; i++) {
    days.push({ day: i, month: month, year: year, isCurrentMonth: true });
  }
  const remaining = Math.ceil(days.length / 7) * 7 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      month: month === 12 ? 1 : month + 1,
      year: month === 12 ? year + 1 : year,
      isCurrentMonth: false,
    });
  }
  return days;
};
