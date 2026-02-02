import { UserInfo } from "./shared";

export type MypageStackParamList = {
  Mypage: undefined;
  Help: undefined;
  Myinfo: { initialData?: UserInfo };
  MyinfoComplete: { savedData: UserInfo };
  NicknameEdit: { currentNickname: string };
};
