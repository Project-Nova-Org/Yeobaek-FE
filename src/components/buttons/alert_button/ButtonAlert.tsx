import React from "react";
import { View, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { buttonStyles } from "./ButtonAlert.styles.ts";

export interface SelectionButtonsProps {
  onYesPress: () => void;
  onNoPress: () => void;
}
const SelectionButtons = ({ onYesPress, onNoPress }: SelectionButtonsProps) => {
  return (
    <View style={buttonStyles.container}>
      {/* 아니오 버튼 */}
      <Pressable
        onPress={onNoPress}
        style={({ pressed }) => [
          buttonStyles.buttonBase,
          pressed ? buttonStyles.noPressed : buttonStyles.noDefault,
        ]}
      >
        {({ pressed }) => (
          <>
            {/* 눌렀을 때만 Inner Shadow 레이어 표시 */}
            {pressed && <View style={buttonStyles.innerShadow} />}
            <Text style={buttonStyles.buttonText}>아니오</Text>
          </>
        )}
      </Pressable>
      {/* 예 버튼 */}
      <Pressable
        onPress={onYesPress}
        style={({ pressed }) => [
          buttonStyles.buttonBase,
          pressed ? buttonStyles.yesPressed : buttonStyles.yesDefault,
        ]}
      >
        {({ pressed }) => (
          <>
            {pressed && <View style={buttonStyles.innerShadow} />}
            <Text style={buttonStyles.buttonText}>예</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SelectionButtons;
