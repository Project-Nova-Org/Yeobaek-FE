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
}

export function ItemGrid({ category, detail, selectedItems = [], onSelect }: Props) {
    const data = useMemo(() => {
        return ITEMS.filter((item) => {
            if (item.category !== category) return false;
            if (detail && item.detail !== detail) return false;
            return true;
        });
    }, [category, detail]);

    const isSelected = (item: Item) => {
        return selectedItems.some((key) => key.startsWith(String(item.id)));
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
                                <Image source={item.image} style={styles.img} />
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