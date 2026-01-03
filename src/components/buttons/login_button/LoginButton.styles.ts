import { StyleSheet } from "react-native";
import { FontSize, FontWeight } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors.ts";

export const loginButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 20,
  },
  buttonBase: {
    width: 254,
    height: 44,
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
  buttonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    includeFontPadding: false,
  },

  kakaoButton: {
    backgroundColor: Colors.kakaoYellow,
  },
  kakaoText: {
    color: Colors.black,
  },

  appleButton: {
    backgroundColor: Colors.black,
  },
  appleText: {
    color: Colors.white,
  },

  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.GoogleLine,
  },
  googleText: {
    color: Colors.black,
  },
});
