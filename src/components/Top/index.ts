import { OotdTop } from "./OotdTop";
import { DressroomTop } from "./DressroomTop";
import { HomeTop } from "./HomeTop";
import { CalendarTop } from "./CalendarTop";
import { StatsTop } from "./StatsTop";
import { SimpleTopBarProps } from "./SimpleTopBar";

export const TopByTab: Record<string, React.ComponentType<SimpleTopBarProps>> = {
  ootd: OotdTop,
  dressroom: DressroomTop,
  home: HomeTop,
  calendar: CalendarTop,
  stats: StatsTop,
};
