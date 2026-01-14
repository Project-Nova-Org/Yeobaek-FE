import { DressRoomImage, CloudyImage } from "@/assets/images";

// 즐겨찾기 옷장 임시 데이터
export const favoriteClosets = [
  { id: 1, name: "출근룩", image: DressRoomImage },
  { id: 2, name: "데이트", image: DressRoomImage },
  { id: 3, name: "운동복", image: DressRoomImage },
  { id: 4, name: "여행용", image: DressRoomImage },
  { id: 5, name: "겨울코트", image: DressRoomImage },
  { id: 6, name: "하객룩", image: DressRoomImage },
  { id: 7, name: "바캉스", image: DressRoomImage },
];

// 날씨 및 추천 멘트
export const weatherData = {
  image: CloudyImage,
  date: "2025. 10. 11",
  weather: "흐림",
  temperature: " 16°",
  comment: "반팔 티, 긴 바지, 가벼운 아우터를 추천해요.\n일교차가 크니 감기 조심하세요!",
};

// 가상피팅 차감 횟수
export const fittingCount = {
  currentCount: 4,
  totalCount: 5,
};
