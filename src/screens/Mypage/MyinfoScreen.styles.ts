import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

/** 가상피팅과 동일한 헤더 레이아웃(높이 70, padding, 제목 23px·900) */
export const headerStyles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginRight: -25,
    justifyContent: "center",
  },
  rightIconGroup: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 68,
  },
});

export const MyinfoScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  imageSection: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 180,
    height: 320,
    backgroundColor: Colors.disable,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  emptyImage: {
    flex: 1,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  imageButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  imageButtonText: {
    color: Colors.white,
    fontSize: FontSize.xxs,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: 180,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 36,
    fontSize: FontSize.xs,
    color: Colors.black,
  },
  unitText: {
    fontSize: FontSize.xs,
    color: Colors.black,
    marginLeft: 5,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  genderActive: {
    backgroundColor: Colors.primary,
  },
  genderText: {
    fontSize: FontSize.xxs,
    color: Colors.black,
    fontWeight: "600",
  },
  genderTextActive: {
    color: Colors.white,
  },
  addButton: {
    marginTop: 16,
  },

  tooltipContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: Colors.border,
    marginRight:10,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    maxWidth: 240,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxxs,
    color: Colors.primary,
    textAlign: "center",
  },
});
