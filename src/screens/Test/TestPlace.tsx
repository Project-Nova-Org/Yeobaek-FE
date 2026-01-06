import { View, StyleSheet, Keyboard } from "react-native";
import { useEffect, useState } from "react";

import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { TopByTab } from "@/components/Top";

import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { DressroomScreen } from "@/screens/Dressroom/DressroomScreen";
import { StatsScreen } from "@/screens/Stats/StatsScreen";
import { Colors } from "@/theme/colors";

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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const TopComponent = TopByTab[activeTab];
  const BodyComponent = BodyByTab[activeTab];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
        setIsKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
        setIsKeyboardVisible(false)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
      <View style={styles.container}>
        {TopComponent && <TopComponent />}

        <View style={styles.body}>
          <BodyComponent />
        </View>

        {/* 키보드 열리면 하단바 숨김 */}
        {!isKeyboardVisible && (
            <BottomTabBar
                activeTab={activeTab}
                onChangeTab={setActiveTab}
            />
        )}
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