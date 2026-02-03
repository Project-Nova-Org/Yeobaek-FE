import { createStackNavigator } from "@react-navigation/stack";

import { CalendarStackParamList } from "@/types/navigation/CalendarStackParamList";
import { CalendarScreen } from "@/screens/Calendar/CalendarScreen";
import LoadOotdScreen from "@/screens/Calendar/LoadOotdScreen";
import OotdCreateScreen from "@/screens/Ootd/OotdCreateScreen";

const Stack = createStackNavigator<CalendarStackParamList>();

export default function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="LoadOotd" component={LoadOotdScreen} />
      <Stack.Screen name="OotdCreate" component={OotdCreateScreen} />
    </Stack.Navigator>
  );
}
