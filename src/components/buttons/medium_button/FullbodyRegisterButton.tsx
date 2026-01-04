import React from "react";
import { Pressable, Text, View } from "react-native";
import { MediumButtonStyles } from "./MediumButton.styles";

interface FullbodyRegisterButtonProps {
  onPress: () => void;
  label?: string;
}

const FullbodyRegisterButton = ({
  onPress,
  label = "전신 사진 등록하기",
}: FullbodyRegisterButtonProps) => {
  return (
    <View style={MediumButtonStyles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          MediumButtonStyles.buttonBase,
          pressed && MediumButtonStyles.buttonPressed,
        ]}
      >
        <Text style={MediumButtonStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default FullbodyRegisterButton;
