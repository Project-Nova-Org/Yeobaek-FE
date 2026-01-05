import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/Apptext";
import { nicknameButtonStyles } from "./NicknameButton.styles";

interface NicknameButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const NicknameButton = ({ onPress, isActive, label = "닉네임 변경하기" }: NicknameButtonProps) => {
  return (
    <View style={nicknameButtonStyles.container} pointerEvents={isActive ? "auto" : "none"}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={({ pressed }) => [
          nicknameButtonStyles.buttonBase,
          isActive ? nicknameButtonStyles.activeButton : nicknameButtonStyles.disabledButton,
          isActive && pressed && nicknameButtonStyles.buttonPressed,
        ]}
      >
        <Text
          style={[
            nicknameButtonStyles.buttonText,
            isActive ? nicknameButtonStyles.activeText : nicknameButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default NicknameButton;
