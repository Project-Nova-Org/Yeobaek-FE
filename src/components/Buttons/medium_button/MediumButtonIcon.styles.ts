import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const MediumButtonIconStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBase: {
    width: 120,
    height: 26,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  cameraButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  cameraText: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: FontSize.xxs,
    includeFontPadding: false,
  },

  buttonText: {
    color: Colors.white,
    fontSize: FontSize.xxs,
    fontWeight: "500",
    includeFontPadding: false,
  },
  // 버튼이 눌렸을 때
  buttonPressed: {
    backgroundColor: Colors.yesPressed,
  },
});
