import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 50,
  },

  /* 헤더 */
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  title: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.black,
  },

  /* 검색 */
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

  /* 그리드 */
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
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.mamoBox,
  },

  thumbnail: {
    width: "100%",
    height: "100%",
  },

  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "700",
  },

  itemName: {
    marginTop: 6,
    fontSize: FontSize.xs,
    textAlign: "center",
    color: Colors.black,
  },
});
