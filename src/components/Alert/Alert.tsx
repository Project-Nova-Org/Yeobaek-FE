import React from "react";
import { AppText as Text } from "@/components/common/AppText";
import { View } from "react-native";
import { alertStyles } from "./Alert.styles";
import SelectionButtons from "@/components/Buttons/alert_button/ButtonAlert";

interface AlertProps {
  visible: boolean; // 1. visible 속성 추가
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert = ({ visible, message, onConfirm, onCancel }: AlertProps) => {
  // 2. visible이 false이면 화면에 아무것도 그리지 않음 (에러 방지 및 성능 최적화)
  if (!visible) return null;

  return (
    <View style={alertStyles.absolutePosition}>
      <View style={alertStyles.alertContainer}>
        <View style={alertStyles.textWrapper}>
          <Text style={alertStyles.messageText}>{message}</Text>
        </View>
        <View style={alertStyles.buttonWrapper}>
          <SelectionButtons onYesPress={onConfirm} onNoPress={onCancel} />
        </View>
      </View>
    </View>
  );
};

export default Alert;
