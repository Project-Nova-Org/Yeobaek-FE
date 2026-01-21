import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    categoryScrollContainer: {
        width: "100%",
    },
    categoryScrollView: {
        height: 50,
    },
    categoryRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
    },

    categoryTab: {
        paddingVertical: 7,
        paddingHorizontal: 13,
        borderRadius: 18,
        backgroundColor: Colors.background,
        marginRight: 8,
        height: 35,
    },

    active: {
        backgroundColor: Colors.primary,
    },

    categoryText: {
        fontSize: 13,
        color: Colors.black,
        marginTop: 1,
    },

    activeText: {
        color: Colors.white,
        fontWeight: "600",
    },

    detailContainer: {
        backgroundColor: Colors.background,
        borderRadius: 50,
        paddingTop: 2,
        paddingBottom: 8,
        marginHorizontal: 0,
        marginRight: 8,
        marginLeft: 8,
        height:40,
        justifyContent: "center",
    },
    detailScrollContainer: {
        width: "100%",
    },
    detailScrollView: {
        height: 40,
    },
    detailRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        alignItems: "center",
    },

    detailChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 6,
        // 기본 상태는 투명 (회색 배경이 보이도록)
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },

    detailActive: {
        backgroundColor: Colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },

    detailText: {
        fontSize: 12,
        color: Colors.black,
        marginTop: 5,
    },

    detailActiveText: {
        color: Colors.white,
        fontSize: 12,
        marginTop: 0,
    },
});