import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/Apptext";
import { MediumButtonStyles } from "./MediumButton.styles";

interface DiffPhotoChangeButtonProps {
  onPress: () => void;
  label?: string;
}

const DiffPhotoChangeButton = ({
  onPress,
  label = "다른 사진으로 변경하기",
}: DiffPhotoChangeButtonProps) => {
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

export default DiffPhotoChangeButton;
