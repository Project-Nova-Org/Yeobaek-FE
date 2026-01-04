import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize, FontWeight } from "@/theme/typography.ts";

export const MediumButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBase: {
    width: 120,
    height: 26,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: Colors.white,
    fontSize: FontSize.xxxs,
    fontWeight: FontWeight.medium,
  },
  // 버튼이 눌렸을 때
  buttonPressed: {
    backgroundColor: Colors.yesPressed,
  },
});
