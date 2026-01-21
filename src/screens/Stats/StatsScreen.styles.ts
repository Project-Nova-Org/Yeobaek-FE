import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const statsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  section: {
    marginBottom: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
  },

  tooltipContainer: {
    position: "absolute",
    top: 25,
    left: 20,
    backgroundColor: Colors.help,
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
    maxWidth: 240,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxxs,
    color: Colors.primary,
    textAlign: "center",
  },

  helpIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },

  horizontalScrollPadding: {
    paddingLeft: 18,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 20,
  },
  itemCard: {
    width: 60,
    height: 75,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 8,
    marginRight: 7,
    alignItems: "center",
    elevation: 2,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    overflow: "hidden",
    backgroundColor: Colors.noPressed,
    borderRadius: 5,
    marginBottom: 2,
  },
  itemLabel: {
    fontSize: FontSize.xxxs,
    fontWeight: "500",
    color: Colors.black,
    textAlign: "center",
  },

  unwornSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 18,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  unwornHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  unwornTitle: {
    fontSize: FontSize.xs,
    fontWeight: "600",
  },
  unwornImages: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  smallImgContainer: {
    width: 30,
    height: 30,
    backgroundColor: Colors.noPressed,
    borderRadius: 8,
    overflow: "hidden",
  },
  moreText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: "600",
    paddingLeft: 5,
  },

  styleTitle: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
    paddingHorizontal: 25,
  },
  horizontalChartItem: {
    marginRight: 10,
    paddingBottom: 5,
  },

  chartTitle: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.black,
    paddingHorizontal: 25,
  },

  bottomRowSection: {
    flexDirection: "row",
    paddingHorizontal: 18,
    gap: 12,
    marginTop: 16,
    alignItems: "flex-end",
  },

  chartColumn: {
    flex: 1.6,
  },
  summaryColumn: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: 190,
    justifyContent: "space-between",
    elevation: 4,
  },
  summaryItemRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  summaryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  summaryLabelText: {
    fontSize: FontSize.xxs,
    color: Colors.black,
    fontWeight: "600",
    marginBottom: 1,
    textAlign: "center",
  },
  summaryTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCountText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
    lineHeight: 18,
    textAlign: "center",
  },

  rotateIcon: { transform: [{ rotate: "180deg" }] },
});
