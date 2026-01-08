import React, { useState } from "react";
import { View } from "react-native";
import { sinupStyles as styles } from "@/screens/Auth/Auth.styles.ts";
import { AppText } from "@/components/common/AppText.tsx";
import { NicknameInput } from "@/components/Input/NicknameInput.tsx";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import NicknameButton from "@/components/Buttons/nickname_button/NicknameButton.tsx";
import { Colors } from "@/theme/colors";
import Alert from "@/components/Alert/Alert";

const NicknameEditScreen = ({ navigation, route }: any) => {
  const currentNickname = route?.params?.currentNickname || "";
  const [nickname, setNickname] = useState(currentNickname);
  const [isExitAlertVisible, setIsExitAlertVisible] = useState(false);

  const handleBack = () => {
    if (nickname !== currentNickname) {
      setIsExitAlertVisible(true);
    } else {
      navigation.goBack();
    }
    setIsExitAlertVisible(true);
  };

  const isValidNickname =
    nickname.length > 0 &&
    nickname.length <= 10 &&
    /^[가-힣a-zA-Z0-9\s]*$/.test(nickname) &&
    nickname !== currentNickname;

  return (
    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <View
        style={{
          width: "100%",
          height: 55,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.white,
          paddingHorizontal: 4,
        }}
      >
        <HeaderLeft type="icon" onPress={handleBack} />
      </View>

      <View style={styles.content}>
        <AppText style={styles.title}>닉네임을 입력해주세요</AppText>
        <NicknameInput value={nickname} onChange={setNickname} />
      </View>
      <NicknameButton onPress={() => navigation.goBack()} isActive={isValidNickname} />
      <Alert
        visible={isExitAlertVisible}
        message={"닉네임 변경을\n중단하시겠습니까?"}
        onConfirm={() => {
          setIsExitAlertVisible(false);
          navigation.goBack();
        }}
        onCancel={() => setIsExitAlertVisible(false)}
      />
    </View>
  );
};

export default NicknameEditScreen;
