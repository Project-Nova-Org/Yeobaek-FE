import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { buttonStyles } from "./ButtonAlert.styles.ts";

const SelectionButtons = () => {
  // 현재 어떤 버튼이 눌렸는지 관리
  const [activeButton, setActiveButton] = useState<"none" | "yes" | "no">("none");

  return (
    <View style={buttonStyles.container}>
      {/* 아니오 버튼 */}
      <Pressable
        // 예 버튼이 눌려있으면 비활성화
        disabled={activeButton === "yes"}
        onPressIn={() => setActiveButton("no")}
        onPressOut={() => setActiveButton("none")}
        style={({ pressed }) => [
          buttonStyles.buttonBase,
          pressed ? buttonStyles.noPressed : buttonStyles.noDefault,
        ]}
      >
        {({ pressed }) => (
          <>
            {/* 눌렀을 때만 Inner Shadow 레이어 표시 */}
            {pressed && <View style={buttonStyles.innerShadow} />}
            <Text style={buttonStyles.buttonText}>아니오</Text>
          </>
        )}
      </Pressable>
      {/* 예 버튼 */}
      <Pressable
        // 아니오 버튼이 눌려있으면 이 버튼은 비활성화
        disabled={activeButton === "no"}
        onPressIn={() => setActiveButton("yes")}
        onPressOut={() => setActiveButton("none")}
        style={({ pressed }) => [
          buttonStyles.buttonBase,
          pressed ? buttonStyles.yesPressed : buttonStyles.yesDefault,
        ]}
      >
        {({ pressed }) => (
          <>
            {pressed && <View style={buttonStyles.innerShadow} />}
            <Text style={buttonStyles.buttonText}>예</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SelectionButtons;
