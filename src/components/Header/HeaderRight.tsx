import { Pressable, Text, View } from "react-native";
import { styles } from "./AppHeader.styles";

type HeaderRightProps =
  | {
      type: "button";
      disabled: boolean;
      label: string;
      onPress: () => void;
    }
  | {
      type: "icon";
      onPress: () => void;
      icons: React.ReactNode[];
    }
  | {
      type: "icons";
      icons: React.ReactNode[];
    };

export function HeaderRight(props: HeaderRightProps) {
  if (props.type === "icons") {
    return <View style={styles.iconGroup}>{props.icons}</View>;
  }

  if (props.type === "icon") {
    if (!props.icons?.[0] || !props.onPress) {
      console.warn('HeaderRight: type="icon" requires icons array and onPress handler');
      return null;
    }
    return (
      <Pressable
        onPress={props.onPress}
        accessibilityRole="button"
        accessibilityLabel="아이콘 버튼"
      >
        {props.icons?.[0]}
      </Pressable>
    );
  }

  return (() => {
    if (!props.label || !props.onPress) {
      console.warn('HeaderRight: type="button" requires label and onPress handler');
      return null;
    }
    return (
      <Pressable
        onPress={props.onPress}
        disabled={props.disabled}
        style={[styles.rightButton, props.disabled && styles.rightButtonDisabled]}
        accessibilityRole="button"
        accessibilityLabel={props.label}
      >
        <Text style={[styles.rightButtonText, props.disabled && styles.rightButtonTextDisabled]}>
          {props.label}
        </Text>
      </Pressable>
    );
  })();
}
