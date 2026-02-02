import { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Pressable, Image, useWindowDimensions } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { AppText } from "@/components/common/AppText";
import { UndoIcon, HelpIcon, ItemPlus } from "@/assets/icons";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import { Colors } from "@/theme/colors";
import { MOCK_ITEMS, type FashionItem } from "@/screens/Dressroom/dressroom.mock";
import { styles, headerStyles } from "./VirtualFittingScreen.styles";

const H_PADDING = 20;
const WRAPPER_PADDING = 16;
const SLOT_GAP = 12;
const SLOTS_PER_ROW = 3;

type NavigationProp = StackNavigationProp<HomeStackParamList, "VirtualFitting">;
type VirtualFittingRouteProp = RouteProp<HomeStackParamList, "VirtualFitting">;

export function VirtualFittingScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VirtualFittingRouteProp>();
  const [fullBodySheetVisible, setFullBodySheetVisible] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const { slotSize, gridWidth } = useMemo(() => {
    const innerGridWidth =
      windowWidth - H_PADDING * 2 - WRAPPER_PADDING * 2;
    const size =
      (innerGridWidth - SLOT_GAP * (SLOTS_PER_ROW - 1)) / SLOTS_PER_ROW;
    return { slotSize: size, gridWidth: innerGridWidth };
  }, [windowWidth]);

  useEffect(() => {
    const ids = route.params?.selectedItemIds;
    if (ids?.length) setSelectedItemIds(ids);
  }, [route.params?.selectedItemIds]);

  const selectedItems: FashionItem[] = selectedItemIds
    .map((id) => MOCK_ITEMS.find((i) => i.id === id))
    .filter((i): i is FashionItem => i != null);
  const displayItems = selectedItems.slice(0, 6);
  const itemCount = displayItems.length;
  const showItemPlus = itemCount < 6;
  const GRID_SLOT_COUNT = 6;

  const openFullBodySheet = () => setFullBodySheetVisible(true);
  const closeFullBodySheet = () => setFullBodySheetVisible(false);

  const handleCamera = () => {
    closeFullBodySheet();
    // TODO: 카메라로 전신 사진 촬영
  };

  const handleGallery = () => {
    closeFullBodySheet();
    // TODO: 갤러리에서 전신 사진 선택
  };

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <Pressable
          style={headerStyles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <UndoIcon width={20} height={20} />
        </Pressable>
        <AppText style={headerStyles.title}>가상 피팅</AppText>
        <View style={headerStyles.rightIconGroup}>
          <Pressable onPress={() => {}}>
            <HelpIcon width={20} height={20} color={Colors.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.modelAreaWrap}>
          <AppText style={styles.modelAreaLabel}>전신사진</AppText>
          <View style={styles.modelArea} />
        </View>

        <Pressable style={styles.changePhotoBtn} onPress={openFullBodySheet}>
          <AppText style={styles.changePhotoBtnText}>
            전신 사진 변경하기
          </AppText>
        </Pressable>

        <AppText style={styles.sectionTitle}>입어 볼 아이템</AppText>
        <View style={styles.itemGridWrapper}>
          <View style={[styles.itemGrid, { width: gridWidth }]}>
            {[0, 1].map((rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  styles.itemGridRow,
                  {
                    width: gridWidth,
                    marginBottom: rowIndex === 0 ? SLOT_GAP : 0,
                  },
                ]}
              >
                {[0, 1, 2].map((colIndex) => {
                  const index = rowIndex * 3 + colIndex;
                  const slotStyle = {
                    width: slotSize,
                    height: slotSize,
                  };
                  if (index < itemCount) {
                    const item = displayItems[index];
                    return (
                      <View
                        key={item.id}
                        style={[styles.itemSlotFilled, slotStyle]}
                      >
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 12,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    );
                  }
                  if (index === itemCount && showItemPlus) {
                    return (
                      <Pressable
                        key="itemPlus"
                        style={[styles.itemPlusSlot, slotStyle]}
                        onPress={() =>
                          navigation.navigate("VirtualFittingItemSelect", {
                            initialSelectedItemIds: selectedItemIds,
                          })
                        }
                        accessibilityRole="button"
                        accessibilityLabel="입어 볼 아이템 선택"
                      >
                        <ItemPlus width={slotSize} height={slotSize} />
                      </Pressable>
                    );
                  }
                  return (
                    <View
                      key={`spacer-${index}`}
                      style={[styles.itemSlotSpacer, slotStyle]}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.fittingBtnWrap}>
          <Pressable style={styles.fittingBtn} disabled>
            <AppText style={styles.fittingBtnText}>피팅하기</AppText>
          </Pressable>
        </View>
      </ScrollView>

      <AddItemBottomSheet
        visible={fullBodySheetVisible}
        onClose={closeFullBodySheet}
        onCamera={handleCamera}
        onGallery={handleGallery}
      />
    </View>
  );
}
