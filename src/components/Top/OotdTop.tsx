import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function OotdTop({ onProfilePress }: SimpleTopBarProps) {
  return <SimpleTopBar title="OOTD" onProfilePress={onProfilePress} />;
}
