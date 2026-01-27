export interface UserInfo {
  nickname?: string;
  email?: string;
  gender?: "male" | "female" | null;
  height?: string;
  weight?: string;
  image?: string | null;
  provider?: string;
}
