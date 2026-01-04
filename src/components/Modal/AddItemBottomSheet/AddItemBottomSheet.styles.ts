import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    sheet: {
        backgroundColor: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    },

    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#D0D0D0",
        alignSelf: "center",
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    card: {
        flex: 1,
        backgroundColor: "#F4F6FA",
        borderRadius: 16,
        padding: 16,
        height: 120,                 // 카드 높이 고정 (디자인 안정)
        justifyContent: "space-between",
    },

    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111",
    },

    iconWrap: {
        alignSelf: "flex-end",        //  오른쪽 정렬
    },
});