import React from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { homeStyles as styles } from "./HomeScreen.styles";
import { UndoIcon } from "@/assets/icons";
import { SampleOOTDImage } from "@/assets/images";
import { favoriteClosets, weatherData } from "./HomeData";
import { HomeTop } from "@/components/Top/HomeTop";
import { AICoordiBanner } from "./AICoordiBanner.tsx";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeTop />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionHeader}>
          <Pressable style={styles.sectionTitleRow} onPress={() => console.log("옷장 전체보기")}>
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
                onPress={() => console.log(`${item.name} 옷장으로 이동`)}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.closetImage} />
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
