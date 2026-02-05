import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography";

export const styles = StyleSheet.create({
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
    marginBottom: 24,
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
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.black,
  },
  infoValue: {
    fontSize: FontSize.md,
    fontWeight: "500",
    color: Colors.black,
  },
  editButtonWrap: {
    marginTop: 45,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.white,
  },
});
