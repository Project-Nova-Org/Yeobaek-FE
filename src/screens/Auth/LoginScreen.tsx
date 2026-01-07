import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/components/common/AppText";
import LoginButtons from "@/components/Buttons/login_button/LoginButton";
import { authStyles as styles } from "@/screens/Auth/Auth.styles";
import { LoginLogoIcon, TitleIcon } from "@/assets/icons";

export default function LoginScreen() {
  const handleLogin = async (type: "kakao" | "google") => {
    switch (type) {
      case "kakao":
        console.log("Kakao Login");
        break;
      case "google":
        console.log("Google Login");
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoSection}>
          <LoginLogoIcon width={240} height={240} />
          <TitleIcon width={160} height={50} style={styles.title} />
          <AppText style={styles.subtitle}>나만의 디지털 옷장</AppText>
        </View>

        <LoginButtons onPress={handleLogin} />

        <AppText style={styles.description}>
          회원가입 없이 소셜 계정을 통해 바로 이용 가능하며{"\n"}첫 로그인 시 이용약관 및
          개인정보처리방침 동의로 간주됩니다.
        </AppText>
      </View>
    </SafeAreaView>
  );
}
