import { SimpleTopBar, SimpleTopBarProps } from "./SimpleTopBar";

export function OotdTop({ onProfilePress }: Omit<SimpleTopBarProps, "title">) {
  return <SimpleTopBar title="OOTD" onProfilePress={onProfilePress} />;
}
