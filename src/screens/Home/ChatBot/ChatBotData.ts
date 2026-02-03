export interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  time: string;
}

export const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${ampm} ${hours}:${minutesStr}`;
};

export const createInitialMessages = (): Message[] => [
  {
    id: 1,
    text: "안녕구리야! 오늘 어떤 스타일 고민이 있니?",
    sender: "ai",
    time: getCurrentTime(),
  },
];

export const AI_RESPONSES = [
  "현재 날씨와 옷장을 분석해서 최고의 조합을 찾아보고 있어!",
  "선택한 스타일은 오늘 같은 날씨에 정말 잘 어울리는 조합이네~",
  "구리가 최근 즐겨찾기한 아이템들을 활용한 코디를 제안해 줄게.",
];
