import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";
export const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },

  subRowWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 999,
    paddingVertical: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  subRow: {
    paddingHorizontal: 12,
    gap: 5,
  },

  pill: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },

  pillSub: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 9,
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
    fontSize: FontSize.xs,
    color: Colors.primary,
  },

  pillTextSub: {
    fontSize: FontSize.xxs,
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
