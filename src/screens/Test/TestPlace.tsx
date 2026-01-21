import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { BottomTabBar } from "@/components/BottomTabBar/BottomTabBar";
import { TopByTab } from "@/components/Top";
import { Colors } from "@/theme/colors";
import { SimpleTopBarProps } from "@/components/Top/SimpleTopBar";

import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import {DressroomScreen} from "@/screens/Dressroom/DressroomScreen";
import { StatsScreen } from "@/screens/Stats/StatsScreen";
import MypageScreen from "@/screens/Mypage/MypageScreen";
import HelpScreen from "@/screens/Mypage/HelpScreen";
import MyinfoScreen from "@/screens/Mypage/MyinfoScreen";
import NicknameEditScreen from "@/screens/Mypage/NicknameChangeScreen";
import UnwornScreen from "@/screens/Stats/UnwornScreen";
import  OotdCreateScreen  from "@/screens/Ootd/OotdCreateScreen";

import { RootStackParamList } from "@/types/navigation";
import {ItemPlus} from "@/assets/icons";

type TabKey = "calendar" | "ootd" | "home" | "dressroom" | "stats";

interface MainTabContentProps {
  navigation: StackNavigationProp<RootStackParamList, "HomeMain">;
}

type TabScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

const BodyByTab: Record<TabKey, React.ComponentType<TabScreenProps>> = {
  calendar: CalendarScreen,
  ootd: OotdScreen,
  home: HomeScreen,
  dressroom: DressroomScreen,
  stats: StatsScreen,
};

function MainTabContent({ navigation }: MainTabContentProps) {
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
        {TopComponent && <TopComponent title={activeTab.toUpperCase()} />}

        <View style={styles.body}>
          <BodyComponent navigation={navigation} />
        </View>

        {!isKeyboardVisible && (
            <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
        )}
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
        <Stack.Screen name="UnwornDetail" component={UnwornScreen} />
          <Stack.Screen name="OotdCreate" component={OotdCreateScreen} />
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
    paddingBottom: 88,
  },
});
