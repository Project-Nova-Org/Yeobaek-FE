import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";
export const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },

  subRowWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 999,
    paddingVertical: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  subRow: {
    paddingHorizontal: 16,
    gap: 4,
  },

  pill: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },

  pillSub: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },

  pillWithClose: {
    paddingRight: 14 + 14 + 6,
  },

  pillActive: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  pillText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },

  pillTextSub: {
    fontSize: FontSize.xs,
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
    transform: [{ translateY: 1 }],
  },
});
