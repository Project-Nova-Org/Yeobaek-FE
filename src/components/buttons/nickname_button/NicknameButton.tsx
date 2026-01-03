import React from "react";
import { Pressable, Text, View } from "react-native";
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
        style={[
          nicknameButtonStyles.buttonBase,
          isActive ? nicknameButtonStyles.activeButton : nicknameButtonStyles.disabledButton,
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
