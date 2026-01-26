import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const toastStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 66,
    gap: 12,

    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 22,

    alignSelf: "center",

    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },

  iconWrapper: {
    marginRight: 8,
  },

  messageText: {
    fontSize: FontSize.xs,
    fontWeight: "600",
    color: Colors.primary,
  },
});
