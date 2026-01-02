import { OotdTop } from "./OotdTop";
import { DressroomTop } from "./DressroomTop";
import { HomeTop } from "./HomeTop";
import { CalendarTop } from "./CalendarTop";
import { StatsTop } from "./StatsTop";

export const TopByTab = {
  ootd: OotdTop,
  dressroom: DressroomTop,
  home: HomeTop,
  calendar: CalendarTop,
  stats: StatsTop,
} as const;
