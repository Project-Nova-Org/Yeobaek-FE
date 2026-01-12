import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const MyinfoScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  imageSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
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
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
    marginTop: 10,
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
    marginTop: 45,
  },

  tooltipContainer: {
    position: "absolute",
    top: -20,
    right: 10,
    backgroundColor: Colors.help,
    padding: 15,
    borderRadius: 8,
    zIndex: 10,
    maxWidth: 240,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxxs,
    color: Colors.primary,
    textAlign: "center",
  },
});
