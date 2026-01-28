import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const todayOotdStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 326,
    height: 512,
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 200,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 0,
  },
  dateText: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
    marginHorizontal: 25,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    alignItems: "center",
    width: 440,
  },
  cardWrapper: {
    width: 254,
    height: 370,
    borderRadius: 15,
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.primary,
    elevation: 8,
  },
  activeCardBorder: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  emptyCardWrapper: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },

  addMenuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  deleteIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 110,
  },
  checkIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 110,
  },
  emptyContainer: {
    alignItems: "center",
  },
});
