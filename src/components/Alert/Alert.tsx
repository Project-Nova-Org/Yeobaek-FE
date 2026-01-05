import React from "react";
import { AppText as Text } from "@/components/common/Apptext";
import { View } from "react-native";
import { alertStyles } from "./Alert.styles";
import SelectionButtons from "@/components/buttons/alert_button/ButtonAlert";

interface AlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert = ({ message, onConfirm, onCancel }: AlertProps) => {
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
