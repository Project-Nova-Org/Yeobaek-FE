import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { semishortButtonStyles } from './SemishortButton.styles';

interface FittingSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const FittingSemishortButton = ({
  onPress,
  isActive,
  label = '피팅하기',
}: FittingSemishortButtonProps) => {
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

export default FittingSemishortButton;
