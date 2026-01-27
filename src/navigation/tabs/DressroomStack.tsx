import { createStackNavigator } from "@react-navigation/stack";

import { DressroomStackParamList } from "@/types/navigation/DressroomStackParamList";
import { DressroomScreen } from "@/screens/Dressroom/DressroomScreen";
import { ClosetDetailScreen } from "@/screens/Dressroom/Closet/ClosetDetailScreen";
import { ItemDetailScreen } from "@/screens/Dressroom/Item/ItemDetailScreen";
import MakeCloset from "@/screens/Dressroom/Closet/MakeCloset.tsx";
import AddItemToCloset from "@/screens/Dressroom/Closet/AddItemToCloset.tsx";

const Stack = createStackNavigator<DressroomStackParamList>();

export default function DressroomStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dressroom" component={DressroomScreen} />
      <Stack.Screen name="ClosetDetail" component={ClosetDetailScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
      <Stack.Screen name="MakeCloset" component={MakeCloset} />
      <Stack.Screen name="AddItemToCloset" component={AddItemToCloset} />
    </Stack.Navigator>
  );
}
