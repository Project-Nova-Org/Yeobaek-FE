import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { MainTabParamList } from "@/types/navigation/MainTabParamList";

import CalendarStack from "./tabs/CalendarStack";
import OotdStack from "./tabs/OotdStack";
import HomeStack from "./tabs/HomeStack";
import DressroomStack from "./tabs/DressroomStack";
import StatsStack from "./tabs/StatsStack";

const Tab = createBottomTabNavigator<MainTabParamList>();

function renderBottomTabBar(props: BottomTabBarProps) {
  return <BottomTabBar {...props} />;
}

const HIDE_TAB_ROUTES = [
  "ItemDetail",
  "MakeCloset",
  "AddItemToCloset",
  "EditClosetInfo",
  "EditItemInCloset",
  "MakeItem",
  "EditCloset",
  "EditItem",
  "OotdCreate",
  "OotdCreateInfo",
  "OotdDetail",
];

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={renderBottomTabBar}
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

        // DressroomTab, OotdTab 등 어떤 탭이든 포커스된 화면이 목록에 있으면 탭 바 숨김
        const shouldHideTabBar = HIDE_TAB_ROUTES.includes(routeName);

        return {
          headerShown: false,
          tabBarStyle: {
            display: shouldHideTabBar ? "none" : "flex",
          },
        };
      }}
    >
      <Tab.Screen name="CalendarTab" component={CalendarStack} />
      <Tab.Screen name="OotdTab" component={OotdStack} />
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="DressroomTab" component={DressroomStack} />
      <Tab.Screen name="StatsTab" component={StatsStack} />
    </Tab.Navigator>
  );
}
