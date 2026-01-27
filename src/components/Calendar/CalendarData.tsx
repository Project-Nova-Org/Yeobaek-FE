import { SampleOOTDImage } from "@/assets/images";

export interface OotdData {
  [key: string]: {
    id: string;
    image: any;
  };
}
export const MOCK_OOTD_DATA: OotdData = {
  "2024-10-02": { id: "1", image: SampleOOTDImage },
  "2024-10-05": { id: "2", image: SampleOOTDImage },
  "2024-10-08": { id: "3", image: SampleOOTDImage },
  "2024-10-15": { id: "4", image: SampleOOTDImage },
  "2024-09-30": { id: "5", image: SampleOOTDImage },
};

export const getCalendarDays = (year: number, month: number) => {
  const startDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  // 이전 달의 정보 계산
  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  // 다음 달의 정보 계산
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const days = [];

  // 이전 달 날짜 채우기 (클릭 방지 대상)
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDate - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜 채우기
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true,
    });
  }

  // 다음 달 날짜 채우기
  const totalSlots = Math.ceil(days.length / 7) * 7;
  const remaining = totalSlots - days.length;

  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
    });
  }

  return days;
};
