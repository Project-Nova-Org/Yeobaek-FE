import { View, Image } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./MakeCloset.styles";
import { AppText } from "@/components/common/AppText";
import { NicknameInput } from "@/components/Input/NicknameInput";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import PhotoChangeButton from "@/components/Buttons/medium_button/PhotoChangeButton";

import { MOCK_CLOSETS } from "@/screens/Dressroom/dressroom.mock";

export default function EditClosetInfo() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { closetId } = route.params;

  const closet = MOCK_CLOSETS.find((c) => c.id === closetId);

  const [closetName, setClosetName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!closet) return;

    setClosetName(closet.name);
    setImageUrl(closet.imageUrl);
  }, [closet]);

  const canDone = closetName.length > 0 && closetName.length <= 10;

  if (!closet) {
    return <View style={styles.container} />;
  }

  const handleDone = () => {
    if (!canDone) return;

    console.log("수정된 옷장 정보", {
      closetId,
      name: closetName,
      imageUrl,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="옷장 수정"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        right={<HeaderRight type="button" label="완료" disabled={!canDone} onPress={handleDone} />}
      />

      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image source={{ uri: imageUrl }} style={styles.image} />

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
