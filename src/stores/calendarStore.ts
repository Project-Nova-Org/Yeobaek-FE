/** 날짜(YYYY-MM-DD) → OOTD id 매핑 (달력에서 생성한 OOTD) */
let dateToOotdId: Record<string, string> = {};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((cb) => cb());
}

export function getOotdIdForDate(dateStr: string): string | undefined {
  return dateToOotdId[dateStr];
}

export function setOotdForDate(dateStr: string, ootdId: string): void {
  dateToOotdId[dateStr] = ootdId;
  notify();
}

/** 날짜에 연결된 OOTD 연결 해제 (달력에서 삭제 시) */
export function removeOotdForDate(dateStr: string): void {
  delete dateToOotdId[dateStr];
  notify();
}

export function getAllDateToOotdIds(): Record<string, string> {
  return { ...dateToOotdId };
}

export function subscribeCalendarDates(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
