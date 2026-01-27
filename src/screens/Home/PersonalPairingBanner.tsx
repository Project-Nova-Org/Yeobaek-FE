import React from "react";
import { View, Image, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { UndoIcon } from "@/assets/icons";
import { PersonalPairingImage } from "@/assets/images";
import { homeStyles as styles } from "./HomeScreen.styles";

export function PersonalPairingBanner() {
  return (
    <View>
      <Text style={styles.aiSectionTitle}>AI 퍼스널 스타일리스트</Text>

      <Pressable
        style={styles.aiBanner}
        accessibilityRole="button"
        accessibilityLabel="퍼스널 페어링 열기"
        onPress={() => console.log("퍼스널 페어링 화면으로 이동")}
      >
        <Image source={PersonalPairingImage} style={styles.aiImage} />
        <View style={styles.bannerTextContent}>
          <Text style={styles.bannerTitle}>퍼스널 페어링</Text>
          <Text style={styles.bannerSub}>내 아이템에 뭐가 어울릴지 고민이라면...더보기</Text>
        </View>
        <View style={styles.rightArrow}>
          <UndoIcon width={7} height={16} />
        </View>
      </Pressable>
    </View>
  );
}
