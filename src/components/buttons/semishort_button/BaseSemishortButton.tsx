import React from "react";
import { Pressable, Text, View } from "react-native";
import { semishortButtonStyles } from "./SemishortButton.styles";

interface BaseSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label: string;
}

export const BaseSemishortButton = ({ onPress, isActive, label }: BaseSemishortButtonProps) => {
  return (
    <View style={semishortButtonStyles.container}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={({ pressed }) => [
          semishortButtonStyles.buttonBase,
          isActive ? semishortButtonStyles.activeButton : semishortButtonStyles.disabledButton,
          isActive && pressed && semishortButtonStyles.buttonPressed,
        ]}
      >
        <Text
          style={[
            semishortButtonStyles.buttonText,
            isActive ? semishortButtonStyles.activeText : semishortButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};
