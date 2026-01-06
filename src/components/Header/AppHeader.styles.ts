import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: Colors.background,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },

  side: {
    width: 88,
    paddingLeft: 19,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: FontSize.xl,
    fontWeight: "600",
    color: Colors.primary,
  },

  leftButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 13,
    paddingTop: 8,
    paddingBottom: 9,
    borderRadius: 12,
  },

  leftButtonText: {
    color: Colors.white,
    fontSize: FontSize.xxs,
    fontWeight: "400",
  },

  rightButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 13,
    paddingTop: 8,
    paddingBottom: 9,
    borderRadius: 12,
  },

  rightButtonDisabled: {
    backgroundColor: Colors.disable,
  },

  rightButtonText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: "600",
  },

  rightButtonTextDisabled: {
    color: Colors.textDisabled,
  },

  iconGroup: {
    flexDirection: "row",
    gap: 20,
  },
});
