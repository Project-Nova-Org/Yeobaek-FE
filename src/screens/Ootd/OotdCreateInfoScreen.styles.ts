import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

const { width } = Dimensions.get("window");

const H_PADDING = 24;
export const CARD_WIDTH = width - H_PADDING * 2;
export const CARD_HEIGHT = CARD_WIDTH * 0.9;

/** 대표 이미지 카드용 (절반 크기) */
export const IMAGE_CARD_WIDTH = CARD_WIDTH * 0.5;
export const IMAGE_CARD_HEIGHT = IMAGE_CARD_WIDTH ;

const COLOR_CIRCLE_SIZE = 28;
const COLOR_CIRCLE_GAP = 10;
/** 이미지를 정가운데로 두기 위한 row margin (색깔열+gap 만큼 왼쪽으로 당김) */
const IMAGE_ROW_MARGIN_LEFT =
  CARD_WIDTH / 2 - IMAGE_CARD_WIDTH / 2 - COLOR_CIRCLE_SIZE - 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 32,
  },
  headerSpacer: {
    height: 12,
  },
  imageCardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 12,
    marginLeft: IMAGE_ROW_MARGIN_LEFT,
  },
  colorCirclesColumn: {
    alignItems: "center",
    justifyContent: "center",
    gap: COLOR_CIRCLE_GAP,
  },
  colorCircle: {
    width: COLOR_CIRCLE_SIZE,
    height: COLOR_CIRCLE_SIZE,
    borderRadius: COLOR_CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorCircleSelected: {
    borderColor: Colors.primary,
    borderWidth: 2.5,
  },
  imageCard: {
    width: IMAGE_CARD_WIDTH,
    height: IMAGE_CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: Colors.white,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    flex: 0,
  },
  imageInner: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  thumbnailPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background2,
  },
  thumbnailGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
    alignContent: "center",
    justifyContent: "center",
  },
  thumbnailGridItem: {
    width: (CARD_WIDTH - 24 - 8) / 2,
    height: (CARD_HEIGHT - 24 - 8) / 2,
    borderRadius: 12,
    backgroundColor: Colors.background2,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  section: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labelLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  requiredDot: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.error,
  },
  inputWrapper: {
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputWrapperError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  nameErrorText: {
    fontSize: 12,
    color: Colors.error,
  },
  textInput: {
    fontSize: 12,
    color: Colors.primary,
  },
  helperText: {
    marginTop: 6,
    fontSize: 11,
    color: Colors.placeholder,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.s,
    color: Colors.primary,
  },
  chipTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },
  memoInputWrapper: {
    minHeight: 96,
    borderRadius: 18,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  memoInput: {
    fontSize: 13,
    color: Colors.primary,
    textAlignVertical: "top",
  },
  completeButtonWrapper: {
    paddingHorizontal: H_PADDING,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  completeButton: {
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  completeEnabled: {
    backgroundColor: Colors.primary,
  },
  completeDisabled: {
    backgroundColor: Colors.disable,
  },
  completeText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.white,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    zIndex: 100,
  },
  uploadOverlayText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
  },
});

