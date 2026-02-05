import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { HomeStackParamList } from "@/types/navigation/HomeStackParamList";
import { AppText } from "@/components/common/AppText";
import { UndoIcon, SearchIcon, SelectIcon } from "@/assets/icons";
import { Colors } from "@/theme/colors";
import { HorizontalPillRow } from "@/components/ButtonScroll/HorizontalPillRow";
import { styles as buttonScrollStyles } from "@/components/ButtonScroll/ButtonScroll.styles";
import { TYPE_CATEGORIES, TYPE_DETAILS } from "@/theme/itemCategories";
import {
  MOCK_ITEMS,
  MOCK_ITEM_MAPS,
  type FashionItem,
} from "@/screens/Dressroom/dressroom.mock";
import {
  getMainCategory,
  isSingleSlotMain,
  isOnepieceMain,
  MAX_TOTAL_SELECTION,
} from "./VirtualFittingItemSelect.utils";
import { styles, headerStyles } from "./VirtualFittingItemSelectScreen.styles";

type NavigationProp = StackNavigationProp<
  HomeStackParamList,
  "VirtualFittingItemSelect"
>;
type VirtualFittingItemSelectRouteProp = RouteProp<
  HomeStackParamList,
  "VirtualFittingItemSelect"
>;

/** 드레스룸(옷장)에 하나라도 포함된 아이템 ID 목록 */
const ITEM_IDS_IN_CLOSETS = Array.from(
  new Set(MOCK_ITEM_MAPS.map((m) => m.fashionItemId))
);

export function VirtualFittingItemSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VirtualFittingItemSelectRouteProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [mainCategory, setMainCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(route.params?.initialSelectedItemIds ?? [])
  );

  // 같은 흐름에서 다시 진입할 때(ItemPlus로 추가) 이전 선택 유지
  React.useEffect(() => {
    const ids = route.params?.initialSelectedItemIds;
    if (ids != null) setSelectedIds(new Set(ids));
  }, [route.params?.initialSelectedItemIds]);

  const selectedItems = useMemo(
    () => MOCK_ITEMS.filter((i) => selectedIds.has(i.id)),
    [selectedIds]
  );

  const mainCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    let hasOnepiece = false;
    selectedItems.forEach((item) => {
      const main = getMainCategory(item);
      if (isOnepieceMain(main)) hasOnepiece = true;
      counts[main] = (counts[main] ?? 0) + 1;
    });
    return { counts, hasOnepiece };
  }, [selectedItems]);

  const canSelectItem = (item: FashionItem): boolean => {
    const main = getMainCategory(item);
    const total = selectedIds.size;
    if (total >= MAX_TOTAL_SELECTION) return false;
    if (selectedIds.has(item.id)) return true;

    if (isOnepieceMain(main)) {
      if (mainCategoryCounts.hasOnepiece) return false;
      if ((mainCategoryCounts.counts["상의"] ?? 0) > 0) return false;
      if ((mainCategoryCounts.counts["하의"] ?? 0) > 0) return false;
      return total + 1 <= MAX_TOTAL_SELECTION;
    }
    if (isSingleSlotMain(main)) {
      if (mainCategoryCounts.hasOnepiece && (main === "상의" || main === "하의"))
        return false;
      const current = mainCategoryCounts.counts[main] ?? 0;
      return current < 1 && total + 1 <= MAX_TOTAL_SELECTION;
    }
    return total + 1 <= MAX_TOTAL_SELECTION;
  };

  const toggleSelection = (item: FashionItem) => {
    if (selectedIds.has(item.id)) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
      return;
    }
    if (!canSelectItem(item)) return;
    setSelectedIds((prev) => new Set(prev).add(item.id));
  };

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      if (!ITEM_IDS_IN_CLOSETS.includes(item.id)) return false;
      const matchSearch =
        searchQuery.length === 0 ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const main = getMainCategory(item);
      const matchMain = !mainCategory || main === mainCategory;
      const matchSub = !subCategory || item.category === subCategory;
      return matchSearch && matchMain && matchSub;
    });
  }, [searchQuery, mainCategory, subCategory]);

  const subCategories = mainCategory ? TYPE_DETAILS[mainCategory] ?? [] : [];
  const canCreate = selectedIds.size > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    navigation.navigate("VirtualFitting", {
      selectedItemIds: Array.from(selectedIds),
    });
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
        <AppText style={headerStyles.title}>입어 볼 아이템</AppText>
        <View style={headerStyles.rightIconGroup} />
      </View>

      <View style={styles.searchBox}>
        <SearchIcon width={18} height={18} />
        <TextInput
          placeholder="Q 검색.."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={buttonScrollStyles.wrapper}>
        <HorizontalPillRow
          items={TYPE_CATEGORIES as unknown as readonly string[]}
          selected={mainCategory}
          onSelect={(v) => {
            setMainCategory(v);
            setSubCategory(null);
          }}
        />
        {mainCategory && subCategories.length > 0 && (
          <View style={buttonScrollStyles.subRowWrapper}>
            <HorizontalPillRow
              variant="sub"
              items={subCategories}
              selected={subCategory}
              onSelect={setSubCategory}
            />
          </View>
        )}
      </View>

      <View style={styles.gridWrapper}>
        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {filteredItems.map((item) => {
            const selected = selectedIds.has(item.id);
            const disabled = !selected && !canSelectItem(item);
            return (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => toggleSelection(item)}
                disabled={disabled}
              >
                <View
                  style={[
                    styles.thumbnailWrap,
                    selected && styles.thumbnailWrapSelected,
                  ]}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={[
                      styles.thumbnail,
                      selected && styles.thumbnailSelected,
                    ]}
                  />
                  {selected && (
                    <View style={styles.checkBadge}>
                      <SelectIcon width={20} height={20} color={Colors.primary} />
                    </View>
                  )}
                </View>
                <AppText style={styles.itemName} numberOfLines={1}>
                  {item.brand}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.createBtnWrap}>
        <Pressable
          style={[styles.createBtn, !canCreate && styles.createBtnDisabled]}
          onPress={handleCreate}
          disabled={!canCreate}
        >
          <AppText
            style={[
              styles.createBtnText,
              !canCreate && styles.createBtnTextDisabled,
            ]}
          >
            생성
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
