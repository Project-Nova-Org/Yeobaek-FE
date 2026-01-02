import { Pressable, Text } from "react-native";
import { styles } from "./AppHeader.styles";
import { UndoIcon } from "@/assets/icons";

interface HeaderLeftProps {
  type: "icon" | "button";
  onPress: () => void;
  label?: string;
}

export function HeaderLeft({ type, onPress, label }: HeaderLeftProps) {
  if (type === "button") {
    return (
      <Pressable style={styles.leftButton} onPress={onPress}>
        <Text style={styles.leftButtonText}>{label ?? "이전"}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <UndoIcon />
    </Pressable>
  );
}
