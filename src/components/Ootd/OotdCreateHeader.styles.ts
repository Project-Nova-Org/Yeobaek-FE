import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
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
    nextBtn: {
        minWidth: 68,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 14,
    },
    nextBtnEnabled: {
        backgroundColor: Colors.primary,
    },
    nextBtnDisabled: {
        backgroundColor: Colors.gray400,
    },
    nextText: {
        fontSize: 14,
        fontWeight: "600",
    },
});