import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MypageScreen from "./src/screens/Mypage/MypageScreen";
import HelpScreen from "./src/screens/Mypage/HelpScreen";
import MyinfoScreen from "./src/screens/Mypage/MyinfoScreen";
import NicknameEditScreen from "./src/screens/Mypage/NicknameChangeScreen";

export type RootStackParamList = {
  Mypage: undefined;
  Help: undefined;
  Myinfo: { initialData?: any } | undefined;
  NicknameEdit: { currentNickname: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Mypage">
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Myinfo" component={MyinfoScreen} />
        <Stack.Screen name="NicknameEdit" component={NicknameEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
