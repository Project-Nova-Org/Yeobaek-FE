import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(17, 17, 17, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        backgroundColor: "rgba(17, 17, 17, 0.4)",
        borderRadius: 20,
        paddingVertical: 16,
    },

    header: {
        paddingHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: Colors.white,
        fontSize: FontSize.base,
        fontWeight: "600",
    },

    closeText: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: "700",
    },

  page: {
    overflow: "hidden", // 다음 페이지 안 보이게
  },

  grid: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginBottom: 12,
  },

    label: {
        marginTop: 6,
        fontSize: FontSize.xs,
    },

  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.slider,
  },

  dotActive: {
    backgroundColor: Colors.white,
  },
});