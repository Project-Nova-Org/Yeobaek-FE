import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: Colors.background2,
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
        color: Colors.primary,
    },

    divider: {
        width: 1,
        height: 20,
        backgroundColor: Colors.inactive,
        marginHorizontal: 8,
    },
});