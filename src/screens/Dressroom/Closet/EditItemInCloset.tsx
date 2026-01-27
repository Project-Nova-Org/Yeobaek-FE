import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Image, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./AddItemToCloset.styles";
import { AppText } from "@/components/common/AppText";
import { SearchIcon } from "@/assets/icons";

import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import { CategoryState } from "@/components/ButtonScroll/ButtonScroll.types";
import CreateLongButton from "@/components/Buttons/long_button/CreateLongButton";

import { MOCK_ITEMS, MOCK_ITEM_MAPS, type FashionItem } from "@/screens/Dressroom/dressroom.mock";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { DressroomTop } from "@/components/Top/DressroomTop";

export default function EditItemInCloset() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { closetId } = route.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [, setCategoryFilter] = useState<CategoryState | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* 🔹 초기 선택 세팅 */
  useEffect(() => {
    const initialSelectedIds = MOCK_ITEM_MAPS.filter((m) => m.closetId === closetId).map(
      (m) => m.fashionItemId,
    );

    setSelectedIds(initialSelectedIds);
  }, [closetId]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesSearch =
      searchQuery.length === 0 || item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <DressroomTop />

      <AppHeader
        title="아이템 수정"
        left={<HeaderLeft type="button" label="이전" onPress={() => navigation.goBack()} />}
      />

      <View style={styles.searchBox}>
        <SearchIcon width={18} height={18} />
        <TextInput
          placeholder="검색.."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ButtonScroll onChange={setCategoryFilter} />

      <View style={styles.gridWrapper}>
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {filteredItems.map((item: FashionItem) => {
            const selected = selectedIds.includes(item.id);

            return (
              <Pressable key={item.id} style={styles.card} onPress={() => toggleSelect(item.id)}>
                <View style={styles.thumbnailWrapper}>
                  <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />

                  {selected && (
                    <View style={styles.selectedOverlay}>
                      <AppText style={styles.checkText}>✓</AppText>
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

      <CreateLongButton
        label="추가"
        isActive={selectedIds.length > 0}
        onPress={() => {
          console.log("최종 선택된 아이템:", selectedIds);
          navigation.goBack();
        }}
      />
    </View>
  );
}
