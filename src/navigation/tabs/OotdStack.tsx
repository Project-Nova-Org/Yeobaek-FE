import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";

import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import { OotdScreen } from "@/screens/Ootd/OotdScreen";
import OotdCreateScreen from "@/screens/Ootd/OotdCreateScreen";
import OotdCreateInfoScreen from "@/screens/Ootd/OotdCreateInfoScreen";
import OotdDetailScreen from "@/screens/Ootd/OotdDetailScreen";

const Stack = createStackNavigator<OotdStackParamList>();

const HIDE_TAB_ROUTES = ["OotdCreate", "OotdCreateInfo", "OotdDetail", "OotdEdit"];

export default function OotdStack({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "OOTD";

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: HIDE_TAB_ROUTES.includes(routeName) ? "none" : "flex",
      },
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OOTD" component={OotdScreen} />
      <Stack.Screen name="OotdDetail" component={OotdDetailScreen} />
      <Stack.Screen name="OotdCreate" component={OotdCreateScreen} />
      <Stack.Screen name="OotdCreateInfo" component={OotdCreateInfoScreen} />
    </Stack.Navigator>
  );
}
