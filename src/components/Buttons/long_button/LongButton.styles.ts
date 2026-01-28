import { StyleSheet } from "react-native";
import { FontSize } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors.ts";

export const LongButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  buttonBase: {
    width: "95%",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: FontSize.lg,
    fontWeight: "600",
  },

  // 활성화 상태 (클릭 가능)
  activeButton: {
    backgroundColor: Colors.primary,
  },
  activeText: {
    color: Colors.white,
  },

  // 비활성화 상태 (클릭 불가능)
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
