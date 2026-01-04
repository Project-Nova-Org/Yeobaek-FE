import React from "react";
import { Pressable, Text, View } from "react-native";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { DeleteIcon } from "@/assets/icons";
interface DeletePhotoButtonProps {
  onPress: () => void;
  label?: string;
}

const DeletePhotoButton = ({ onPress, label = "사진 삭제하기" }: DeletePhotoButtonProps) => {
  return (
    <View style={MediumButtonIconStyles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          MediumButtonIconStyles.buttonBase,
          pressed && MediumButtonIconStyles.buttonPressed,
        ]}
      >
        <DeleteIcon width={10} height={10} color={MediumButtonIconStyles.buttonText.color} />
        <Text style={MediumButtonIconStyles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default DeletePhotoButton;
