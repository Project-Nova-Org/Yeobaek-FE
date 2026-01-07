import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import NicknameButton from "@/components/Buttons/nickname_button/NicknameButton";
import AddPhotoButton from "@/components/Buttons/medium_button/AddPhotoButton";
import { Colors } from "@/theme/colors.ts";

const ButtonTest = () => {
  const handlePress = (message: string) => {
    console.log(message);
    Alert.alert("클릭 알림", message);
  };

  return (
    <View style={styles.testContainer}>
      <View style={styles.section}>
        <NicknameButton
          isActive={true}
          onPress={() => handlePress("닉네임 버튼 클릭!")}
          label="그림자 테스트"
        />
      </View>
      <View style={styles.section}>
        <AddPhotoButton onPress={() => handlePress("사진 추가 버튼 클릭!")} label="사진 등록하기" />
      </View>
      <View style={styles.section}>
        <NicknameButton isActive={false} onPress={() => {}} label="비활성 버튼" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background || "#FFFFFF",
    padding: 20,
  },
  section: {
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
  },
});

export default ButtonTest;
