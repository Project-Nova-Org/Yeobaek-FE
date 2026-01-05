import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { loginButtonStyles } from "./LoginButton.styles";
import { KakaoIcon, AppleIcon, GoogleIcon } from "@/assets/icons";

interface LoginButtonsProps {
  onPress: (type: "kakao" | "apple" | "google") => void | Promise<void>;
}

const LoginButtons = ({ onPress }: LoginButtonsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handlePress = async (type: "kakao" | "apple" | "google") => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onPress(type);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={loginButtonStyles.container}>
      {/* 카카오 로그인 */}
      <Pressable
        disabled={isSubmitting}
        onPress={() => handlePress("kakao")}
        style={({ pressed }) => [
          loginButtonStyles.buttonBase,
          loginButtonStyles.kakaoButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <KakaoIcon width={24} height={24} style={loginButtonStyles.icon} />
        <Text style={[loginButtonStyles.buttonText, loginButtonStyles.kakaoText]}>
          카카오로 계속하기
        </Text>
      </Pressable>

      {/* 애플 로그인 */}
      <Pressable
        disabled={isSubmitting}
        onPress={() => handlePress("apple")}
        style={({ pressed }) => [
          loginButtonStyles.buttonBase,
          loginButtonStyles.appleButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <AppleIcon width={24} height={24} style={loginButtonStyles.icon} />
        <Text style={[loginButtonStyles.buttonText, loginButtonStyles.appleText]}>
          Apple로 계속하기
        </Text>
      </Pressable>

      {/* 구글 로그인 */}
      <Pressable
        disabled={isSubmitting}
        onPress={() => handlePress("google")}
        style={({ pressed }) => [
          loginButtonStyles.buttonBase,
          loginButtonStyles.googleButton,
          pressed && { opacity: 0.7 },
        ]}
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
