import { createStackNavigator } from "@react-navigation/stack";

import { MypageStackParamList } from "@/types/navigation/MypageStackParamList";
import MypageScreen from "@/screens/Mypage/MypageScreen";
import HelpScreen from "@/screens/Mypage/HelpScreen";
import MyinfoScreen from "@/screens/Mypage/MyinfoScreen";
import NicknameEditScreen from "@/screens/Mypage/NicknameChangeScreen";

const Stack = createStackNavigator<MypageStackParamList>();

export default function MypageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mypage" component={MypageScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Myinfo" component={MyinfoScreen} />
      <Stack.Screen name="NicknameEdit" component={NicknameEditScreen} />
    </Stack.Navigator>
  );
}
