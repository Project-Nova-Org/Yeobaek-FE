import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MypageScreen from "./src/screens/Mypage/MypageScreen";
import HelpScreen from "./src/screens/Mypage/HelpScreen";
import MyinfoScreen from "./src/screens/Mypage/MyinfoScreen";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Myinfo" component={MyinfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
