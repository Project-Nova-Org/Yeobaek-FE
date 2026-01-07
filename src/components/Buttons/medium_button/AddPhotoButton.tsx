import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { PlusIcon } from "@/assets/icons";
interface AddPhotoButtonProps {
  onPress: () => void;
  label?: string;
}

const AddPhotoButton = ({ onPress, label = "사진 추가하기" }: AddPhotoButtonProps) => {
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
        <PlusIcon width={10} height={10} color={iconColor} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default AddPhotoButton;
