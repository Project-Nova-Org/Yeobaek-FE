import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const loadOotdStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: FontSize.sm,
  },
  filterArea: {
    marginTop: 10,
    height: 100,
  },
  gridWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 25,
    padding: 15,
    elevation: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    marginBottom: 20,
    alignItems: "center",
  },
  thumbnailWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#F2F2F2",
    position: "relative",
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  checkBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  itemName: {
    marginTop: 5,
    fontSize: FontSize.xxs,
    color: "#333",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
