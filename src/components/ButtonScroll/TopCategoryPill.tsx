import { Pressable, Text, LayoutChangeEvent } from "react-native";
import { FilterCloseIcon } from "@/assets/icons";
import { styles } from "./ButtonScroll.styles";
import type { TopCategory } from "./ButtonScroll.types";
import { Colors } from "@/theme/colors.ts";

interface Props {
  label: TopCategory;
  active: boolean;
  showClose: boolean;
  onPress: () => void;
  onClear: () => void;
  onLayout: (x: number, width: number) => void;
}

export function TopCategoryPill({ label, active, showClose, onPress, onClear, onLayout }: Props) {
  const handleLayout = (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    onLayout(x, width);
  };

  return (
    <Pressable
      onLayout={handleLayout}
      style={[styles.pill, active && styles.pillActive, showClose && styles.pillWithClose]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>

      {showClose && (
        <Pressable style={styles.closeAbsolute} onPress={onClear} hitSlop={8}>
          <FilterCloseIcon width={10} height={10} color={Colors.white} />
        </Pressable>
      )}
    </Pressable>
  );
}
