import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import OotdCreateScreen from "@/screens/Ootd/OotdCreateScreen";

const Stack = createStackNavigator<OotdStackParamList>();

const HIDE_TAB_ROUTES = ["OotdDetail", "MakeOotd", "OotdEdit"];

export default function OotdStack({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "OOTD";

  navigation.getParent()?.setOptions({
    tabBarStyle: {
      display: HIDE_TAB_ROUTES.includes(routeName) ? "none" : "flex",
    },
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OOTD" component={OotdScreen} />
      <Stack.Screen name="OotdCreate" component={OotdCreateScreen} />
    </Stack.Navigator>
  );
}
