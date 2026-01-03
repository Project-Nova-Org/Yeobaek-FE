import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { loginButtonStyles } from "./LoginButton.styles";
import { KakaoIcon } from "@/assets/icons";
import { AppleIcon } from "@/assets/icons";
import { GoogleIcon } from "@/assets/icons";

interface LoginButtonsProps {
  onPress: () => void;
}

const LoginButtons = ({ onPress }: LoginButtonsProps) => {
  const [activeType, setActiveType] = useState<"none" | "kakao" | "apple" | "google">("none");

  const handlePress = (type: "kakao" | "apple" | "google") => {
    setActiveType(type);
    onPress();
    setTimeout(() => setActiveType("none"), 500);
  };

  return (
    <View style={loginButtonStyles.container}>
      {/* 카카오 로그인 */}
      <Pressable
        disabled={activeType !== "none" && activeType !== "kakao"}
        onPressIn={() => setActiveType("kakao")}
        onPressOut={() => setActiveType("none")}
        onPress={() => handlePress("kakao")}
        style={[loginButtonStyles.buttonBase, loginButtonStyles.kakaoButton]}
      >
        <KakaoIcon width={24} height={24} style={loginButtonStyles.icon} />
        <Text style={[loginButtonStyles.buttonText, loginButtonStyles.kakaoText]}>
          카카오로 계속하기
        </Text>
      </Pressable>

      {/* 애플 로그인 */}
      <Pressable
        disabled={activeType !== "none" && activeType !== "apple"}
        onPressIn={() => setActiveType("apple")}
        onPressOut={() => setActiveType("none")}
        onPress={() => handlePress("apple")}
        style={[loginButtonStyles.buttonBase, loginButtonStyles.appleButton]}
      >
        <AppleIcon width={24} height={24} style={loginButtonStyles.icon} />
        <Text style={[loginButtonStyles.buttonText, loginButtonStyles.appleText]}>
          Apple로 계속하기
        </Text>
      </Pressable>

      {/* 구글 로그인 */}
      <Pressable
        disabled={activeType !== "none" && activeType !== "google"}
        onPressIn={() => setActiveType("google")}
        onPressOut={() => setActiveType("none")}
        onPress={() => handlePress("google")}
        style={[loginButtonStyles.buttonBase, loginButtonStyles.googleButton]}
      >
        <GoogleIcon width={24} height={24} style={loginButtonStyles.icon} />
        <Text style={[loginButtonStyles.buttonText, loginButtonStyles.googleText]}>
          Google로 계속하기
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginButtons;
