import React from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { homeStyles as styles } from "./HomeScreen.styles";
import { UndoIcon } from "@/assets/icons";
import {
  ChatbotImage,
  VirtualFittingImage,
  SampleOOTDImage,
  PersonalParingImage,
} from "@/assets/images";
import { favoriteClosets, weatherData, fittingCount } from "./HomeData";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 즐겨찾기 옷장 */}
        <View style={styles.sectionHeader}>
          <Pressable
            style={styles.sectionTitleRow}
            onPress={() => console.log("옷장 전체보기")}
            accessibilityRole="button"
            accessibilityLabel="즐겨찾기 옷장 전체보기"
          >
            <Text style={styles.sectionTitle}>즐겨찾기 옷장</Text>
            <View style={styles.rightArrow}>
              <UndoIcon width={6} height={10} />
            </View>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoriteListContent}
        >
          {favoriteClosets.map((item) => (
            <Pressable key={item.id} style={styles.favoriteCard} onPress={() => {}}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.closetImage} resizeMode="cover" />
              </View>
              <Text style={styles.closetName} numberOfLines={1}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 날씨 코디 추천 */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherInfo}>
            <Text style={styles.dateText}>{weatherData.date}</Text>
            <View style={styles.tempRow}>
              <View style={styles.weatherIconContainer}>
                <Image source={weatherData.image} style={styles.weatherIcon} />
              </View>
              <View style={styles.tempTextGroup}>
                <Text style={styles.tempText}>{weatherData.temperature}</Text>
                <Text style={styles.weatherStatus}>{weatherData.weather}</Text>
              </View>
            </View>
            <Text style={styles.recommendText}>{weatherData.comment}</Text>
          </View>
          <View style={styles.outfitImage}>
            <Image source={SampleOOTDImage} style={{ width: "100%", height: "100%" }} />
            <View style={styles.outfitImageShadow} pointerEvents="none" />
          </View>
        </View>

        {/* AI 퍼스널 스타일리스트 */}
        <Text style={styles.aiSectionTitle}>AI 퍼스널 스타일리스트</Text>
        <Pressable style={styles.aiBanner} onPress={() => {}}>
          <Image source={ChatbotImage} style={styles.aiImage} />
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>백여사</Text>
            <Text style={styles.bannerSub}>옷 관리방법을 잘 모를 땐 역시 엄마~!!</Text>
          </View>
          <View style={styles.rightArrow}>
            <UndoIcon width={7} height={16} />
          </View>
        </Pressable>

        <Pressable style={styles.aiBanner} onPress={() => {}}>
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

        <Pressable style={styles.aiBanner} onPress={() => {}}>
          <Image source={PersonalParingImage} style={styles.aiImage} />
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>퍼스널 페어링</Text>
            <Text style={styles.bannerSub}>내 아이템에 뭐가 어울릴지 고민이라면...더보기</Text>
          </View>
          <View style={styles.rightArrow}>
            <UndoIcon width={7} height={16} />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}
