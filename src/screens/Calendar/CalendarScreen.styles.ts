import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const calendarScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fixedContent: {
    flex: 1,
  },
  monthSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  arrowControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  currentMonthText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    marginHorizontal: 24,
    color: Colors.black,
  },
  rotateIcon: {
    transform: [{ rotate: "180deg" }],
  },
});
