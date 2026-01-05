import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/Apptext";
import { MediumButtonIconStyles } from "./MediumButtonIcon.styles";
import { DeleteIcon } from "@/assets/icons";
interface DeleteOOTDButtonProps {
  onPress: () => void;
  label?: string;
}

const DeleteOOTDButton = ({ onPress, label = "OOTD 삭제하기" }: DeleteOOTDButtonProps) => {
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

export default DeleteOOTDButton;
