import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    padding: 20,
    marginTop: 150,
  },

  imageBox: {
    alignItems: "center",
    marginBottom: 24,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#EEE",
    marginBottom: 24,
  },

  inputSection: {
    marginTop: 16,
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
  },
});
