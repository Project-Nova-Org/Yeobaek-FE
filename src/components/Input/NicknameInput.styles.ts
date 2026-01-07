import { StyleSheet } from "react-native";
import { FontSize } from "@/theme/typography";
import { Colors } from "@/theme/colors.ts";

export const styles = StyleSheet.create({
  inputWrapper: {
    width: 360,
    position: "relative",
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  inputError: {
    borderColor: Colors.error,
  },

  input: {
    height: 50,
    width: 350,
    fontSize: FontSize.sm,
    color: Colors.black,
  },

  clearButton: {
    position: "absolute",
    right: 8,
    width: 20,
    height: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 16,
  },

  errorText: {
    marginBottom: 3,
    color: Colors.error,
    fontSize: 12,
    textAlign: "right",
  },

  helperText: {
    marginTop: 8,
    marginLeft: 10,
    fontSize: FontSize.xs,
    color: Colors.placeholder,
  },
});
