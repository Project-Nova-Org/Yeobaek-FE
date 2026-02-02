import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

const { width } = Dimensions.get("window");
const H_PADDING = 20;
const MODEL_AREA_MAX_WIDTH = 360;
const MODEL_AREA_WIDTH = Math.min(width - H_PADDING * 2, MODEL_AREA_MAX_WIDTH);
const SLOT_GAP = 12;
const SLOTS_PER_ROW = 3;
const WRAPPER_PADDING = 16;
const INNER_GRID_WIDTH = width - H_PADDING * 2 - WRAPPER_PADDING * 2;
const SLOT_SIZE =
  (INNER_GRID_WIDTH - SLOT_GAP * (SLOTS_PER_ROW - 1)) / SLOTS_PER_ROW;
const ROWS_COUNT = 2;
/** 6개 슬롯(3×2)이 들어가는 그리드 영역 높이 */
const GRID_HEIGHT = ROWS_COUNT * SLOT_SIZE + SLOT_GAP * (ROWS_COUNT - 1);

/** OotdDetailScreen 등 다른 페이지와 동일한 헤더 레이아웃(사이즈, padding, 글씨 크기) */
export const headerStyles = StyleSheet.create({
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
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    minWidth: 68,
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
  /** modelArea를 화면 가로 중앙에 두기 위한 wrapper */
  modelAreaWrap: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  modelAreaLabel: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.gray400,
    marginBottom: 12,
  },
  modelArea: {
    width: MODEL_AREA_WIDTH,
    aspectRatio: 3 / 4,
    maxHeight: 300,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
  },
  changePhotoBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 100,
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
  itemGridWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: WRAPPER_PADDING,
    minHeight: GRID_HEIGHT + WRAPPER_PADDING * 2,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  itemGrid: {
    flexDirection: "column",
    minHeight: GRID_HEIGHT,
    width: "100%",
  },
  /** 한 줄에 정확히 3칸 (3×2 그리드용) */
  itemGridRow: {
    flexDirection: "row",
    gap: SLOT_GAP,
    justifyContent: "flex-start",
  },
  /** 빈 칸 레이아웃용(투명, 모양/디자인 없음) */
  itemSlotSpacer: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    flexShrink: 0,
  },

  itemPlusSlot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSlotFilled: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    flexShrink: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.border,
    overflow: "hidden",
  },
  fittingBtnWrap: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  fittingBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.disable,
    alignItems: "center",
    justifyContent: "center",
  },
  fittingBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textDisabled,
  },
});

export { SLOT_SIZE };
