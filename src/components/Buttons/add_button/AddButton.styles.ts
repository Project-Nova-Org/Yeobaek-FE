import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";

export const addButtonStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  dashedBox: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
