import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { semishortButtonStyles } from './SemishortButton.styles';

interface SaveSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const SaveSemishortButton = ({
  onPress,
  isActive,
  label = '저장하기',
}: SaveSemishortButtonProps) => {
  return (
    <View style={semishortButtonStyles.container} pointerEvents={isActive ? 'auto' : 'none'}>
      <Pressable
        onPress={onPress}
        disabled={!isActive}
        style={[
          semishortButtonStyles.buttonBase,
          isActive ? semishortButtonStyles.activeButton : semishortButtonStyles.disabledButton,
        ]}
      >
        <Text
          style={[
            semishortButtonStyles.buttonText,
            isActive ? semishortButtonStyles.activeText : semishortButtonStyles.disabledText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default SaveSemishortButton;
