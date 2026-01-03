import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize, FontWeight } from "@/theme/typography.ts";

export const dateStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 163,
    height: 211,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.GoogleLine,
    overflow: "hidden",
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  pickerContent: {
    flex: 1,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  indicatorContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    zIndex: 10,
    top: "50%",
    marginTop: -6,
  },
  scrollWrapper: {
    flex: 1,
    height: 211,
    alignItems: "center",
  },
  itemText: {
    fontSize: FontSize.xxs,
    color: Colors.black,
    height: 40,
    lineHeight: 40,
    fontWeight: FontWeight.regular,
    textAlign: "center",
    paddingLeft: 5,
  },
  selectedItemText: {
    fontSize: FontSize.xl,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
});
