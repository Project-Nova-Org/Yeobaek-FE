import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { TopByTab } from "@/components/Top";
import { Colors } from "@/theme/colors";
import { SimpleTopBarProps } from "@/components/Top/SimpleTopBar.tsx";

import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { DressroomScreen } from "@/screens/Dressroom/DressroomScreen";
import { StatsScreen } from "@/screens/Stats/StatsScreen";
import MypageScreen from "@/screens/Mypage/MypageScreen";
import HelpScreen from "@/screens/Mypage/HelpScreen";
import MyinfoScreen from "@/screens/Mypage/MyinfoScreen";
import NicknameEditScreen from "@/screens/Mypage/NicknameChangeScreen";

// 내비게이션 타입 정의
export type RootStackParamList = {
  HomeMain: undefined;
  Mypage: undefined;
  Help: undefined;
  Myinfo: { initialData?: any } | undefined;
  NicknameEdit: { currentNickname: string };
};

const Stack = createStackNavigator<RootStackParamList>();

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

const BodyByTab: Record<TabKey, React.ComponentType> = {
  calendar: CalendarScreen,
  ootd: OotdScreen,
  home: HomeScreen,
  dressroom: DressroomScreen,
  stats: StatsScreen,
};

function MainTabContent({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const TopComponent = TopByTab[activeTab] as React.ComponentType<SimpleTopBarProps>;
  const BodyComponent = BodyByTab[activeTab];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {TopComponent && (
        <TopComponent
          title={activeTab.toUpperCase()}
          onProfilePress={() => navigation.navigate("Mypage")}
        />
      )}

      <View style={styles.body}>
        <BodyComponent />
      </View>

      {!isKeyboardVisible && <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />}
    </View>
  );
}

export default function TestPlace() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeMain">
        <Stack.Screen name="HomeMain" component={MainTabContent} />
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Myinfo" component={MyinfoScreen} />
        <Stack.Screen name="NicknameEdit" component={NicknameEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
