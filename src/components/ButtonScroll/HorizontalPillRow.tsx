import { ScrollView, Pressable, Text } from "react-native";
import { styles } from "./ButtonScroll.styles";

interface HorizontalPillRowProps<T extends string> {
  items: readonly T[];
  selected: T | null;
  onSelect: (value: T) => void;
}

export function HorizontalPillRow<T extends string>({
  items,
  selected,
  onSelect,
}: HorizontalPillRowProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const active = selected === item;

        return (
          <Pressable
            key={item}
            style={[styles.pill, active && styles.pillActive]}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{item}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
