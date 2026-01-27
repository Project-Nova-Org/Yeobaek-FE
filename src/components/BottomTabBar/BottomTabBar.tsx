import { View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Shadow } from "react-native-shadow-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabItem } from "./TabItem";
import { barStyles } from "./BottomTabBar.styles";
import { FloatingMenu } from "./FloatingMenu";
import { FloatingHidden } from "./FloatingHidden";

function isTabBarHidden(style: unknown) {
  return (
    typeof style === "object" &&
    style !== null &&
    !Array.isArray(style) &&
    (style as any).display === "none"
  );
}

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const focusedRoute = state.routes[state.index];
  const options = descriptors[focusedRoute.key]?.options;
  const tabBarStyle = options?.tabBarStyle;

  if (isTabBarHidden(tabBarStyle)) {
    return null;
  }

  const currentRouteName = state.routeNames[state.index];
  const isHome = currentRouteName === "HomeTab";

  const go = (routeName: string) => {
    navigation.navigate(routeName as never);
  };

  return (
    <View style={[barStyles.container, { bottom: insets.bottom }]} pointerEvents="box-none">
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
          active={currentRouteName === "CalendarTab"}
          onPress={() => go("CalendarTab")}
        />
        <TabItem
          label="OOTD"
          active={currentRouteName === "OotdTab"}
          onPress={() => go("OotdTab")}
        />
        <TabItem label="홈" active={currentRouteName === "HomeTab"} onPress={() => go("HomeTab")} />
        <TabItem
          label="드레스룸"
          active={currentRouteName === "DressroomTab"}
          onPress={() => go("DressroomTab")}
        />
        <TabItem
          label="통계"
          active={currentRouteName === "StatsTab"}
          onPress={() => go("StatsTab")}
        />
      </View>

      {isHome && <FloatingHidden />}
    </View>
  );
}
