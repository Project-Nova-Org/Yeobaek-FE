import { Pressable, Text, View } from "react-native";
import { styles } from "./AppHeader.styles";

interface HeaderRightProps {
  type: "button" | "icons" | "icon";
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
  icons?: React.ReactNode[];
}

export function HeaderRight({ type, disabled, label, onPress, icons }: HeaderRightProps) {
  if (type === "icons") {
    return <View style={styles.iconGroup}>{icons}</View>;
  }

  if (type === "icon") {
    return <Pressable onPress={onPress}>{icons?.[0]}</Pressable>;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.rightButton, disabled && styles.rightButtonDisabled]}
    >
      <Text style={[styles.rightButtonText, disabled && styles.rightButtonTextDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}
