import { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Pressable, Image, useWindowDimensions } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { AppText } from "@/components/common/AppText";
import { UndoIcon, HelpIcon, ItemPlus } from "@/assets/icons";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import FullbodyRegisterButton from "@/components/Buttons/medium_button/FullbodyRegisterButton";
import { Colors } from "@/theme/colors";
import { MOCK_ITEMS, type FashionItem } from "@/screens/Dressroom/dressroom.mock";
import { useCustomInfo } from "@/context/CustomInfoContext";
import { styles, headerStyles } from "./VirtualFittingScreen.styles";

const H_PADDING = 20;
const WRAPPER_PADDING = 12;
const SLOT_GAP = 8;
const SLOTS_PER_ROW = 3;
const GRID_SCALE = 1;

type NavigationProp = StackNavigationProp<HomeStackParamList, "VirtualFitting">;
type VirtualFittingRouteProp = RouteProp<HomeStackParamList, "VirtualFitting">;

export function VirtualFittingScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VirtualFittingRouteProp>();
  const { savedCustomInfo } = useCustomInfo();
  const [fullBodySheetVisible, setFullBodySheetVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [fullBodyImageUri, setFullBodyImageUri] = useState<string | null>(
    savedCustomInfo?.image ?? null
  );

  useEffect(() => {
    if (savedCustomInfo?.image != null) setFullBodyImageUri(savedCustomInfo.image);
  }, [savedCustomInfo?.image]);

  const { slotSize, gridWidth } = useMemo(() => {
    const innerGridWidth =
      windowWidth - H_PADDING * 2 - WRAPPER_PADDING * 2;
    const size =
      (innerGridWidth - SLOT_GAP * (SLOTS_PER_ROW - 1)) / SLOTS_PER_ROW;
    const scaled = size * GRID_SCALE;
    const scaledGridWidth = scaled * SLOTS_PER_ROW + SLOT_GAP * (SLOTS_PER_ROW - 1);
    return { slotSize: scaled, gridWidth: scaledGridWidth };
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
    launchCamera({ mediaType: "photo" }, (res) => {
      if (res.didCancel || res.errorCode) return;
      const uri = res.assets?.[0]?.uri;
      if (uri) setFullBodyImageUri(uri);
    });
  };

  const handleGallery = () => {
    closeFullBodySheet();
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1 },
      (res) => {
        if (res.didCancel || res.errorCode) return;
        const uri = res.assets?.[0]?.uri;
        if (uri) setFullBodyImageUri(uri);
      }
    );
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
          <Pressable onPress={() => setShowTooltip(!showTooltip)}>
            <HelpIcon width={20} height={20} color={Colors.primary} />
          </Pressable>
        </View>
      </View>

      {showTooltip && (
        <View style={styles.tooltipContainer} pointerEvents="box-none">
          <AppText style={styles.tooltipText}>
            전신 사진과 입어 볼 아이템을 선택한 뒤{"\n"}
            피팅하기를 눌러주세요!
          </AppText>
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.modelAreaWrap}>
          <View style={styles.modelArea}>
            {fullBodyImageUri ? (
              <Image
                source={{ uri: fullBodyImageUri }}
                style={styles.modelAreaImage}
                resizeMode="cover"
              />
            ) : null}
          </View>
          <View style={{ marginTop: 12, width: "100%" }}>
            <FullbodyRegisterButton
              onPress={openFullBodySheet}
              label={fullBodyImageUri ? "전신 사진 변경하기" : "전신 사진 등록하기"}
            />
          </View>
        </View>

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
          <Pressable
            style={[styles.fittingBtn, itemCount >= 1 && styles.fittingBtnActive]}
            disabled={itemCount < 1}
          >
            <AppText
              style={[
                styles.fittingBtnText,
                itemCount >= 1 && styles.fittingBtnTextActive,
              ]}
            >
              피팅하기
            </AppText>
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
