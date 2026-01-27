import { View } from "react-native";
import { styles } from "./AppHeader.styles";
import { AppText } from "@/components/common/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppHeaderProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function AppHeader({ title, left, right }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, height: 55 + insets.top }]}>
      <View style={styles.side}>{left}</View>

      <View style={styles.center}>
        <AppText style={styles.title}>{title}</AppText>
      </View>

      <View style={styles.side}>{right}</View>
    </View>
  );
}
