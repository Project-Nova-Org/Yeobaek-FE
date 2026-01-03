import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize, FontWeight } from "@/theme/typography.ts";

export const toastStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 63,
    width: 198,
    height: 35,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
    alignSelf: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    marginRight: 20,
  },
  messageText: {
    fontSize: FontSize.xxs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});
