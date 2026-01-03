import { View } from "react-native";
import { DonutStatItem } from "./Chart.types";
import { styles } from "./Chart.styles";
import { AppText } from "@/components/common/AppText";

interface LegendRowProps {
  items: DonutStatItem[];
  variant?: "dotWithLabel" | "dotOnly";
}

export function LegendRow({ items, variant = "dotWithLabel" }: LegendRowProps) {
  if (variant === "dotOnly") {
    return (
      <View style={styles.dotLegendRow}>
        {items.map((item) => (
          <View
            key={item.label}
            style={[styles.legendDot, styles.legendDotOnly, { backgroundColor: item.color }]}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.legendRow}>
      {items.map((item) => (
        <View key={item.label} style={styles.legendColumn}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <AppText style={styles.legendText}>{item.label}</AppText>
        </View>
      ))}
    </View>
  );
}
