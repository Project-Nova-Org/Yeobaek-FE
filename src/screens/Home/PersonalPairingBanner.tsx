import React from "react";
import { View, Image, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { UndoIcon } from "@/assets/icons";
import { PersonalPairingImage } from "@/assets/images";
import { homeStyles as styles } from "./HomeScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function PersonalPairingBanner() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View>
      <Pressable
        style={styles.aiBanner}
        accessibilityRole="button"
        accessibilityLabel="퍼스널 페어링 열기"
        onPress={() => navigation.navigate("PersonalPairing")}
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
