import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

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
    borderColor: Colors.googleLine,
    overflow: "hidden",
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  pickerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
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
    fontWeight: "normal",
    textAlign: "center",
    paddingLeft: 5,
  },
  selectedItemText: {
    fontSize: FontSize.xl,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
