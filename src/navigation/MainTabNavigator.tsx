import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

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

export default function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderBottomTabBar}>
      <Tab.Screen name="CalendarTab" component={CalendarStack} />
      <Tab.Screen name="OotdTab" component={OotdStack} />
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="DressroomTab" component={DressroomStack} />
      <Tab.Screen name="StatsTab" component={StatsStack} />
    </Tab.Navigator>
  );
}
