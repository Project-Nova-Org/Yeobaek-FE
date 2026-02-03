import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const loadOotdStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 18,
    marginBottom: 16,
  },
  sortBtn: { padding: 8 },

  searchWrapper: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    borderRadius: 24,
    shadowColor: Colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  filterTitle: {
    width: 44,
    fontSize: FontSize.s,
    fontWeight: "600",
    color: Colors.primary,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },

  chipText: {
    fontSize: FontSize.s,
    color: Colors.primary,
  },

  chipTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },

  ootdBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 15,
    elevation: 5,
    marginBottom: 10,
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
  selectedThumbnail: { borderColor: Colors.primary },
  thumbnail: { width: "100%", height: "100%" },
  selectBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },
  itemName: { marginTop: 6, fontSize: FontSize.xs, textAlign: "center", color: Colors.black },
  footer: { paddingBottom: 20 },
});
