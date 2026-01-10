import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function HomeTop({ onProfilePress }: SimpleTopBarProps) {
  return <SimpleTopBar title="여백 : 餘白" onProfilePress={onProfilePress} />;
}
