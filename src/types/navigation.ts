// 공통 유저 정보 타입
export interface UserInfo {
  nickname?: string;
  email?: string;
  gender?: "male" | "female" | null;
  height?: string;
  weight?: string;
  image?: string | null;
  provider?: string;
}

// 내비게이션 파라미터 타입
export type RootStackParamList = {
  HomeMain: undefined;
  Mypage: undefined;
  Help: undefined;
  Myinfo: { initialData?: UserInfo };
  NicknameEdit: { currentNickname: string };
  UnwornDetail: undefined;
};
