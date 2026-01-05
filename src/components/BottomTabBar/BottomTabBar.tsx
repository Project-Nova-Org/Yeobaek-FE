import { View } from "react-native";
import { TabItem } from "./TabItem";
import { barStyles } from "./BottomTabBar.styles";
import { FloatingMenu } from "./FloatingMenu";
import { FloatingHidden } from "@/components/BottomTabBar/FloatingHidden.tsx";
import { Shadow } from "react-native-shadow-2";

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

interface BottomTabBarProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

export function BottomTabBar({ activeTab, onChangeTab }: BottomTabBarProps) {
  const isHome = activeTab === "home";

  return (
    <View style={barStyles.container} pointerEvents="box-none">
      {isHome && <FloatingMenu />}

      <View style={barStyles.shadowLayer} pointerEvents="none">
        <Shadow
          startColor="rgba(0,0,0,0.12)"
          endColor="rgba(0,0,0,0)"
          distance={10}
          offset={[0, 0]}
          style={barStyles.tabBarShadow}
        />
      </View>

      <View style={barStyles.tabBar}>
        <TabItem
          label="달력"
          active={activeTab === "calendar"}
          onPress={() => onChangeTab("calendar")}
        />
        <TabItem label="OOTD" active={activeTab === "ootd"} onPress={() => onChangeTab("ootd")} />
        <TabItem label="홈" active={activeTab === "home"} onPress={() => onChangeTab("home")} />
        <TabItem
          label="드레스룸"
          active={activeTab === "dressroom"}
          onPress={() => onChangeTab("dressroom")}
        />
        <TabItem label="통계" active={activeTab === "stats"} onPress={() => onChangeTab("stats")} />
      </View>
      {isHome && <FloatingHidden />}
    </View>
  );
}
