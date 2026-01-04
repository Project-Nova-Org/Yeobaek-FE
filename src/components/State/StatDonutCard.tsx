import { View } from "react-native";
import { DonutStat } from "./Chart.types";
import { DonutChart } from "./DonutChart";
import { LegendRow } from "./LegendRow";
import { styles } from "./Chart.styles";
import { AppText } from "@/components/common/AppText";

interface StatDonutCardProps {
  stat: DonutStat;
}

export function StatDonutCard({ stat }: StatDonutCardProps) {
  const isColorStat = stat.title === "색상별 옷 비율";

  return (
    <View style={styles.card}>
      <AppText style={styles.title}>{stat.title}</AppText>

      <LegendRow items={stat.items} variant={isColorStat ? "dotOnly" : "dotWithLabel"} />

      <DonutChart items={stat.items} />
    </View>
  );
}
