import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

const { width } = Dimensions.get("window");

/** OOTD 수정(OotdCreateHeader)과 동일한 헤더 레이아웃/크기/글씨 */
export const ootdDetailHeaderStyles = StyleSheet.create({
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

const H_PADDING = 24;
export const CARD_WIDTH = width - H_PADDING * 2;
export const CARD_HEIGHT = CARD_WIDTH * 0.9;

const REGISTERED_ITEMS_PER_SLIDE = 3;
const REGISTERED_ITEM_GAP = 12;
const INNER_SLIDE_WIDTH = CARD_WIDTH - 32; // section box padding 16*2
const REGISTERED_ITEM_SIZE =
  (INNER_SLIDE_WIDTH - REGISTERED_ITEM_GAP * (REGISTERED_ITEMS_PER_SLIDE - 1)) /
  REGISTERED_ITEMS_PER_SLIDE;

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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
    minHeight: 44,
  },
  /** [별][이름] 블록을 중앙에 두고, 이름이 길어지면 별이 왼쪽으로 밀림 */
  titleRowInner: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginRight: 8,
  },
  ootdName: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
    flexShrink: 1,
  },
  previewWrap: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.background2,
  },
  tpoStyleRow: {
    marginBottom: 12,
  },
  tpoStyleText: {
    fontSize: 12,
    color: Colors.placeholder,
  },
  memoBox: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  memoText: {
    fontSize: 13,
    color: Colors.primary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 12,
    marginTop: 8,
  },
  registeredSectionBox: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    overflow: "hidden",
  },
  registeredSlide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: REGISTERED_ITEM_GAP,
    width: INNER_SLIDE_WIDTH,
  },
  registeredItemCard: {
    width: REGISTERED_ITEM_SIZE,
    height: REGISTERED_ITEM_SIZE,
    borderRadius: 12,
    backgroundColor: Colors.white,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  registeredItemImage: {
    width: "90%",
    height: "90%",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray400,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 8,
    height: 6,
    borderRadius: 3,
  },
});

export {
  REGISTERED_ITEMS_PER_SLIDE,
  REGISTERED_ITEM_SIZE,
  INNER_SLIDE_WIDTH,
};
