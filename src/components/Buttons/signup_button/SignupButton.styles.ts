import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const signupButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 22,
  },

  buttonBase: {
    width: 360,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.md,
    fontWeight: 500,
  },

  // 활성화 상태
  activeButton: {
    backgroundColor: Colors.primary,
  },
  activeText: {
    color: Colors.white,
  },

  // 비활성화 상태
  disabledButton: {
    backgroundColor: Colors.disable,
  },
  disabledText: {
    color: Colors.textDisabled,
  },
  // 버튼이 눌렸을 때
  buttonPressed: {
    backgroundColor: Colors.yesPressed,
  },
});
