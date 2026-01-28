import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const alertStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 17, 17, 0.4)",
  },

  alertContainer: {
    width: 260,
    height: 142,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 20,
    alignItems: "center",
  },

  textWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 35,
  },

  messageText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
    lineHeight: 25,
  },

  buttonWrapper: {
    position: "absolute",
    bottom: -3,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
