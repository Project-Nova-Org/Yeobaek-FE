import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cellWidth = width / 7;

export const calendarStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  weekRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#F2F2F2",
  },
  weekText: {
    width: cellWidth,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: cellWidth,
    height: cellWidth * 1.5, // 세로로 긴 형태
    padding: 2,
    borderBottomWidth: 0.2,
    borderColor: "#f0f0f0",
  },
  unregisteredCell: {
    backgroundColor: "#F9FAFB", // 등록 안 된 날짜 배경
    borderRadius: 4,
    margin: 1,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "500",
    paddingLeft: 4,
  },
  otherMonthText: { color: "transparent" }, // 이번 달 아니면 숨김
  futureText: { color: "#E5E7EB" }, // 미래 날짜 흐리게
  sunday: { color: "#FF3B30" },
  saturday: { color: "#007AFF" },
  imageWrapper: {
    flex: 1,
    marginTop: 2,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#E5E7EB", // 이미지 플레이스홀더
  },
  placeholderImg: {
    flex: 1,
  },
});
