import { StyleSheet } from "react-native";
import { FontSize } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors.ts";

export const loginButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 30,
  },
  buttonBase: {
    width: 280,
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingLeft: 50,
  },
  icon: {
    position: "absolute",
    left: 20,
  },
  kakaoButton: {
    backgroundColor: Colors.kakaoYellow,
  },
  kakaoButtonText: {
    fontSize: FontSize.md,
    fontWeight: "medium",
    includeFontPadding: false,
    color: Colors.black,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.googleLine,
  },
  googleButtonText: {
    fontSize: FontSize.md,
    fontWeight: "medium",
    includeFontPadding: false,
    color: Colors.inactive,
  },
});
