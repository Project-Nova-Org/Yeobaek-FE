import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fixedContent: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
  },
  rightArrow: {
    transform: [{ scaleX: -1 }],
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteContainer: {
    marginHorizontal: 20,
    overflow: "hidden",
    marginTop: 14,
  },
  favoriteListContent: {
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 2,
  },
  favoriteCard: {
    width: 70,
    height: 88,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginRight: 6,
    alignItems: "center",
    elevation: 2,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.white,
    marginBottom: 6,
  },
  closetImage: {
    width: "100%",
    height: "100%",
  },
  closetName: {
    fontSize: FontSize.xxs,
    fontWeight: "500",
    color: Colors.black,
    textAlign: "center",
  },
  weatherCard: {
    height: 220,
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4,
    alignItems: "center",
  },
  weatherInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.black,
    textAlign: "center",
  },
  weatherIconContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },

  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  tempText: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    lineHeight: 34,
  },
  tempTextGroup: {
    justifyContent: "center",
  },
  weatherStatus: {
    fontSize: FontSize.xs,
    color: Colors.black,
    textAlign: "center",
  },
  recommendText: {
    marginTop: -12,
    marginLeft: 10,
    fontSize: FontSize.xxs,
    fontWeight: "600",
    color: Colors.black,
    lineHeight: 15,
  },
  outfitImage: {
    width: 120,
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  outfitImageShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: 1,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: -2,
        color: Colors.shadow,
        inset: true,
      },
    ],
  },

  aiSectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
    marginHorizontal: 20,
    marginTop: 26,
    marginBottom: 12,
  },
  aiBanner: {
    marginHorizontal: 18,
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
  },
  aiImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  bannerTextContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 5,
  },
  bannerSub: {
    fontSize: FontSize.xxs,
    fontWeight: "500",
    color: Colors.black,
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countText: {
    fontSize: FontSize.xxs,
    fontWeight: "500",
    color: Colors.black,
  },
});
