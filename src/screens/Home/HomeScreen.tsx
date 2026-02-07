import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppText as Text } from "@/components/common/AppText";
import { homeStyles as styles } from "./HomeScreen.styles";
import { UndoIcon } from "@/assets/icons";
import { SampleOOTDImage } from "@/assets/images";
import { weatherData } from "./HomeData";
import { HomeTop } from "@/components/Top/HomeTop";
import { AICoordiBanner } from "./AICoordiBanner.tsx";
import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { MainTabParamList } from "@/types/navigation/MainTabParamList";
import { getFavoriteClosets, subscribeClosetList } from "@/stores/closetStore";

type HomeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "Home">,
  BottomTabNavigationProp<MainTabParamList>
>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [favoriteClosets, setFavoriteClosets] = useState(() => getFavoriteClosets());

  useEffect(() => {
    const unsub = subscribeClosetList(() => setFavoriteClosets(getFavoriteClosets()));
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <HomeTop />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionHeader}>
          <Pressable
            style={styles.sectionTitleRow}
            onPress={() => navigation.navigate("DressroomTab")}
          >
            <Text style={styles.sectionTitle}>즐겨찾기 옷장</Text>
            <View style={styles.rightArrow}>
              <UndoIcon width={6} height={10} />
            </View>
          </Pressable>
        </View>

        <View style={styles.favoriteContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoriteListContent}
          >
            {favoriteClosets.map((item) => (
              <Pressable
                key={item.id}
                style={styles.favoriteCard}
                onPress={() =>
                  navigation.navigate("DressroomTab", {
                    screen: "ClosetDetail",
                    params: { closetId: item.id },
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.closetImage} />
                </View>
                <Text style={styles.closetName} numberOfLines={1}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

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

        <AICoordiBanner />
      </ScrollView>
    </View>
  );
}
