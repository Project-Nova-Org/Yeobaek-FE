import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create<Record<string, ViewStyle>>({
  container: {
    position: "absolute",
  },

  box: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    width: "100%",
    height: "100%",
  },

  rotateLine: {
    position: "absolute",
    top: -24,
    left: "50%" as const,
    width: 1,
    height: 16,
    backgroundColor: Colors.black,
  },

  rotateHandle: {
    position: "absolute",
    top: -40,
    left: "50%" as const,
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.black,
  },

  /* ===== 핸들 ===== */
  handle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
  },

  top: {
    top: -6,
    left: "50%" as const,
    marginLeft: -6,
  },

  bottom: {
    bottom: -6,
    left: "50%" as const,
    marginLeft: -6,
  },

  left: {
    left: -6,
    top: "50%" as const,
    marginTop: -6,
  },

  right: {
    right: -6,
    top: "50%" as const,
    marginTop: -6,
  },

  topLeft: {
    top: -6,
    left: -6,
  },

  topRight: {
    top: -6,
    right: -6,
  },

  bottomLeft: {
    bottom: -6,
    left: -6,
  },

  bottomRight: {
    bottom: -6,
    right: -6,
  },
});
