import { StyleSheet } from "react-native";

export const calendarScreenStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  scrollContent: { paddingBottom: 40 },
  monthSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  arrowControls: { flexDirection: "row", alignItems: "center" },
  currentMonthText: { fontSize: 18, fontWeight: "700", marginHorizontal: 10 },
  saveBadge: {
    backgroundColor: "#D1D5DB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveBadgeText: { fontSize: 12, color: "#4B5563", fontWeight: "500" },
});
