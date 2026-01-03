import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { shortButtonStyles } from './ShortButton.styles';

interface DoneShortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const DoneShortButton = ({ onPress, isActive, label = "완료" }: DoneShortButtonProps) => {
  return (
    <View style={shortButtonStyles.container} pointerEvents={isActive ? "auto" : "none"}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={[
          shortButtonStyles.buttonBase,
          isActive ? shortButtonStyles.activeButton : shortButtonStyles.disabledButton,
        ]}
      >
        <Text
          style={[
            shortButtonStyles.buttonText,
            isActive ? shortButtonStyles.activeText : shortButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default DoneShortButton;
