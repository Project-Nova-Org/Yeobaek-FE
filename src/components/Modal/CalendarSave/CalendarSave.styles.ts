import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const BG_COLORS = ["#FFFFFF", "#000000", "#2D2D2D", "#FFBABA", "#E0E0E0"]; // 팔레트 데이터

export const saveModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  previewCard: {
    width: width * 0.85,
    height: height * 0.65,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  previewMonth: { fontSize: 16, fontWeight: "700", marginBottom: 20 },
  gridPlaceholder: { width: "100%", flex: 1, backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 8 },
  footer: { position: "absolute", bottom: 40, width: "100%", paddingHorizontal: 20 },
  footerLabel: { color: "#FFF", fontSize: 14, marginBottom: 15 },
  colorList: { flexDirection: "row", alignItems: "center" },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  selectedColor: { borderColor: "#FFF", transform: [{ scale: 1.1 }] },
});
