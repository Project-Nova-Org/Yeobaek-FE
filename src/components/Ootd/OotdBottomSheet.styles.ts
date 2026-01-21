import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    indicator: {
        width: 44,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.gray400,
    },
    content: {
        flex: 1,
        paddingBottom: 12,
        // ScrollView가 작동하도록
        overflow: "visible",
    },
    wardrobeContentWrapper: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 8,
        paddingTop: 8,
        paddingBottom: 12,
        height : 600,
    },
});