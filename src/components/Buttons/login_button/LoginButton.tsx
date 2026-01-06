import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { loginButtonStyles } from "./LoginButton.styles";
import { KakaoIcon, GoogleIcon } from "@/assets/icons";

interface LoginButtonsProps {
  onPress: (type: "kakao" | "google") => void | Promise<void>;
}

const LoginButtons = ({ onPress }: LoginButtonsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handlePress = async (type: "kakao" | "google") => {
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
        <Text style={[loginButtonStyles.kakaoButtonText]}>카카오로 계속하기</Text>
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
        <Text style={[loginButtonStyles.googleButtonText]}>Google로 계속하기</Text>
      </Pressable>
    </View>
  );
};

export default LoginButtons;
