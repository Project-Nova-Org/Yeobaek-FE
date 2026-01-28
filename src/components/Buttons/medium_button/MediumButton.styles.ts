import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const MediumButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBase: {
    width: 120,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: Colors.white,
    fontSize: FontSize.xxs,
    fontWeight: "500",
  },
  // 버튼이 눌렸을 때
  buttonPressed: {
    backgroundColor: Colors.yesPressed,
  },
});
