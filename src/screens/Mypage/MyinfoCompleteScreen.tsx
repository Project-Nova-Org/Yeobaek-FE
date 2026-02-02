import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  Image,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText } from "@/components/common/AppText";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MypageStackParamList } from "@/types/navigation/MypageStackParamList";
import { styles } from "./MyinfoCompleteScreen.styles";

type Props = NativeStackScreenProps<MypageStackParamList, "MyinfoComplete">;

export default function MyinfoCompleteScreen({ navigation, route }: Props) {
  const { savedData } = route.params;
  const { height, weight, gender, image } = savedData;

  const goToMypage = () => {
    navigation.navigate("Mypage");
  };

  useFocusEffect(
    React.useCallback(() => {
      const onHardwareBack = () => {
        goToMypage();
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onHardwareBack
      );
      return () => sub.remove();
    }, [navigation])
  );

  const genderLabel =
    gender === "male" ? "남성" : gender === "female" ? "여성" : "—";

  const handleEdit = () => {
    navigation.replace("Myinfo", {
      initialData: savedData,
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="맞춤 정보"
        left={<HeaderLeft type="icon" onPress={goToMypage} />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            {image ? (
              <Image source={{ uri: image }} style={styles.fullImage} />
            ) : (
              <View style={styles.emptyImage} />
            )}
          </View>
        </View>

        <AppText style={styles.sectionTitle}>체형 정보</AppText>
        <View style={styles.infoRow}>
          <AppText style={styles.infoLabel}>키</AppText>
          <AppText style={styles.infoValue}>{height ? `${height} cm` : "—"}</AppText>
        </View>
        <View style={styles.infoRow}>
          <AppText style={styles.infoLabel}>몸무게</AppText>
          <AppText style={styles.infoValue}>{weight ? `${weight} kg` : "—"}</AppText>
        </View>
        <View style={styles.infoRow}>
          <AppText style={styles.infoLabel}>성별</AppText>
          <AppText style={styles.infoValue}>{genderLabel}</AppText>
        </View>

        <View style={styles.editButtonWrap}>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <AppText style={styles.editButtonText}>수정</AppText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
