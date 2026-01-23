import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    row: {
        justifyContent: "flex-start",
        marginBottom: 16,
    },
    card: {
        width: "18%", // 5개씩 배치 (100% / 5 = 20%, 여백 고려하여 18%)
        marginRight: "2.5%",
    },
    cardSelected: {
        // 선택된 상태 스타일 (필요시 추가)
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
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
