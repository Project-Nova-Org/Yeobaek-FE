import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

const { width } = Dimensions.get("window");
const H_PADDING = 20;
const SLOT_GAP = 8;
const SLOTS_PER_ROW = 3;
const WRAPPER_PADDING = 12;
const INNER_GRID_WIDTH = width - H_PADDING * 2 - WRAPPER_PADDING * 2;
const SLOT_SIZE =
  (INNER_GRID_WIDTH - SLOT_GAP * (SLOTS_PER_ROW - 1)) / SLOTS_PER_ROW;
const ROWS_COUNT = 2;
const GRID_SCALE = 1;
const SCALED_SLOT_SIZE = SLOT_SIZE * GRID_SCALE;
/** 6개 슬롯(3×2) 그리드 높이 */
const GRID_HEIGHT =
  ROWS_COUNT * SCALED_SLOT_SIZE + SLOT_GAP * (ROWS_COUNT - 1);

/** OotdDetailScreen 등 다른 페이지와 동일한 헤더 레이아웃(사이즈, padding, 글씨 크기) */
export const headerStyles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginRight : -25,
    justifyContent: "center",
  },
  rightIconGroup: {
    flexDirection: "row",
    marginRight : 10,
    alignItems: "center",
    justifyContent: "flex-end",
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
    paddingBottom: 20,
  },
  modelAreaWrap: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },

  tooltipContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: Colors.border,
    marginRight: 10,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    maxWidth: 240,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxxs,
    color: Colors.primary,
    textAlign: "center",
  },
  /** 전신사진 컨테이너 (한 화면 내 표시용 축소) */
  modelArea: {
    width: 130,
    height: 230,
    backgroundColor: Colors.disable,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  modelAreaImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 6,
    marginBottom: 4,
  },
  itemGridWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: WRAPPER_PADDING,
    minHeight: GRID_HEIGHT + WRAPPER_PADDING * 2,
    maxHeight: GRID_HEIGHT + WRAPPER_PADDING * 2,
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
    marginTop: 16,
  },
  fittingBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.disable,
    alignItems: "center",
    justifyContent: "center",
  },
  fittingBtnActive: {
    backgroundColor: Colors.primary,
  },
  fittingBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textDisabled,
  },
  fittingBtnTextActive: {
    color: Colors.white,
  },
});

export { SLOT_SIZE };
