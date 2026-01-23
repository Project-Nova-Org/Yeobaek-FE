import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },

    list: {
        paddingTop: 10,
        paddingBottom: 40,
    },

    row: {
        justifyContent: "flex-start",
        marginBottom: 12,
    },

    card: {
        width: "22%",            // 4열 + 간격 맞추기
        marginRight: 13,
        marginBottom: 16,
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    cardSelected: {
        // 선택된 상태에서는 border가 imageContainer에만 적용됨
    },

    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 12,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",

        // Android shadow
        elevation: 1,

    },

    imageContainerSelected: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },

    img: {
        width: "90%",
        height: "90%",
    },

    selectIconContainer: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },

    label: {
        fontSize: 12,
        color: Colors.black,
        textAlign: "center",
        width: "100%",
    },
});