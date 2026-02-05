import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CustomInfoProvider } from "@/context/CustomInfoContext";
import { RootStackParamList } from "@/types/navigation/RootStackParamList";
import MainTabNavigator from "./MainTabNavigator";
import MypageStackNavigator from "./MypageStackNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <CustomInfoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="MypageStack" component={MypageStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </CustomInfoProvider>
  );
}
