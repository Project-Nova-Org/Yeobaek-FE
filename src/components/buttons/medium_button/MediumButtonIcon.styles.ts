import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize, FontWeight } from "@/theme/typography.ts";

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

  buttonText: {
    color: Colors.white,
    fontSize: FontSize.xxs,
    fontWeight: FontWeight.medium,
    includeFontPadding: false,
  },
});
