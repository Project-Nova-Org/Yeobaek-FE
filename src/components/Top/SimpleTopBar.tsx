import { View, StyleSheet, Pressable } from "react-native";
import { ProfileIcon } from "@/assets/icons";
import { Colors } from "@/theme/colors.ts";
import { AppText } from "@/components/common/AppText.tsx";

export interface SimpleTopBarProps {
  title: string;
  onProfilePress?: () => void;
}

export function SimpleTopBar({ title, onProfilePress }: SimpleTopBarProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>

      <Pressable onPress={onProfilePress}>
        <ProfileIcon width={27} height={27} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingLeft: 17,
    paddingRight: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.primary,
  },
});
