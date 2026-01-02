import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: Colors.background,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  side: {
    width: 88,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },

  leftButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  leftButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },

  rightButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },

  rightButtonDisabled: {
    backgroundColor: Colors.disable,
  },

  rightButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },

  rightButtonTextDisabled: {
    color: Colors.disable,
  },

  iconGroup: {
    flexDirection: "row",
    gap: 12,
  },
});
