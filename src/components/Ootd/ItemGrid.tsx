import React, { useMemo } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { styles } from "./ItemGrid.styles";
import { AppText } from "@/components/common/AppText";
import { SelectIcon } from "@/assets/icons";

import { ITEMS, type Item } from "@/mocks/items.ts";

interface Props {
    category: string;
    detail: string | null;
    selectedItems?: string[]; // 선택된 아이템의 key 배열
    onSelect: (item: Item) => void;
    selectedWardrobeId?: number | null; // 선택된 옷장 ID (옷장 탭일 때만 사용)
}

export function ItemGrid({ category, detail, selectedItems = [], onSelect, selectedWardrobeId = null }: Props) {
    const data = useMemo(() => {
        return ITEMS.filter((item) => {
            // 옷장 필터링 (옷장 탭일 때만 적용)
            if (selectedWardrobeId !== null && (item.wardrobeId === null || item.wardrobeId !== selectedWardrobeId)) {
                return false;
            }
            // 카테고리 필터링
            if (item.category !== category) return false;
            // 상세 필터링
            if (detail && item.detail !== detail) return false;
            return true;
        });
    }, [category, detail, selectedWardrobeId]);

    const isSelected = (item: Item) => {
        const prefix = `${item.id}-`;
        return selectedItems.some((key) => key.startsWith(prefix));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const selected = isSelected(item);
                    return (
                        <Pressable 
                            style={[styles.card, selected && styles.cardSelected]} 
                            onPress={() => onSelect(item)}
                        >
                            <View style={[styles.imageContainer, selected && styles.imageContainerSelected]}>
                                <Image source={item.image} style={styles.img} resizeMode="contain" />
                                {selected && (
                                    <View style={styles.selectIconContainer}>
                                        <SelectIcon width={20} height={20} />
                                    </View>
                                )}
                            </View>
                            <AppText style={styles.label} numberOfLines={1}>
                                {item.name}
                            </AppText>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
}