import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 11,
    marginVertical: 10,
  },

  closetImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },

  closetName: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.black,
    marginLeft: 17,
  },

  favoriteButton: {
    marginLeft: 11,
    padding: 6,
    borderRadius: 100,
    backgroundColor: Colors.white,
    boxShadow: [
      {
        offsetX: -0.5,
        offsetY: -1.5,
        blurRadius: 4,
        spreadDistance: -2,
        color: Colors.shadow,
        inset: true,
      },
      {
        offsetX: 0.5,
        offsetY: 1.5,
        blurRadius: 4,
        spreadDistance: -2,
        color: Colors.shadow,
        inset: true,
      },
    ],
  },

  deleteButton: {
    padding: 7,
    borderRadius: 100,
    backgroundColor: Colors.white,
    position: "absolute",
    right: 44,
  },

  editButton: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: Colors.white,
    position: "absolute",
    right: 0,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
    elevation: 6,
    paddingLeft: 18,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: FontSize.sm,
    color: Colors.black,
  },

  gridWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 15,
    elevation: 3,
    marginBottom: 78,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
  },

  card: {
    width: "30%",
    alignItems: "center",
  },

  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },

  itemName: {
    marginTop: 6,
    fontSize: FontSize.xs,
    color: Colors.black,
  },

  plusCard: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
