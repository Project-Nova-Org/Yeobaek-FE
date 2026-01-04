import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        backgroundColor: "#9E9E9E",
        borderRadius: 20,
        paddingVertical: 16,
    },

    header: {
        paddingHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
    },

    closeText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },

    page: {
        overflow: "hidden", // 다음 페이지 안 보이게
    },

    grid: {
        padding: 16,
        flexDirection: "row",
        flexWrap: "wrap",
    },

    card: {
        backgroundColor: "white",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        marginBottom: 12,
    },

    label: {
        marginTop: 6,
        fontSize: 12,
    },

    indicator: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
        gap: 6,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#D0D0D0",
    },

    dotActive: {
        backgroundColor: "white",
    },
});