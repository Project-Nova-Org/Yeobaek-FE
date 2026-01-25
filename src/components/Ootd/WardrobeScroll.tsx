import React, { useMemo } from "react";
import { ScrollView, Pressable, View, Image } from "react-native";
import { styles } from "./WardrobeScroll.styles";
import { AppText } from "@/components/common/AppText";
import { MOCK_CLOSETS, type ClosetItem } from "@/screens/Dressroom/dressroom.mock";
import { FavoriteOnIcon } from "@/assets/icons";

interface Props {
    selectedWardrobeId: number | null;
    onSelectWardrobe: (wardrobe: ClosetItem) => void;
}

export function WardrobeScroll({ selectedWardrobeId, onSelectWardrobe }: Props) {
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {sortedClosets.map((wardrobe) => {
                    const selected = selectedWardrobeId === wardrobe.id;
                    return (
                        <Pressable
                            key={wardrobe.id}
                            style={[styles.card, selected && styles.cardSelected]}
                            onPress={() => onSelectWardrobe(wardrobe)}
                        >
                            <View style={[styles.imageContainer, selected && styles.imageContainerSelected]}>
                                <Image source={{ uri: wardrobe.imageUrl }} style={styles.img} resizeMode="cover" />
                                {wardrobe.isFavorite && (
                                    <View style={styles.favoriteIconContainer}>
                                        <FavoriteOnIcon width={16} height={16} />
                                    </View>
                                )}
                            </View>
                            <AppText style={styles.label} numberOfLines={1}>
                                {wardrobe.name}
                            </AppText>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}
