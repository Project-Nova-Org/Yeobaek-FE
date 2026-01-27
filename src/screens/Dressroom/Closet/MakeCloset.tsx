import { View, Image } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./MakeCloset.styles";
import { AppText } from "@/components/common/AppText";
import { NicknameInput } from "@/components/Input/NicknameInput";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import PhotoChangeButton from "@/components/Buttons/medium_button/PhotoChangeButton";

export default function MakeCloset() {
  const navigation = useNavigation<any>();
  const [closetName, setClosetName] = useState("");

  const canNext = closetName.length > 0 && closetName.length <= 10;

  const handleNext = () => {
    if (!canNext) return;

    navigation.navigate("AddItemToCloset", {
      closetName,
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="옷장 등록"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        right={<HeaderRight type="button" label="다음" disabled={!canNext} onPress={handleNext} />}
      />

      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image source={{ uri: "https://dummyimage.com/200x200/eee/aaa" }} style={styles.image} />

          <PhotoChangeButton
            onPress={() => {
              console.log("옷장 이미지 선택");
            }}
            label="사진 변경하기"
          />
        </View>

        <View style={styles.inputSection}>
          <AppText style={styles.label}>옷장 이름</AppText>

          <NicknameInput
            value={closetName}
            onChange={setClosetName}
            placeholder="공백 포함 15자 이내 한글, 영문, 숫자로 입력해주세요."
            variant="rounded"
          />
        </View>
      </View>
    </View>
  );
}
