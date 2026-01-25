import { createStackNavigator } from "@react-navigation/stack";

import { CalendarStackParamList } from "@/types/navigation/CalendarStackParamList";
import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";

const Stack = createStackNavigator<CalendarStackParamList>();

export default function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
}
