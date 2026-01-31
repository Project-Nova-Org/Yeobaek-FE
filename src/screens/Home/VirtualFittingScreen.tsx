import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { AppText } from "@/components/common/AppText";
import { AppHeader } from "@/components/Header/AppHeader";
import { BackIcon, HelpIcon, ItemPlus } from "@/assets/icons";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import { Colors } from "@/theme/colors";
import {
  styles,
  virtualFittingHeaderStyles,
} from "./VirtualFittingScreen.styles";

type NavigationProp = StackNavigationProp<HomeStackParamList, "VirtualFitting">;

const TOTAL_SLOTS = 6;

export function VirtualFittingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [addItemSheetVisible, setAddItemSheetVisible] = useState(false);

  const openAddItemSheet = () => setAddItemSheetVisible(true);
  const closeAddItemSheet = () => setAddItemSheetVisible(false);

  const handleCamera = () => {
    closeAddItemSheet();
    // TODO: 카메라로 아이템 촬영
  };

  const handleGallery = () => {
    closeAddItemSheet();
    // TODO: 갤러리에서 아이템 선택
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="가상 피팅"
        left={
          <Pressable
            style={virtualFittingHeaderStyles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <BackIcon width={24} height={24} color={Colors.primary} />
          </Pressable>
        }
        right={
          <Pressable style={virtualFittingHeaderStyles.rightIconGroup}>
            <HelpIcon width={24} height={24} color={Colors.primary} />
          </Pressable>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.modelArea} />

        <Pressable style={styles.changePhotoBtn}>
          <AppText style={styles.changePhotoBtnText}>
            전신 사진 변경하기
          </AppText>
        </Pressable>

        <AppText style={styles.sectionTitle}>입어 볼 아이템</AppText>
        <View style={styles.itemGrid}>
          <Pressable
            style={[styles.itemSlot]}
            onPress={openAddItemSheet}
            accessibilityRole="button"
            accessibilityLabel="입어 볼 아이템 추가"
          >
            <ItemPlus width={32} height={32} color={Colors.primary} />
          </Pressable>
          {Array.from({ length: TOTAL_SLOTS - 1 }).map((_, i) => (
            <View
              key={i}
              style={[styles.itemSlot, styles.itemSlotPlaceholder]}
            />
          ))}
        </View>

        <View style={styles.fittingBtnWrap}>
          <Pressable style={styles.fittingBtn} disabled>
            <AppText style={styles.fittingBtnText}>피팅하기</AppText>
          </Pressable>
        </View>
      </ScrollView>

      <AddItemBottomSheet
        visible={addItemSheetVisible}
        onClose={closeAddItemSheet}
        onCamera={handleCamera}
        onGallery={handleGallery}
      />
    </View>
  );
}
