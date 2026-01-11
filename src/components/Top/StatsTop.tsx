import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";
export function StatsTop({ onProfilePress }: Omit<SimpleTopBarProps, "title">) {
  return <SimpleTopBar title="통계" onProfilePress={onProfilePress} />;
}
