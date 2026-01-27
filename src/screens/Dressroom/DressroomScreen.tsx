import { useState } from "react";
import { View, ScrollView, Pressable, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./Dressroom.styles";
import { AppText } from "@/components/common/AppText";
import {
  FavoriteOnIcon,
  FavoriteOffIcon,
  EmptyStarIcon,
  StarIcon,
  SearchIcon,
  SortIcon,
  DeleteIcon,
} from "@/assets/icons";
import ImagePlusIcon from "@/assets/icons/itemplus.svg";

import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import { MOCK_CLOSETS, MOCK_ITEMS, type ClosetItem, type FashionItem } from "./dressroom.mock";
import { DressroomTop } from "@/components/Top/DressroomTop";
import Alert from "@/components/Alert/Alert";
import ToastMessage from "@/components/ToastMessage/ToastMessage";

import { useDeleteMode } from "@/hooks/useDeleteMode";
import { useDeleteFlow } from "@/hooks/useDeleteFlow";

type TabType = "closet" | "item";

export function DressroomScreen() {
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<TabType>("closet");
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [isItemSearchOpen, setIsItemSearchOpen] = useState(false);
  const [closets, setClosets] = useState<ClosetItem[]>(MOCK_CLOSETS);
  const [items, setItems] = useState<FashionItem[]>(MOCK_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");

  const { isDeleteMode, enterDeleteMode, exitDeleteMode } = useDeleteMode();

  const closetFlow = useDeleteFlow("closet");
  const itemFlow = useDeleteFlow("item");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredClosets = (onlyFavorite ? closets.filter((c) => c.isFavorite) : closets).filter(
    (c) => normalizedQuery.length === 0 || c.name.toLowerCase().includes(normalizedQuery),
  );
  const filteredItems = items.filter(
    (i) => normalizedQuery.length === 0 || i.brand.toLowerCase().includes(normalizedQuery),
  );
  const data = activeTab === "closet" ? filteredClosets : filteredItems;

  const toggleClosetFavorite = (id: number) => {
    setClosets((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextValue = !c.isFavorite;
          closetFlow.showToast(nextValue ? "star" : "unstar");
          return { ...c, isFavorite: nextValue };
        }
        return c;
      }),
    );
  };

  const handleCardPress = (item: ClosetItem | FashionItem) => {
    if (isDeleteMode) return;

    if (activeTab === "closet") {
      navigation.navigate("ClosetDetail", {
        closetId: (item as ClosetItem).id,
      });
    }

    if (activeTab === "item") {
      navigation.navigate("ItemDetail", {
        itemId: (item as FashionItem).id,
      });
    }
  };

  const alertMessage = closetFlow.selected
    ? `${closetFlow.selected.name || "옷장"}\n삭제하시겠습니까?`
    : itemFlow.selected
      ? "해당 아이템을\n삭제하시겠습니까?"
      : "";

  const activeToast = closetFlow.toast || itemFlow.toast;
  const hideActiveToast = closetFlow.toast ? closetFlow.hideToast : itemFlow.hideToast;

  return (
    <>
      <DressroomTop />

      <View
        style={styles.container}
        onStartShouldSetResponder={() => {
          if (isDeleteMode) {
            exitDeleteMode();
            return true;
          }
          return false;
        }}
      >
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
              exitDeleteMode();
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
              exitDeleteMode();
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
              value={searchQuery}
              onChangeText={setSearchQuery}
              onBlur={() => setIsItemSearchOpen(false)}
            />
          </View>
        )}

        {activeTab === "closet" && (
          <View style={styles.searchBox}>
            <SearchIcon width={18} height={18} />
            <TextInput
              placeholder="검색.."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        {activeTab === "item" && <ButtonScroll onChange={() => {}} />}

        <View style={styles.gridWrapper}>
          <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
            {data.map((item) => (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => handleCardPress(item)}
                onLongPress={enterDeleteMode}
              >
                <View style={styles.thumbnailWrapper}>
                  <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                  {activeTab === "closet" && !isDeleteMode && (
                    <View style={styles.favoriteButtonOuter}>
                      <Pressable
                        style={styles.favoriteButtonInner}
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleClosetFavorite(item.id);
                        }}
                      >
                        {(item as ClosetItem).isFavorite ? (
                          <FavoriteOnIcon width={12} height={12} />
                        ) : (
                          <FavoriteOffIcon width={12} height={12} />
                        )}
                      </Pressable>
                    </View>
                  )}
                  {isDeleteMode && (
                    <View style={styles.deleteOverlay}>
                      <View style={styles.dimLayer} />
                      <Pressable
                        style={styles.deleteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          activeTab === "closet"
                            ? closetFlow.requestDelete({
                                id: item.id,
                                name: (item as ClosetItem).name,
                              })
                            : itemFlow.requestDelete({ id: item.id });
                        }}
                      >
                        <DeleteIcon width={18} height={18} />
                      </Pressable>
                    </View>
                  )}
                </View>
                <AppText style={styles.itemName} numberOfLines={1}>
                  {activeTab === "closet" ? (item as ClosetItem).name : (item as FashionItem).brand}
                </AppText>
              </Pressable>
            ))}
            <Pressable
              style={styles.card}
              onPress={() => {
                if (activeTab === "closet") {
                  navigation.navigate("MakeCloset");
                }

                if (activeTab === "item") {
                  navigation.navigate("MakeItem");
                }
              }}
            >
              <View style={styles.plusCard}>
                <ImagePlusIcon width="100%" height="100%" />
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>

      <Alert
        visible={!!(closetFlow.selected || itemFlow.selected)}
        message={alertMessage}
        onCancel={() => {
          closetFlow.closeAlert();
          itemFlow.closeAlert();
        }}
        onConfirm={() => {
          if (closetFlow.selected) {
            closetFlow.confirmDelete((id) => setClosets((prev) => prev.filter((c) => c.id !== id)));
          } else if (itemFlow.selected) {
            itemFlow.confirmDelete((id) => setItems((prev) => prev.filter((i) => i.id !== id)));
          }
          exitDeleteMode();
        }}
      />

      {activeToast && (
        <ToastMessage
          key={activeToast.key}
          action={activeToast.action}
          target={activeToast.target}
          onHide={hideActiveToast}
        />
      )}
    </>
  );
}
