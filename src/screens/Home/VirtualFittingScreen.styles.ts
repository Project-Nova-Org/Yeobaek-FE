import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

const { width } = Dimensions.get("window");
const H_PADDING = 20;
const SLOT_GAP = 12;
const SLOTS_PER_ROW = 3;
const INNER_WIDTH = width - H_PADDING * 2;
const SLOT_SIZE =
  (INNER_WIDTH - SLOT_GAP * (SLOTS_PER_ROW - 1)) / SLOTS_PER_ROW;

export const virtualFittingHeaderStyles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 23,
    color: Colors.primary,
    fontWeight: "900",
  },
  rightIconGroup: {
    minWidth: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 32,
  },
  modelArea: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 400,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: 16,
    overflow: "hidden",
  },
  changePhotoBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  changePhotoBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.white,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  itemGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SLOT_GAP,
  },
  itemSlot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  itemSlotFilled: {
    borderStyle: "solid",
    borderColor: Colors.border,
    overflow: "hidden",
  },
  itemSlotPlaceholder: {
    backgroundColor: Colors.background2,
    borderStyle: "solid",
    borderColor: Colors.border,
  },
  fittingBtnWrap: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  fittingBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.disable,
  },
  fittingBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textDisabled,
  },
});

export { SLOT_SIZE };
