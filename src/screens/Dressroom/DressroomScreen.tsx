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

  const closetDelete = useDeleteFlow("closet");
  const itemDelete = useDeleteFlow("item");

  const filteredClosets = onlyFavorite ? closets.filter((c) => c.isFavorite) : closets;
  const data = activeTab === "closet" ? filteredClosets : items;

  const toggleClosetFavorite = (id: number) => {
    setClosets((prev) => prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c)));
  };

  const handleCardPress = (item: ClosetItem | FashionItem) => {
    if (isDeleteMode) return;

    if (activeTab === "closet") {
      navigation.navigate("ClosetDetail", {
        closetId: (item as ClosetItem).id,
        closetName: (item as ClosetItem).name,
        thumbnailUrl: item.imageUrl,
      });
    }
  };

  const alertMessage = closetDelete.selected
    ? `${closetDelete.selected.name || "옷장"}\n삭제하시겠습니까?`
    : itemDelete.selected
      ? "해당 아이템을\n삭제하시겠습니까?"
      : "";

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
                            ? closetDelete.requestDelete({
                                id: item.id,
                                name: (item as ClosetItem).name,
                              })
                            : itemDelete.requestDelete({
                                id: item.id,
                              });
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

            <Pressable style={styles.card}>
              <View style={styles.plusCard}>
                <ImagePlusIcon width="100%" height="100%" />
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>

      <Alert
        visible={!!(closetDelete.selected || itemDelete.selected)}
        message={alertMessage}
        onCancel={() => {
          closetDelete.closeAlert();
          itemDelete.closeAlert();
        }}
        onConfirm={() => {
          if (closetDelete.selected) {
            closetDelete.confirmDelete((id) =>
              setClosets((prev) => prev.filter((c) => c.id !== id)),
            );
            exitDeleteMode();
          }

          if (itemDelete.selected) {
            itemDelete.confirmDelete((id) => setItems((prev) => prev.filter((i) => i.id !== id)));
            exitDeleteMode();
          }
        }}
      />

      {closetDelete.toast && (
        <ToastMessage
          action={closetDelete.toast.action}
          target={closetDelete.toast.target}
          onHide={closetDelete.hideToast}
        />
      )}

      {itemDelete.toast && (
        <ToastMessage
          action={itemDelete.toast.action}
          target={itemDelete.toast.target}
          onHide={itemDelete.hideToast}
        />
      )}
    </>
  );
}
