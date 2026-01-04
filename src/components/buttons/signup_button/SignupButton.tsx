import React from "react";
import { Pressable, Text, View } from "react-native";
import { signupButtonStyles } from "./SignupButton.styles";

interface SignupButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const SignupButton = ({ onPress, isActive, label = "회원가입 완료하기" }: SignupButtonProps) => {
  return (
    <View style={signupButtonStyles.container} pointerEvents={isActive ? "auto" : "none"}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={({ pressed }) => [
          signupButtonStyles.buttonBase,
          isActive ? signupButtonStyles.activeButton : signupButtonStyles.disabledButton,
          isActive && pressed && signupButtonStyles.buttonPressed,
        ]}
      >
        <Text
          style={[
            signupButtonStyles.buttonText,
            isActive ? signupButtonStyles.activeText : signupButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignupButton;
