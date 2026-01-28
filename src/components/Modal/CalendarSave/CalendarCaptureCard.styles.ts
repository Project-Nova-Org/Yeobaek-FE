import { StyleSheet } from "react-native";
import { FontSize } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors.ts";

export const captureCardStyles = StyleSheet.create({
  cardContainer: {
    width: 270,
    height: 360,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 28,
    overflow: "hidden",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: 270,
    height: 360,
    zIndex: -1,
  },
  header: {
    marginTop: -15,
  },
  monthText: {
    fontFamily: "Eulyoo1945-Regular",
    fontSize: FontSize.sm,
    fontWeight: "400",
  },

  whiteCalendarBoard: {
    width: 232,
    height: 260,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    paddingTop: 20,
    alignItems: "center",
  },
  gridContainer: {
    width: 232,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: 32,
    height: 50,
    paddingBottom: 12,
    padding: 2,
  },
  dateNumberOverlay: {
    position: "absolute",
    top: -10,
    right: 15,
    zIndex: 10,
  },
  dateText: {
    fontSize: FontSize.xxxxs,
    fontWeight: "600",
  },
  imageWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  ootdImage: {
    width: "100%",
    height: "100%",
  },
  emptyFill: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: -10,
  },
  footerText: {
    fontSize: FontSize.xs,
    fontFamily: "Eulyoo1945-Regular",
    marginRight: 8,
    marginTop: -2,
  },
});
