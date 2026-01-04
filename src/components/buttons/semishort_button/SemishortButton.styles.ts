import { StyleSheet } from "react-native";
import { FontSize, FontWeight } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors.ts";

export const semishortButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonBase: {
    width: 76,
    height: 27,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: FontSize.xxs,
    fontWeight: FontWeight.medium,
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
