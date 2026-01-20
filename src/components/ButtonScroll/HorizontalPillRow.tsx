import { ScrollView, Pressable, Text } from "react-native";
import { styles } from "./ButtonScroll.styles";

interface HorizontalPillRowProps<T extends string> {
  items: readonly T[];
  selected: T | null;
  onSelect: (value: T) => void;
  variant?: "default" | "sub";
}

export function HorizontalPillRow<T extends string>({
  items,
  selected,
  onSelect,
  variant = "default",
}: HorizontalPillRowProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={variant === "sub" ? styles.subRow : styles.row}
    >
      {items.map((item) => {
        const active = selected === item;

        return (
          <Pressable
            key={item}
            style={[variant === "sub" ? styles.pillSub : styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                variant === "sub" ? styles.pillTextSub : styles.pillText,
                active && styles.pillTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
