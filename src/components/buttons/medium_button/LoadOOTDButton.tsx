import React from "react";
import { Pressable, Text, View } from "react-native";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { OOTDIcon } from "@/assets/icons";
interface LoadOOTDButtonProps {
  onPress: () => void;
  label?: string;
}

const LoadOOTDButton = ({ onPress, label = "OOTD 불러오기" }: LoadOOTDButtonProps) => {
  return (
    <View style={MediumButtonIconStyles.container}>
      <Pressable onPress={onPress} style={[MediumButtonIconStyles.buttonBase]}>
        <OOTDIcon width={10} height={10} color={MediumButtonIconStyles.buttonText.color} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LoadOOTDButton;
