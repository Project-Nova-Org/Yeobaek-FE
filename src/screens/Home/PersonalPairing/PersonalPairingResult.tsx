import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText as Text } from "@/components/common/AppText";
import { MOCK_ITEMS, FashionItem } from "@/screens/Dressroom/dressroom.mock";
import { MOCK_PAIRING_DATA, PairingRecommendation } from "./PersonalPairingData";
import { personalPairingStyles as styles } from "./PersonalPairing.styles";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

type RouteParams = {
  PersonalPairingResult: { itemId: number };
};

export function PersonalPairingResult() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "PersonalPairingResult">>();
  const itemId = route.params?.itemId;

  const baseItem = useMemo(() => {
    return MOCK_ITEMS.find((item: FashionItem) => item.id === itemId);
  }, [itemId]);

  const recommendation: PairingRecommendation | null = useMemo(() => {
    return MOCK_PAIRING_DATA[itemId] || null;
  }, [itemId]);

  // 데이터가 없을 때
  if (!baseItem || !recommendation) {
    return (
      <View style={styles.container}>
        <AppHeader
          title="추천 결과"
          left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>데이터를 찾을 수 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="퍼스널 페어링"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultScroll}>
        <View style={styles.selectedItemSection}>
          <View style={styles.selectedCard}>
            <Image source={{ uri: baseItem.imageUrl }} style={styles.selectedImage} />
          </View>
        </View>

        <View style={styles.recommendSection}>
          <Text style={styles.resultSubTitle}>추천 코디</Text>
          <View style={styles.recommendGrid}>
            {recommendation.recommendedOotds.map((img, index) => (
              <Pressable
                key={index}
                style={styles.recommendHalfCard}
                onPress={() => {
                  navigation.navigate("OotdTab", {
                    screen: "OotdCreate",
                    params: {
                      canvasItems: [],
                      canvasSize: { width: 375, height: 600 },
                    },
                  });
                }}
              >
                <Image source={img} style={styles.recommendMainImage} resizeMode="cover" />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.matchingSection}>
          <Text style={styles.resultSubTitle}>추천 아이템</Text>
          <View style={styles.matchingThreeGrid}>
            {recommendation.matchingItems.map((mItem) => (
              <Pressable
                key={mItem.id}
                style={styles.matchingThreeCard}
                onPress={() => {
                  const numericId = parseInt(mItem.id.replace(/[^0-9]/g, "")) || 0;
                  navigation.navigate("DressroomTab", {
                    screen: "ItemDetail",
                    params: { itemId: numericId },
                  });
                }}
              >
                <View style={styles.matchingThumbnailWrapper}>
                  <Image source={mItem.image} style={styles.matchingThumbnail} />
                </View>
                <Text style={styles.matchingItemName} numberOfLines={1}>
                  {mItem.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
