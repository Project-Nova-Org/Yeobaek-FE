import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const personalPairingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleSection: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  subTitle: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.black,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 28,
    gap: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.black,
  },
  gridWrapper: {
    flex: 1,
    padding: 20,
    borderRadius: 28,
    marginHorizontal: 16,
    marginBottom: 30,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  card: {
    width: "30%",
  },

  thumbnailWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.background,
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
  },
  selectedThumbnail: {
    borderColor: Colors.primary,
  },
  selectBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },

  itemName: {
    marginTop: 6,
    fontSize: FontSize.xs,
    textAlign: "center",
    color: Colors.black,
  },
  footer: { paddingBottom: 20 },

  resultScroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  selectedItemSection: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  resultSubTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  selectedCard: {
    width: "100%",
    alignItems: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },

  recommendSection: {
    marginBottom: 30,
  },

  recommendGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendHalfCard: {
    width: "48%",
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  recommendMainImage: {
    width: "100%",
    height: "100%",
  },
  matchingSection: {
    marginTop: 10,
  },

  matchingThreeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchingThreeCard: {
    width: "30%",
  },
  matchingThumbnailWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 6,
  },
  matchingThumbnail: {
    width: "100%",
    height: "100%",
  },
  matchingItemName: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.black,
  },
});
