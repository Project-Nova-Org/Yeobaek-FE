import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    width: 200,
    height: 190,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },

  title: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    marginBottom: 12,
  },

  chartWrapper: {
    marginTop: 10,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },

  dotLegendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
    gap: 12,
  },

  legendColumn: {
    alignItems: "center",
    gap: 8,
  },

  legendDot: {
    width: 13,
    height: 13,
  },

  legendDotOnly: {
    width: 15,
    height: 15,
    borderRadius: 10,
    elevation: 2,
  },

  legendText: {
    fontSize: FontSize.xxs,
    color: Colors.black,
    textAlign: "center",
    fontWeight: "400",
  },

  container: {
    alignItems: "center",
  },
});
