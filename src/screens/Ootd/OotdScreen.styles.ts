import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";


const { width } = Dimensions.get("window");

const H_PADDING = 16;

/** OOTD 박스 비율 */
const OOTD_WIDTH = width - H_PADDING * 2;
const OOTD_HEIGHT = (OOTD_WIDTH * 483) / 324;

/** Grid */
const GRID_COLUMNS = 3;
const GRID_GAP = 12;

const CARD_WIDTH =
    (OOTD_WIDTH - GRID_GAP * (GRID_COLUMNS - 1) - 16 * 2) / GRID_COLUMNS;

// 세로로 길쭉 (이미지 + 이름 영역)
const CARD_IMAGE_RATIO = 1; // 정사각 이미지
const CARD_LABEL_HEIGHT = 28;
const CARD_HEIGHT = CARD_WIDTH * CARD_IMAGE_RATIO + CARD_LABEL_HEIGHT;

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    container: {
        paddingHorizontal: H_PADDING,
        paddingTop: 12,
        paddingBottom: 32,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },

    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    sortBtn: {
        padding: 8,
    },

    searchWrapper: {
        flex: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        backgroundColor: Colors.white,
        borderRadius: 24,
        shadowColor: Colors.black,
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },

    searchInput: {
        flex: 1,
        fontSize: FontSize.sm,
        color: Colors.primary,
    },

    /* ===== 필터 ===== */
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        gap: 12,
    },

    filterTitle: {
        width: 44,
        fontSize: FontSize.s,
        fontWeight: "600",
        color: Colors.primary,
    },

    chipRow: {
        flexDirection: "row",
        gap: 8,
        paddingRight: 8,
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

    ootdBox: {
        elevation: 6,
        marginTop: 3,
        width: OOTD_WIDTH,
        height: OOTD_HEIGHT,
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: GRID_GAP,
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },

    cardImage: {
        width: "100%",
        height: CARD_WIDTH,
        borderRadius: 12,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    cardLabel: {
        height: CARD_LABEL_HEIGHT,
    },
});


