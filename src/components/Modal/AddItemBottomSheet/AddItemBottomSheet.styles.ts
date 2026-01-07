import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.black,
  },

  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.slider,
    alignSelf: "center",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    height: 120, // 카드 높이 고정 (디자인 안정)
    justifyContent: "space-between",
  },

  label: {
    fontSize: FontSize.sm,
    fontWeight: "500",
    color: Colors.darkgray,
  },

  iconWrap: {
    alignSelf: "flex-end", //  오른쪽 정렬
    color: Colors.darkgray,
  },
});
