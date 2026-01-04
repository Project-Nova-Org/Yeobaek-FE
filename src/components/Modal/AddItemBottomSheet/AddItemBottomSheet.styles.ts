import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(17, 17, 17, 0.4)",
    },

    sheet: {
        backgroundColor: Colors.white,
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
        backgroundColor:Colors.silder,
        alignSelf: "center",
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    card: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: 16,
        padding: 16,
        height: 120,                 // 카드 높이 고정 (디자인 안정)
        justifyContent: "space-between",
    },

    label: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.darkgray,
    },

    iconWrap: {
        alignSelf: "flex-end",        //  오른쪽 정렬
        color: Colors.darkgray,
    },
});