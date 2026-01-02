import React from 'react';
import { View, Text } from 'react-native';
import { alertStyles } from './Alert.styles';
import SelectionButtons from '../buttons/alert_button/ButtonAlert'; // 파일 경로 확인 필요

interface CustomAlertProps {
  message: string;
}

const CustomAlert = ({ message }: CustomAlertProps) => {
  return (
    <View style={alertStyles.absolutePosition}>
      <View style={alertStyles.alertContainer}>
        <Text style={alertStyles.messageText}>{message}</Text>
        <View style={alertStyles.buttonWrapper}>
          <SelectionButtons />
        </View>
      </View>
    </View>
  );
};

export default CustomAlert;
