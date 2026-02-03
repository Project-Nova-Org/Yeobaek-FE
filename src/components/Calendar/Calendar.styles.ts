import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";
const { width } = Dimensions.get("window");
const cellWidth = width / 7;
export const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
    paddingTop: 10,
    marginBottom: 40,
  },
  weekRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 10,
    borderBottomWidth: 20,
    borderColor: Colors.white,
  },
  weekText: {
    width: cellWidth,
    textAlign: "center",
    fontSize: FontSize.xs,
    fontWeight: "700",
    color: Colors.black,
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    flex: 1,
  },
  dateCell: {
    width: cellWidth,
    height: cellWidth * 1.6,
    paddingLeft: 3,
    position: "relative",
    marginBottom: 10,
  },
  contentArea: {
    flex: 1,
    marginTop: 18,
  },
  flipWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemWrapper: {
    flex: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  imageBackground: {
    backgroundColor: Colors.disable,
  },
  ootdImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImg: {
    flex: 1,
  },

  dateNumberOverlay: {
    position: "absolute",
    top: 1,
    left: 25,
    zIndex: 10,
  },
  dateText: {
    fontSize: FontSize.xs,
    fontWeight: "700",
    textAlign: "center",
  },
  otherMonthText: {
    color: Colors.textDisabled,
  },
  futureText: { color: Colors.textDisabled },
  sunday: { color: Colors.sunday },
  saturday: { color: Colors.saturday },
});
