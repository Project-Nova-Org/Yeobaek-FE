import { createStackNavigator } from "@react-navigation/stack";

import { StatsStackParamList } from "@/types/navigation/StatsStackParamList";
import { StatsScreen } from "@/screens/Stats/StatsScreen";
import NoWearingScreen from "@/screens/Stats/UnwornScreen";

const Stack = createStackNavigator<StatsStackParamList>();

export default function StatsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="UnwornDetail" component={NoWearingScreen} />
    </Stack.Navigator>
  );
}
