import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";
const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 12;
const BOTTOM_PADDING = 80;
const contentWidth = width - HORIZONTAL_PADDING * 2;
export const cellWidth = contentWidth / 7;
const DATE_ROW_HEIGHT = 20;
const CARD_MARGIN_TOP = 6;
/** flip.svg 비율(44:59)에 맞춘 카드 크기 */
const FLIP_ASPECT = 59 / 44;
export const cardWidth = cellWidth - 4;
export const cardHeight = cardWidth * FLIP_ASPECT;
export const calendarStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: width,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 10,
    paddingBottom: BOTTOM_PADDING,
  },
  weekRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderTopWidth: 4,
    borderBottomWidth: 8,
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
  },
  dateCell: {
    width: cellWidth,
    height: DATE_ROW_HEIGHT + CARD_MARGIN_TOP + cardHeight,
    position: "relative",
    marginBottom: 15,
  },
  contentArea: {
    marginTop: CARD_MARGIN_TOP,
    width: cardWidth,
    height: cardHeight,
    alignSelf: "center",
  },
  flipWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemWrapper: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  itemWrapperFlip: {
    borderWidth: 0,
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

  dateNumberRow: {
    height: DATE_ROW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
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
