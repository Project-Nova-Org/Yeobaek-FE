import { NavigatorScreenParams } from "@react-navigation/native";
import { OotdStackParamList } from "./OotdStackParamList";
import { DressroomStackParamList } from "@/types/navigation/DressroomStackParamList.ts";

export type MainTabParamList = {
  CalendarTab: undefined;
  OotdTab: NavigatorScreenParams<OotdStackParamList>;
  HomeTab: undefined;
  DressroomTab: NavigatorScreenParams<DressroomStackParamList>;
  StatsTab: undefined;
};
