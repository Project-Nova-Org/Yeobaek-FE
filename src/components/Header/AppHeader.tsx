import { View, Text } from "react-native";
import { styles } from "./AppHeader.styles";

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
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.side}>{right}</View>
    </View>
  );
}
