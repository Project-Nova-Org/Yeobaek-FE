import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 20,
  },

  imageWrapper: {
    paddingTop: 42,
    gap: 11,
  },

  image: {
    alignSelf: "center",
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: Colors.background2,
  },

  ootdButton: {
    alignSelf: "center",
  },

  ootdButtonText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
  },

  infoList: {
    marginTop: 24,
    gap: 18,
    marginLeft: 26,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },

  infoLabel: {
    width: 90,
    fontSize: FontSize.base,
    color: Colors.noStandard,
  },

  infoValue: {
    fontSize: FontSize.base,
    color: Colors.primary,
  },

  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  memoBox: {
    marginHorizontal: 14,
    backgroundColor: Colors.mamoBox,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  memoText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
});
