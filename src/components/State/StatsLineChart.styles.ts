import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const CHART_CONFIG = {
  color: Colors.primary,
  strokeWidth: 2,
  pointRadius: 2.5,
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  lineChartBox: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  dataLabel: {
    fontSize: FontSize.xxs,
    color: Colors.primary,
    fontWeight: "600",
  },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  axisItem: {
    alignItems: "center",
    width: 35,
  },
  axisLabel: {
    fontSize: FontSize.xxs,
    color: Colors.textDisabled,
    fontWeight: "700",
  },
  axisSubLabel: {
    fontSize: FontSize.xxxs,
    color: Colors.textDisabled,
    marginTop: 6,
    fontWeight: "600",
  },
});
