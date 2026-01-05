import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { DeleteIcon } from "@/assets/icons";
interface DeletePhotoButtonProps {
  onPress: () => void;
  label?: string;
}

const DeletePhotoButton = ({ onPress, label = "사진 삭제하기" }: DeletePhotoButtonProps) => {
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
        <DeleteIcon width={10} height={10} color={iconColor} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default DeletePhotoButton;
