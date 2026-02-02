import { createStackNavigator } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { VirtualFittingScreen } from "@/screens/Home/VirtualFittingScreen";
import { VirtualFittingItemSelectScreen } from "@/screens/Home/VirtualFittingItemSelectScreen";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VirtualFitting" component={VirtualFittingScreen} />
      <Stack.Screen
        name="VirtualFittingItemSelect"
        component={VirtualFittingItemSelectScreen}
      />
    </Stack.Navigator>
  );
}
