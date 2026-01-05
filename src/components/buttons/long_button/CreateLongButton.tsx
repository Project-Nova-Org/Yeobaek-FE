import React from "react";
import { Pressable, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { LongButtonStyles } from "./LongButton.styles";

interface CreateLongButtonProps {
  onPress: () => void;
  isActive: boolean; // 활성화 여부 결정
  label?: string;
}

const CreateLongButton = ({ onPress, isActive, label = "생 성" }: CreateLongButtonProps) => {
  return (
    <View
      style={LongButtonStyles.container}
      // 비활성화 시 터치 이벤트가 아예 발생x
      pointerEvents={isActive ? "auto" : "none"}
    >
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={({ pressed }) => [
          LongButtonStyles.buttonBase,
          isActive ? LongButtonStyles.activeButton : LongButtonStyles.disabledButton,
          isActive && pressed && LongButtonStyles.buttonPressed,
        ]}
      >
        <Text
          style={[
            LongButtonStyles.buttonText,
            isActive ? LongButtonStyles.activeText : LongButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateLongButton;
