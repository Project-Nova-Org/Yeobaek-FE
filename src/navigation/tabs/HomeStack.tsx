import { createStackNavigator } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { HomeScreen } from "@/screens/Home/HomeScreen";
import { ChatBot } from "@/screens/Home/ChatBot/ChatBot";
import { PersonalPairing } from "@/screens/Home/PersonalPairing/PersonalPairing";
import { PersonalPairingResult } from "@/screens/Home/PersonalPairing/PersonalPairingResult";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="PersonalPairing" component={PersonalPairing} />
      <Stack.Screen name="PersonalPairingResult" component={PersonalPairingResult} />
    </Stack.Navigator>
  );
}
