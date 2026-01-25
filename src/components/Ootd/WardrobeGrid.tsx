import React, { useMemo } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { styles } from "./WardrobeGrid.styles";
import { AppText } from "@/components/common/AppText";
import { MOCK_CLOSETS, type ClosetItem } from "@/screens/Dressroom/dressroom.mock";
import { FavoriteOnIcon } from "@/assets/icons";

interface Props {
    selectedWardrobeId: number | null;
    onSelectWardrobe: (wardrobe: ClosetItem) => void;
}

export function WardrobeGrid({ selectedWardrobeId, onSelectWardrobe }: Props) {
    // 즐겨찾기 옷장을 먼저 정렬
    const sortedClosets = useMemo(() => {
        return [...MOCK_CLOSETS].sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return 0;
        });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={sortedClosets}
                keyExtractor={(item) => String(item.id)}
                numColumns={5}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const selected = selectedWardrobeId === item.id;
                    return (
                        <Pressable
                            style={[styles.card, selected && styles.cardSelected]}
                            onPress={() => onSelectWardrobe(item)}
                        >
                            <View style={[styles.imageContainer, selected && styles.imageContainerSelected]}>
                                <Image source={{ uri: item.imageUrl }} style={styles.img} resizeMode="cover" />
                                {item.isFavorite && (
                                    <View style={styles.favoriteIconContainer}>
                                        <FavoriteOnIcon width={16} height={16} />
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
