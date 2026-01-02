import { Pressable } from "react-native";
import { styles } from "./AppHeader.styles";
import { UndoIcon } from "@/assets/icons";
import { AppText } from "@/components/common/AppText";

interface HeaderLeftProps {
  type: "icon" | "button";
  onPress: () => void;
  label?: string;
}

export function HeaderLeft({ type, onPress, label }: HeaderLeftProps) {
  if (type === "button") {
    return (
      <Pressable
        style={styles.leftButton}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label ?? "이전"}
      >
        <AppText style={styles.leftButtonText}>{label ?? "이전"}</AppText>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="뒤로 가기">
      <UndoIcon />
    </Pressable>
  );
}
