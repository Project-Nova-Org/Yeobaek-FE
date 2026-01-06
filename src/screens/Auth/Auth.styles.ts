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

  logoSection: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    marginTop: 16,
  },
  subtitle: {
    marginTop: 8,
    fontSize: FontSize.sm,
    color: Colors.inactive,
  },
  description: {
    fontSize: FontSize.xxs,
    color: Colors.darkgray,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 120,
    marginBottom: 40,
  },
});
