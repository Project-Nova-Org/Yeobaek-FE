import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
        marginLeft :20,
    },
    tab: {
        paddingBottom: 8,
        marginRight: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        color: Colors.gray400,
        fontWeight: "500",
    },
    tabTextActive: {
        color: Colors.black,
        fontWeight: "600",
    },
});