import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

export default function TestPlace() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <View style={styles.container}>
      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  text: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 16,
  },
});
