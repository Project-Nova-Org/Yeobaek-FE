import { useMemo, useState } from "react";
import { View, ScrollView, Image, Pressable, FlatList, Alert } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";

import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import { AppText } from "@/components/common/AppText";
import { OotdLayoutPreview } from "@/components/Ootd/OotdLayoutPreview";
import { DeleteIcon, EditIcon, EmptyStarIcon, StarIcon } from "@/assets/icons";
import UndoIcon from "@/assets/icons/undo.svg";
import { ootdDetailHeaderStyles } from "./OotdDetailScreen.styles";
import { getOotdById, toggleOotdFavorite, deleteOotd } from "@/stores/ootdStore";
import { Colors } from "@/theme/colors";
import type { OotdCanvasItem } from "@/types/ootd";
import {
  styles,
  CARD_WIDTH,
  CARD_HEIGHT,
  REGISTERED_ITEMS_PER_SLIDE,
  INNER_SLIDE_WIDTH,
} from "./OotdDetailScreen.styles";

type NavigationProp = StackNavigationProp<OotdStackParamList, "OotdDetail">;
type RouteProps = RouteProp<OotdStackParamList, "OotdDetail">;

type Props = {
  navigation: NavigationProp;
  route: RouteProps;
};

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function OotdDetailScreen({ navigation, route }: Props) {
  const { ootdId } = route.params;
  const ootd = getOotdById(ootdId);
  const [isFavorite, setIsFavorite] = useState(() => ootd?.isFavorite ?? false);

  if (!ootd) {
    return null;
  }

  const { name, tpo, style, memo, items, canvasSize, imageBgColor } = ootd;
  const previewBg = imageBgColor ?? Colors.border;

  const handleToggleFavorite = () => {
    toggleOotdFavorite(ootdId);
    setIsFavorite((prev) => !prev);
  };

  const handleDelete = () => {
    deleteOotd(ootdId);
    navigation.navigate("OOTD");
  };

  const showDeleteConfirm = () => {
    Alert.alert(
      "OOTD 삭제",
      `${name}\n삭제하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: handleDelete },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate("OotdCreateInfo", {
      canvasItems: items,
      canvasSize,
      editOotdId: ootdId,
    });
  };

  const slides = useMemo(
    () => chunk(items, REGISTERED_ITEMS_PER_SLIDE),
    [items]
  );

  return (
    <View style={styles.container}>
      <View style={ootdDetailHeaderStyles.container}>
        <Pressable style={ootdDetailHeaderStyles.backBtn} onPress={() => navigation.goBack()}>
          <UndoIcon width={20} height={20} />
        </Pressable>
        <AppText style={ootdDetailHeaderStyles.title}>OOTD 정보</AppText>
        <View style={ootdDetailHeaderStyles.rightIconGroup}>
          <Pressable onPress={showDeleteConfirm}>
            <DeleteIcon width={20} height={20} />
          </Pressable>
          <Pressable onPress={handleEdit}>
            <EditIcon width={20} height={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSpacer} />

        {/* [별][이름]을 하나의 블록으로 중앙 정렬, 이름이 길어지면 별이 왼쪽으로 밀림 / 이름은 한 줄 말줄임 */}
        <View style={styles.titleRow}>
          <View style={styles.titleRowInner}>
            <Pressable style={styles.favoriteButton} onPress={handleToggleFavorite}>
              {isFavorite ? (
                <StarIcon width={18} height={18} />
              ) : (
                <EmptyStarIcon width={18} height={18} />
              )}
            </Pressable>
            <AppText
              style={styles.ootdName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </AppText>
          </View>
        </View>

        {/* 사진: 저장된 배경색으로 배치 미리보기 */}
        <View style={[styles.previewWrap, { backgroundColor: previewBg }]}>
          <OotdLayoutPreview
            items={items}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            sourceWidth={canvasSize.width}
            sourceHeight={canvasSize.height}
          />
        </View>

        {/* TPO / Style (배경 위 텍스트) */}
        <View style={styles.tpoStyleRow}>
          <AppText style={styles.tpoStyleText}>
            TPO &gt; {tpo}  Style &gt; {style}
          </AppText>
        </View>

        {/* 메모: 따로 흰색 박스 */}
        {memo ? (
          <View style={styles.memoBox}>
            <AppText style={styles.memoText}>{memo}</AppText>
          </View>
        ) : null}

        {/* 등록된 아이템: 하나의 흰색 박스, 슬라이드 3개씩, 그림자/선 없음 */}
        <AppText style={styles.sectionTitle}>등록된 아이템</AppText>
        <View style={styles.registeredSectionBox}>
          <FlatList
            data={slides}
            keyExtractor={(_, i) => String(i)}
            horizontal
            pagingEnabled
            snapToInterval={INNER_SLIDE_WIDTH}
            snapToAlignment="start"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({
              item: slideItems,
              index: slideIndex,
            }: {
              item: OotdCanvasItem[];
              index: number;
            }) => (
              <View style={styles.registeredSlide}>
                {slideItems.map((item) => (
                  <View key={item.key} style={styles.registeredItemCard}>
                    <Image
                      source={item.image}
                      style={styles.registeredItemImage}
                      resizeMode="contain"
                    />
                  </View>
                ))}
                {slideItems.length < REGISTERED_ITEMS_PER_SLIDE
                  ? Array(REGISTERED_ITEMS_PER_SLIDE - slideItems.length)
                      .fill(0)
                      .map((_, i) => (
                        <View
                          key={`empty-${slideIndex}-${i}`}
                          style={styles.registeredItemCard}
                        />
                      ))
                  : null}
              </View>
            )}
          />
          {slides.length > 1 ? (
            <View style={styles.paginationRow}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[styles.paginationDot, i === 0 && styles.paginationDotActive]}
                />
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
