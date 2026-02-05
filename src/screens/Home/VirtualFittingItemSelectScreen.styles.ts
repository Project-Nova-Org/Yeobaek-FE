import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const headerStyles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 23,
    color: Colors.primary,
    fontWeight: "900",
  },
  rightIconGroup: {
    minWidth: 68,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 18,
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
    marginBottom: 100,
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
  thumbnailWrap: {
    width: "100%",
    position: "relative",
  },
  thumbnailWrapSelected: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  thumbnailSelected: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  itemName: {
    marginTop: 6,
    fontSize: FontSize.xs,
    color: Colors.black,
  },
  createBtnWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingVertical: 16,
    paddingBottom: 34,
    backgroundColor: Colors.background,
  },
  createBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  createBtnDisabled: {
    backgroundColor: Colors.disable,
  },
  createBtnText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.white,
  },
  createBtnTextDisabled: {
    color: Colors.textDisabled,
  },
});
