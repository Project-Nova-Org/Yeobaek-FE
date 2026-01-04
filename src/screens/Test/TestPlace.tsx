import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { TopByTab } from "@/components/Top";

import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { DressroomScreen } from "@/screens/Dressroom/DressroomScreen";
import { StatsScreen } from "@/screens/Stats/StatsScreen";

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

const BodyByTab: Record<TabKey, React.ComponentType> = {
  calendar: CalendarScreen,
  ootd: OotdScreen,
  home: HomeScreen,
  dressroom: DressroomScreen,
  stats: StatsScreen,
};

export default function TestPlace() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const TopComponent = TopByTab[activeTab];
  const BodyComponent = BodyByTab[activeTab];

  return (
    <View style={styles.container}>
      <TopComponent />

      <View style={styles.body}>
        <BodyComponent />
      </View>

      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  body: {
    flex: 1,
  },
});
