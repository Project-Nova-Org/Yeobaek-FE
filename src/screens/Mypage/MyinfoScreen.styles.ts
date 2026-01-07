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
    width: 220,
    height: 330,
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
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
    fontSize: 10,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    width: 180,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 12,
    color: Colors.black,
  },
  unitText: {
    fontSize: 12,
    color: Colors.black,
    marginLeft: 5,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 10,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  genderActive: {
    backgroundColor: Colors.primary,
  },
  genderText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: "600",
  },
  genderTextActive: {
    color: Colors.white,
  },
  submitButton: {
    height: 52,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitActive: {
    backgroundColor: Colors.primary,
  },
  submitDisabled: {
    backgroundColor: Colors.disable,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
