import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { OOTDIcon } from "@/assets/icons";

interface LoadOOTDButtonProps {
  onPress: () => void;
  label?: string;
}

const LoadOOTDButton = ({ onPress, label = "OOTD 불러오기" }: LoadOOTDButtonProps) => {
  const iconColor = MediumButtonIconStyles.buttonText.color;
  return (
    <View style={MediumButtonIconStyles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          MediumButtonIconStyles.buttonBase,
          pressed && MediumButtonIconStyles.buttonPressed,
        ]}
      >
        <OOTDIcon width={10} height={10} color={iconColor} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LoadOOTDButton;
