import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        height: 56,
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
    backText: {
        fontSize: 18,
        color: Colors.gray400,
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        color: Colors.gray400,
        fontWeight: "600",
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
    left: {
        width :40,
    },
});