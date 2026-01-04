import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { TopByTab } from "@/components/Top";
import { Colors } from "@/theme/colors.ts";

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

export default function TestPlace() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const TopComponent = TopByTab[activeTab];

  return (
    <View style={styles.container}>
      <View>
        <TopComponent />
      </View>

      <View style={styles.body} />

      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    flex: 1,
  },
});
