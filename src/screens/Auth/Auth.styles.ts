import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  /* 로고 */
  logoSection: {
    alignItems: "center",
    marginBottom: 80,
  },
  description: {
    fontSize: FontSize.xxs,
    color: Colors.darkgray,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 120,
    marginBottom: 80,
  },
});
