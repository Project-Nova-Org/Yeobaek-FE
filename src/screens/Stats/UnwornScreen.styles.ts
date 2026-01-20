import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tooltipContainer: {
    position: "absolute",
    top: 50,
    right: 50,
    backgroundColor: Colors.help,
    padding: 15,
    borderRadius: 8,
    zIndex: 10,
    maxWidth: 240,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxxs,
    color: Colors.primary,
    textAlign: "center",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemCount: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  gridBtn: { padding: 4 },

  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  itemCard2: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },

  itemCard3: {
    width: "31.3%",
    marginHorizontal: "1%",
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
  },

  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemName: {
    fontSize: FontSize.xxs,
    color: Colors.black,
    fontWeight: "600",
  },
});
