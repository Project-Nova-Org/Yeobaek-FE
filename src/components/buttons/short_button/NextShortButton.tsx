import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/Apptext";
import { shortButtonStyles } from "./ShortButton.styles";

interface NextShortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const NextShortButton = ({ onPress, isActive, label = "다음" }: NextShortButtonProps) => {
  return (
    <View style={shortButtonStyles.container} pointerEvents={isActive ? "auto" : "none"}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={({ pressed }) => [
          shortButtonStyles.buttonBase,
          isActive ? shortButtonStyles.activeButton : shortButtonStyles.disabledButton,
          isActive && pressed && shortButtonStyles.buttonPressed,
        ]}
      >
        <Text
          style={[
            shortButtonStyles.buttonText,
            isActive ? shortButtonStyles.activeText : shortButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default NextShortButton;
