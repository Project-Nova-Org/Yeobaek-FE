import { ScrollView, View } from "react-native";
import { StatDonutCard } from "@/components/State/StatDonutCard.tsx";
import { statData } from "./statData.ts";

export function StatsScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ gap: 16 }}>
        {statData.map((stat) => (
          <StatDonutCard key={stat.title} stat={stat} />
        ))}
      </View>
    </ScrollView>
  );
}
