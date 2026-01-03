import React from "react";
import { View, Text } from "react-native";
import { alertStyles } from "./Alert.styles";
import SelectionButtons from "@/components/buttons/alert_button/ButtonAlert";

interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  return (
    <View style={alertStyles.absolutePosition}>
      <View style={alertStyles.alertContainer}>
        <View style={alertStyles.textWrapper}>
          <Text style={alertStyles.messageText}>{message}</Text>
        </View>
        <View style={alertStyles.buttonWrapper}>
          <SelectionButtons />
        </View>
      </View>
    </View>
  );
};

export default Alert;
