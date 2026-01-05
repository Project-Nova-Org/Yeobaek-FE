import React from "react";
import { View, StyleSheet } from "react-native";
import NicknameButton from "@/components/buttons/nickname_button/NicknameButton";
import { Colors } from "@/theme/colors.ts";

const ButtonTest = () => {
  const handlePress = () => {
    console.log("버튼이 클릭되었습니다!");
  };

  return (
    <View style={styles.testContainer}>
      {/* 활성화된 버튼 테스트 */}
      <NicknameButton isActive={true} onPress={handlePress} label="그림자 테스트" />

      {/* 비활성화된 버튼 테스트 */}
      <View style={{ marginTop: 20 }}>
        <NicknameButton isActive={false} onPress={handlePress} label="비활성 버튼" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

export default ButtonTest;
