import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    canvas: {
        flex: 1,
        overflow: "hidden",
    },
    itemImage: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },
});