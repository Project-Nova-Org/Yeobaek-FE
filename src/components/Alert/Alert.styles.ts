import { StyleSheet } from "react-native";

import { Colors } from "@/theme/colors.ts";

import { FontSize } from "@/theme/typography.ts";

export const alertStyles = StyleSheet.create({
  absolutePosition: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // 다른 요소보다 위에
    zIndex: 10,
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
    paddingBottom: 40,
  },

  messageText: {
    fontSize: FontSize.md,
    fontWeight: "500",
    color: Colors.black,
    textAlign: "center",
    marginTop: 10,
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
