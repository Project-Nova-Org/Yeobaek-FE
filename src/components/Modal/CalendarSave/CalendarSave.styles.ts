import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";
import {
  PatternInkImage,
  PatternGradImage,
  PatternStarImage,
  PInkImage,
  PStarImage,
  PGradImage,
} from "@/assets/images";

export const BG_COLORS = [
  Colors.white,
  Colors.primary,
  Colors.black,
  Colors.cherry,
  Colors.oat,
  { thumb: PGradImage, bg: PatternGradImage, isGrad: true },
  { thumb: PStarImage, bg: PatternStarImage, isLight: true },
  { thumb: PInkImage, bg: PatternInkImage, isLight: true },
];

export const saveModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    width: 326,
    height: 512,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  previewCard: {
    width: 270,
    height: 360,
    padding: 24,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.white,
  },
  cardBackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 270,
    height: 360,
    zIndex: -1,
  },
  previewMonthText: {
    fontSize: FontSize.sm,
    fontFamily: "Eulyoo1945-Regular",
    fontWeight: "500",
    marginTop: 0,
    marginBottom: 20,
  },
  gridImageArea: {
    flex: 1,
    width: "100%",
  },

  footer: {
    width: "90%",
    marginTop: 20,
  },
  footerLabelArea: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  footerInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 15,
  },

  footerInfoText: {
    fontSize: 12,
    fontFamily: "Eulyoo1945-Regular",
    fontWeight: "400",
    letterSpacing: -0.5,
    marginRight: 6,
  },

  footerDressImage: {
    width: 18,
    height: 18,
  },
  colorList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paletteImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedColor: {
    opacity: 0.2,
  },
});
