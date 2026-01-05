import React from "react";
import { Pressable, View } from "react-native";
import { addButtonStyles } from "./AddButton.styles";
import { AddIcon } from "@/assets/icons";

interface AddButtonProps {
  onPress: () => void;
}

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <View style={addButtonStyles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [addButtonStyles.dashedBox, { opacity: pressed ? 0.7 : 1 }]}
      >
        <AddIcon width={20} height={20} />
      </Pressable>
    </View>
  );
};

export default AddButton;
