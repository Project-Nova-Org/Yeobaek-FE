import React, { useState, useMemo } from "react";
import { View, ScrollView, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText as Text } from "@/components/common/AppText";
import { SearchIcon, SelectIcon } from "@/assets/icons";
import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import { CategoryState } from "@/components/ButtonScroll/ButtonScroll.types";
import SelectLongButton from "@/components/Buttons/long_button/SelectLongButton";
import { MOCK_ITEMS, FashionItem } from "@/screens/Dressroom/dressroom.mock";
import { personalPairingStyles as styles } from "./PersonalPairing.styles";

export function PersonalPairing() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryState | null>(null);

  const handleItemPress = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchesSearch = item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesCategory = true;

      if (categoryFilter) {
        if (categoryFilter.typeCategory && categoryFilter.typeCategory !== "전체") {
          matchesCategory = item.category === categoryFilter.typeCategory;
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const handleSelectComplete = () => {
    if (selectedId !== null) {
      navigation.navigate("PersonalPairingResult", { itemId: selectedId });
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="퍼스널 페어링"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />

      <View style={styles.titleSection}>
        <Text style={styles.subTitle}>아이템 선택</Text>
      </View>

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
            const active = selectedId === item.id;

            return (
              <Pressable key={item.id} style={styles.card} onPress={() => handleItemPress(item.id)}>
                <View style={[styles.thumbnailWrapper, active && styles.selectedThumbnail]}>
                  <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                  {active && (
                    <View style={styles.selectBadge}>
                      <SelectIcon width={15} height={15} />
                    </View>
                  )}
                </View>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.brand}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <SelectLongButton
          label="선 택"
          isActive={selectedId !== null}
          onPress={handleSelectComplete}
        />
      </View>
    </View>
  );
}
