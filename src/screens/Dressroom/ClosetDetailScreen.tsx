import React, { useState } from "react";
import { View, ScrollView, TextInput, Image, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import ToastMessage, { ToastAction, ToastTarget } from "@/components/ToastMessage/ToastMessage";

import { styles } from "./ClosetDetail.styles";
import { AppText } from "@/components/common/AppText";
import { SearchIcon, DeleteIcon, EditIcon, EmptyStarIcon, StarIcon } from "@/assets/icons";
import ImagePlusIcon from "@/assets/icons/itemplus.svg";

import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import {
  MOCK_ITEMS,
  MOCK_CLOSETS,
  MOCK_ITEM_MAPS, // 매핑 데이터 추가
  type FashionItem,
} from "@/screens/Dressroom/dressroom.mock";
import { CategoryState } from "@/components/ButtonScroll/ButtonScroll.types";
import { DressroomStackParamList } from "@/types/navigation/DressroomStackParamList";
import { DressroomTop } from "@/components/Top/DressroomTop";
import Alert from "@/components/Alert/Alert";

type Props = StackScreenProps<DressroomStackParamList, "ClosetDetail">;

interface ToastState {
  action: ToastAction;
  target: ToastTarget;
}

export function ClosetDetailScreen({ route, navigation }: Props) {
  const { closetId } = route.params;

  const closet = MOCK_CLOSETS.find((c) => c.id === closetId);

  const [searchQuery, setSearchQuery] = useState("");
  const [, setCategoryFilter] = useState<CategoryState | null>(null);
  const [isFavorite, setIsFavorite] = useState(() => closet?.isFavorite ?? false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  if (!closet) {
    return <View />;
  }

  const { name: closetName, imageUrl: thumbnailUrl } = closet;

  // 1. 매핑 테이블에서 현재 옷장(closetId)에 속한 아이템 ID들만 추출
  const targetItemIds = MOCK_ITEM_MAPS.filter((map) => map.closetId === closetId).map(
    (map) => map.fashionItemId,
  );

  // 2. 추출된 ID를 가진 아이템들만 필터링하고 검색어 적용
  const filteredItems = MOCK_ITEMS.filter((item) => {
    const isInThisCloset = targetItemIds.includes(item.id);
    const matchesSearch =
      searchQuery.length === 0 || item.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return isInThisCloset && matchesSearch;
  });

  const handleToggleFavorite = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    setToast({
      action: next ? "star" : "unstar",
      target: "closet",
    });
  };

  const handleEdit = () => {
    setToast({
      action: "signed",
      target: "closet",
    });
  };

  const handleDeletePress = () => {
    setIsDeleteAlertOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteAlertOpen(false);
    setToast({
      action: "delete",
      target: "closet",
    });

    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <>
      <DressroomTop />

      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: thumbnailUrl }} style={styles.closetImage} />
          <AppText style={styles.closetName}>{closetName}</AppText>

          <Pressable style={styles.favoriteButton} onPress={handleToggleFavorite}>
            {isFavorite ? (
              <StarIcon width={13} height={13} />
            ) : (
              <EmptyStarIcon width={13} height={13} />
            )}
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDeletePress}>
            <DeleteIcon width={17} height={17} />
          </Pressable>

          <Pressable style={styles.editButton} onPress={handleEdit}>
            <EditIcon width={15} height={15} />
          </Pressable>
        </View>

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

        <ButtonScroll onChange={setCategoryFilter} />

        <View style={styles.gridWrapper}>
          <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
            {filteredItems.map((item: FashionItem) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                <AppText style={styles.itemName} numberOfLines={1}>
                  {item.brand}
                </AppText>
              </View>
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
        visible={isDeleteAlertOpen}
        message={`${closetName}\n삭제하시겠습니까?`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {toast && (
        <ToastMessage
          key={`${toast.action}-${Date.now()}`}
          action={toast.action}
          target={toast.target}
          onHide={() => setToast(null)}
        />
      )}
    </>
  );
}
