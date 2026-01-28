import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { GalleryIcon } from "@/assets/icons";
interface GalleryButtonProps {
  onPress: () => void;
  label?: string;
}

const GalleryButton = ({ onPress, label = "갤러리" }: GalleryButtonProps) => {
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
        <GalleryIcon width={12} height={12} color={iconColor} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default GalleryButton;
