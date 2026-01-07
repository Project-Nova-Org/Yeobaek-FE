import { useState } from "react";
import { sinupStyles as styles } from "@/screens/Auth/Auth.styles.ts";
import { View } from "react-native";
import { AppText } from "@/components/common/AppText.tsx";
import { NicknameInput } from "@/components/Input/NicknameInput.tsx";
import SignupButton from "@/components/Buttons/signup_button/SignupButton.tsx";

export default function SignupScreen() {
  const [nickname, setNickname] = useState("");
  const isValidNickname =
    nickname.length > 0 && nickname.length <= 10 && /^[가-힣a-zA-Z0-9\s]*$/.test(nickname);

  const handleSignup = () => {
    console.log("회원가입 닉네임:", nickname);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title}>닉네임을 입력해주세요</AppText>

        <NicknameInput value={nickname} onChange={setNickname} />
      </View>

      <SignupButton onPress={handleSignup} isActive={isValidNickname} />
    </View>
  );
}
