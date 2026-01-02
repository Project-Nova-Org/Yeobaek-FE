import { View } from "react-native";
import { styles } from "./AppHeader.styles";
import { AppText } from "@/components/common/AppText";

interface AppHeaderProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function AppHeader({ title, left, right }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{left}</View>

      <View style={styles.center}>
        <AppText style={styles.title}>{title}</AppText>
      </View>

      <View style={styles.side}>{right}</View>
    </View>
  );
}
