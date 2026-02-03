import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { CameraIcon } from "@/assets/icons";

interface CameraButtonProps {
  onPress: () => void;
  label?: string;
}

const CameraButton = ({ onPress, label = "카메라" }: CameraButtonProps) => {
  return (
    <View style={MediumButtonIconStyles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          MediumButtonIconStyles.buttonBase,
          MediumButtonIconStyles.cameraButton,
          pressed && MediumButtonIconStyles.buttonPressed,
        ]}
      >
        <CameraIcon width={14} height={12} color="#1B2A41" />
        <Text style={[MediumButtonIconStyles.buttonText, MediumButtonIconStyles.cameraText]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default CameraButton;
