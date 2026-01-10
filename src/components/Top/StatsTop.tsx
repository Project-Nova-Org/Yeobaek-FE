import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function StatsTop({ onProfilePress }: SimpleTopBarProps) {
  return <SimpleTopBar title="통계" onProfilePress={onProfilePress} />;
}
