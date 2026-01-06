import { StyleSheet } from "react-native";
import { FontSize } from "@/theme/typography.ts";
import { Colors } from "@/theme/colors";

export const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonBase: {
    width: 110,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  innerShadow: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: 7,
        color: Colors.shadow,
        inset: true, // 안쪽 그림자 설정
      },
    ],
  },

  buttonText: {
    fontSize: FontSize.sm,
    fontWeight: "500",
    color: Colors.white,
  },

  // 아니오 버튼
  noDefault: {
    backgroundColor: Colors.noStandard, // 평상시
  },
  noPressed: {
    backgroundColor: Colors.noPressed, // 눌렀을 때
  },

  // 예 버튼
  yesDefault: {
    backgroundColor: Colors.primary, // 평상시
  },
  yesPressed: {
    backgroundColor: Colors.yesPressed, // 눌렀을 때
  },
});
