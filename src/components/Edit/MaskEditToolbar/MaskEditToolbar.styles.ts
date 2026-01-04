import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#E9EBEF",
        borderRadius: 22,

        paddingHorizontal: 4,
        paddingVertical: 8,
    },

    leftGroup: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        gap: 3,
    },

    rightGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    iconBtn: {
        padding: 4,
        minWidth: 28,
        minHeight: 28,
        alignItems: "center",
        justifyContent: "center",
    },

    slider: {
        width: 160,
    },

    sizeText: {
        minWidth: 16,
        textAlign: "left",
        fontSize: 14,
        fontWeight: "600",
        color: "#1B2A41",
    },

    divider: {
        width: 1,
        height: 20,
        backgroundColor: "#D0D4DB",
        marginHorizontal: 8,
    },
});

