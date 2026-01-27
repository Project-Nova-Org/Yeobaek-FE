import { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { DressroomStackParamList } from "@/types/navigation/DressroomStackParamList";
import { DressroomScreen } from "@/screens/Dressroom/DressroomScreen";
import { ClosetDetailScreen } from "@/screens/Dressroom/Closet/ClosetDetailScreen.tsx";
import { ItemDetailScreen } from "@/screens/Dressroom/Item/ItemDetailScreen.tsx";

const Stack = createStackNavigator<DressroomStackParamList>();

const HIDE_TAB_ROUTES = [
  "ClosetDetail",
  "ItemDetail",
  "MakeCloset",
  "MakeItem",
  "EditCloset",
  "EditItem",
];

export default function DressroomStack({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Dressroom";

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: HIDE_TAB_ROUTES.includes(routeName) ? "none" : "flex",
      },
    });
  }, [navigation, routeName]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dressroom" component={DressroomScreen} />
      <Stack.Screen name="ClosetDetail" component={ClosetDetailScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
    </Stack.Navigator>
  );
}
