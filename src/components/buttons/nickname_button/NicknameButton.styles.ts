import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize, FontWeight } from "@/theme/typography";

export const nicknameButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  buttonBase: {
    width: 320,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
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
});
