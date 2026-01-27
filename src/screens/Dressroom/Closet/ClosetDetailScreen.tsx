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
  MOCK_ITEM_MAPS,
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

  if (!closet) return <View />;

  const targetItemIds = MOCK_ITEM_MAPS.filter((m) => m.closetId === closetId).map(
    (m) => m.fashionItemId,
  );

  const filteredItems = MOCK_ITEMS.filter((item) => {
    const isInCloset = targetItemIds.includes(item.id);
    const matchesSearch =
      searchQuery.length === 0 || item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return isInCloset && matchesSearch;
  });

  return (
    <>
      <DressroomTop />

      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: closet.imageUrl }} style={styles.closetImage} />
          <AppText style={styles.closetName}>{closet.name}</AppText>

          <Pressable onPress={() => setIsFavorite((p) => !p)}>
            {isFavorite ? <StarIcon /> : <EmptyStarIcon />}
          </Pressable>

          <Pressable onPress={() => setIsDeleteAlertOpen(true)}>
            <DeleteIcon />
          </Pressable>

          <Pressable>
            <EditIcon />
          </Pressable>
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
          <ScrollView contentContainerStyle={styles.grid}>
            {filteredItems.map((item: FashionItem) => (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ItemDetail", {
                    itemId: item.id,
                  })
                }
              >
                <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                <AppText style={styles.itemName} numberOfLines={1}>
                  {item.brand}
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
        visible={isDeleteAlertOpen}
        message={`${closet.name}\n삭제하시겠습니까?`}
        onCancel={() => setIsDeleteAlertOpen(false)}
        onConfirm={() => {
          setIsDeleteAlertOpen(false);
          setToast({ action: "delete", target: "closet" });
          navigation.goBack();
        }}
      />

      {toast && (
        <ToastMessage action={toast.action} target={toast.target} onHide={() => setToast(null)} />
      )}
    </>
  );
}
