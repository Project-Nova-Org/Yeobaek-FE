import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonStyles } from "./MediumButton.styles";

interface PhotoChangeButtonProps {
  onPress: () => void;
  label?: string;
}

const PhotoChangeButton = ({ onPress, label = "사진 변경하기" }: PhotoChangeButtonProps) => {
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

export default PhotoChangeButton;
