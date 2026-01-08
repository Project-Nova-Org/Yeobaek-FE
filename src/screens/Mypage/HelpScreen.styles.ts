import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const helpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  itemWrapper: {
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 12,
  },
  headerRowActive: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.slider,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemTitle: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.black,
  },
  contentBox: {
    padding: 18,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  subTitle: {
    fontSize: FontSize.s,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
    marginTop: 22,
  },
  description: {
    fontSize: FontSize.xs,
    color: Colors.black,
    lineHeight: 18,
    paddingLeft: 10,
  },
  linkText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    textDecorationLine: "underline",
    paddingLeft: 10,
    marginTop: 4,
  },
});
