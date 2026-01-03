import React from "react";
import { Pressable, Text, View } from "react-native";
import { MediumButtonStyles } from "./MediumButton.styles";

interface FullbodyChangeButtonProps {
  onPress: () => void;
  label?: string;
}

const FullbodyChangeButton = ({
  onPress,
  label = "전신 사진 변경하기",
}: FullbodyChangeButtonProps) => {
  return (
    <View style={MediumButtonStyles.container}>
      <Pressable onPress={onPress} style={[MediumButtonStyles.buttonBase]}>
        <Text style={MediumButtonStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default FullbodyChangeButton;
