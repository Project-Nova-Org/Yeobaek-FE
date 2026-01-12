import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
export const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },

  pill: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },

  pillWithClose: {
    paddingRight: 14 + 14 + 6,
  },

  pillActive: {
    backgroundColor: Colors.primary,
  },

  pillText: {
    fontSize: 14,
    color: Colors.primary,
  },

  topPill: {
    gap: 6,
  },

  pillTextActive: {
    color: Colors.white,
  },

  closeAbsolute: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: 1 }],
  },
});
