import { useState } from "react";
import { View, ScrollView, Pressable, TextInput, Image } from "react-native";

import { styles } from "./Dressroom.styles";
import { AppText } from "@/components/common/AppText";
import { EmptyStarIcon, StarIcon, SearchIcon, SortIcon } from "@/assets/icons";

import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import { MOCK_CLOSETS, MOCK_ITEMS, type ClosetItem, type FashionItem } from "./dressroom.mock";

type TabType = "closet" | "item";

export function DressroomScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("closet");
  const [isStarred, setIsStarred] = useState(false);

  const [isItemSearchOpen, setIsItemSearchOpen] = useState(false);

  const data: (ClosetItem | FashionItem)[] = activeTab === "closet" ? MOCK_CLOSETS : MOCK_ITEMS;

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {activeTab === "closet" ? (
          <Pressable style={styles.iconButton} onPress={() => setIsStarred((p) => !p)}>
            {isStarred ? (
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
          {data.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
              <AppText style={styles.itemName} numberOfLines={1}>
                {activeTab === "closet" ? (item as ClosetItem).name : (item as FashionItem).brand}
              </AppText>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
