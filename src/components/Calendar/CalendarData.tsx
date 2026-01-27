export interface OotdData {
  [key: string]: {
    id: string;
    image: any;
  };
}

export const MOCK_OOTD_DATA: OotdData = {
  "2024-10-02": { id: "1", image: null },
  "2024-10-05": { id: "2", image: null },
  "2024-10-08": { id: "3", image: null },
  "2024-10-15": { id: "4", image: null },
};

export const getCalendarDays = (year: number, month: number) => {
  const startDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = 0; i < startDay; i++) days.push({ day: 0, isCurrentMonth: false });
  for (let i = 1; i <= lastDate; i++) days.push({ day: i, isCurrentMonth: true });

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) days.push({ day: 0, isCurrentMonth: false });

  return days; // 6x7 고정 그리드 반환
};
