import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function CalendarTop({ onProfilePress }: SimpleTopBarProps) {
  return <SimpleTopBar title="달력" onProfilePress={onProfilePress} />;
}
