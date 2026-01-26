import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },

  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },

  tab: {
    marginHorizontal: 18,
    gap: 10,
  },

  tabBox: {
    width: 100,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },

  tabBoxActive: {
    borderBottomColor: Colors.black,
  },

  tabText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.tapText,
    lineHeight: 20,
  },

  tabActiveText: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.black,
    lineHeight: 20,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  sortButton: {
    width: 36,
    height: 36,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 12,
    elevation: 6,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: FontSize.sm,
    color: Colors.black,
  },

  searchOverlay: {
    position: "absolute",
    top: 12,
    left: 16,
    right: 16,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    elevation: 20,
    zIndex: 10,
  },

  searchOverlayInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: FontSize.sm,
    color: Colors.black,
  },

  gridWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 15,
    elevation: 3,
    marginBottom: 130,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
  },

  card: {
    width: "30%",
  },

  thumbnailWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  favoriteButtonOuter: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 22,
    height: 22,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: 2,
        color: Colors.shadow,
        inset: true,
      },
    ],
  },

  favoriteButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  itemName: {
    fontSize: FontSize.xs,
    textAlign: "center",
    color: Colors.black,
    overflow: "hidden",
  },

  plusCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  dimLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    borderRadius: 16,
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
