import React from "react";
import { View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AppText as Text } from "@/components/common/AppText";
import { UndoIcon } from "@/assets/icons";
import { ChatbotImage, VirtualFittingImage, PersonalPairingImage } from "@/assets/images";
import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { fittingCount } from "./HomeData";
import { homeStyles as styles } from "./HomeScreen.styles";


export function AICoordiBanner() {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();


  return (
    <View>
      <Text style={styles.aiSectionTitle}>AI 퍼스널 스타일리스트</Text>

      <Pressable
        style={styles.aiBanner}
        accessibilityRole="button"
        accessibilityLabel="AI 퍼스널 스타일리스트 백여사 열기"
        onPress={() => navigation.navigate({ name: "ChatBot", params: undefined })}
      >
        <Image source={ChatbotImage} style={styles.aiImage} />
        <View style={styles.bannerTextContent}>
          <Text style={styles.bannerTitle}>백여사</Text>
          <Text style={styles.bannerSub}>옷 관리방법을 잘 모를 땐 역시 엄마~!!</Text>
        </View>
        <View style={styles.rightArrow}>
          <UndoIcon width={7} height={16} />
        </View>
      </Pressable>

      <Pressable
        style={styles.aiBanner}
        accessibilityRole="button"
        accessibilityLabel={`가상피팅 열기, 현재 ${fittingCount.totalCount}회 중 ${fittingCount.currentCount}회 남음`}
        onPress={() => navigation.navigate({ name: "VirtualFitting", params: {} })}
      >
        <Image source={VirtualFittingImage} style={styles.aiImage} />
        <View style={styles.bannerTextContent}>
          <Text style={styles.bannerTitle}>가상피팅</Text>
          <Text style={styles.bannerSub}>옷이 문제인지 얼굴이 문제인지 알고싶을 때</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {fittingCount.currentCount} / {fittingCount.totalCount}
          </Text>
          <View style={styles.rightArrow}>
            <UndoIcon width={7} height={16} />
          </View>
        </View>
      </Pressable>

      <Pressable
        style={styles.aiBanner}
        accessibilityRole="button"
        accessibilityLabel="퍼스널 페어링 열기"
        onPress={() => navigation.navigate({ name: "PersonalPairing", params: undefined })}
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
