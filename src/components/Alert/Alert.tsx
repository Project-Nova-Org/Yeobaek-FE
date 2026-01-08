import React from "react";
import { AppText as Text } from "@/components/common/AppText";
import { View, Modal } from "react-native";
import { alertStyles } from "./Alert.styles";
import SelectionButtons from "@/components/Buttons/alert_button/ButtonAlert";

interface AlertProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Alert = ({ visible, message, onConfirm, onCancel }: AlertProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade" // 부드럽게 나타나도록 설정
      onRequestClose={onCancel}
    >
      {/* 배경 오버레이: 뒷배경을 어둡게 하고 터치를 막음 */}
      <View style={alertStyles.overlay}>
        {/* 알림창 컨테이너: 이벤트 전파 방지 (onStartShouldSetResponder) */}
        <View style={alertStyles.alertContainer} onStartShouldSetResponder={() => true}>
          <View style={alertStyles.textWrapper}>
            <Text style={alertStyles.messageText}>{message}</Text>
          </View>

          <View style={alertStyles.buttonWrapper}>
            {/* 기존 버튼 컴포넌트 그대로 사용 */}
            <SelectionButtons onYesPress={onConfirm} onNoPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
