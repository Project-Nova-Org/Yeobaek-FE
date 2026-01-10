import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function DressroomTop({ onProfilePress }: SimpleTopBarProps) {
  return <SimpleTopBar title="드레스룸" onProfilePress={onProfilePress} />;
}
