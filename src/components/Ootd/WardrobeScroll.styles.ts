import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingRight: 16,
    },
    card: {
        width: 80,
        marginRight: 12,
        alignItems: "center",
    },
    cardSelected: {
        // 선택된 상태 스타일 (필요시 추가)
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: Colors.background,
        marginBottom: 8,
        position: "relative",
    },
    imageContainerSelected: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    favoriteIconContainer: {
        position: "absolute",
        top: 4,
        right: 4,
        zIndex: 10,
    },
    label: {
        fontSize: 12,
        color: Colors.black,
        textAlign: "center",
    },
});
