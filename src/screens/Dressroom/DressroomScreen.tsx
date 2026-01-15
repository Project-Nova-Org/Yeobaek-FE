import { useState } from "react";
import { View, ScrollView, Pressable, TextInput, Image } from "react-native";

import { styles } from "./Dressroom.styles";
import { AppText } from "@/components/common/AppText";
import {
  FavoriteOnIcon,
  FavoriteOffIcon,
  EmptyStarIcon,
  StarIcon,
  SearchIcon,
  SortIcon,
} from "@/assets/icons";
import ImagePlusIcon from "@/assets/icons/itemplus.svg";

import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import { MOCK_CLOSETS, MOCK_ITEMS, type ClosetItem, type FashionItem } from "./dressroom.mock";

type TabType = "closet" | "item";

export function DressroomScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("closet");
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [isItemSearchOpen, setIsItemSearchOpen] = useState(false);
  const [closets, setClosets] = useState<ClosetItem[]>(MOCK_CLOSETS);

  const filteredClosets = onlyFavorite ? closets.filter((c) => c.isFavorite) : closets;

  const data: (ClosetItem | FashionItem)[] = activeTab === "closet" ? filteredClosets : MOCK_ITEMS;

  const toggleClosetFavorite = (id: number) => {
    setClosets((prev) => prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)));
  };

  const handlePlusPress = () => {
    // activeTab에 따라 추가 화면/모달 열기 로직 넣으면 됨
    // if (activeTab === "closet") ...
    // else ...
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {activeTab === "closet" ? (
          <Pressable style={styles.iconButton} onPress={() => setOnlyFavorite((p) => !p)}>
            {onlyFavorite ? (
              <StarIcon width={20} height={20} />
            ) : (
              <EmptyStarIcon width={20} height={20} />
            )}
          </Pressable>
        ) : (
          <Pressable style={styles.searchButton} onPress={() => setIsItemSearchOpen(true)}>
            <SearchIcon width={20} height={20} />
          </Pressable>
        )}

        <Pressable
          style={styles.tab}
          onPress={() => {
            setActiveTab("closet");
            setIsItemSearchOpen(false);
          }}
        >
          <View style={[styles.tabBox, activeTab === "closet" && styles.tabBoxActive]}>
            <AppText style={activeTab === "closet" ? styles.tabActiveText : styles.tabText}>
              옷장
            </AppText>
          </View>
        </Pressable>

        <Pressable
          style={styles.tab}
          onPress={() => {
            setActiveTab("item");
            setIsItemSearchOpen(false);
          }}
        >
          <View style={[styles.tabBox, activeTab === "item" && styles.tabBoxActive]}>
            <AppText style={activeTab === "item" ? styles.tabActiveText : styles.tabText}>
              아이템
            </AppText>
          </View>
        </Pressable>

        <Pressable style={styles.sortButton}>
          <SortIcon width={20} height={20} />
        </Pressable>
      </View>

      {activeTab === "item" && isItemSearchOpen && (
        <View style={styles.searchOverlay}>
          <SearchIcon width={18} height={18} />
          <TextInput
            autoFocus
            placeholder="검색.."
            placeholderTextColor="#999"
            style={styles.searchOverlayInput}
            onBlur={() => setIsItemSearchOpen(false)}
          />
        </View>
      )}

      {activeTab === "closet" && (
        <View style={styles.searchBox}>
          <SearchIcon width={18} height={18} />
          <TextInput placeholder="검색.." placeholderTextColor="#999" style={styles.searchInput} />
        </View>
      )}

      {activeTab === "item" && <ButtonScroll />}

      <View style={styles.gridWrapper}>
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {data.map((item) =>
            activeTab === "closet" ? (
              <View key={item.id} style={styles.card}>
                <View style={styles.thumbnailWrapper}>
                  <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                  <View style={styles.favoriteButtonOuter}>
                    <Pressable
                      style={styles.favoriteButtonInner}
                      onPress={() => toggleClosetFavorite(item.id)}
                    >
                      {(item as ClosetItem).isFavorite ? (
                        <FavoriteOnIcon width={12} height={12} />
                      ) : (
                        <FavoriteOffIcon width={12} height={12} />
                      )}
                    </Pressable>
                  </View>
                </View>

                <AppText style={styles.itemName} numberOfLines={1}>
                  {(item as ClosetItem).name}
                </AppText>
              </View>
            ) : (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                <AppText style={styles.itemName} numberOfLines={1}>
                  {(item as FashionItem).brand}
                </AppText>
              </View>
            ),
          )}

          <Pressable style={styles.card} onPress={handlePlusPress}>
            <View style={styles.plusCard}>
              <ImagePlusIcon width="100%" height="100%" />
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}
