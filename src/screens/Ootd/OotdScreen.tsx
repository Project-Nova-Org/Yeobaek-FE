import { View, TextInput, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./OotdScreen.styles";
import { AppText } from "@/components/common/AppText";
import { Colors } from "@/theme/colors";
import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import type { StackNavigationProp } from "@react-navigation/stack";

import {
  EmptyStarIcon,
  StarIcon,
  SortIcon,
  SearchIcon,
  ItemPlus,
  FavoriteOnIcon,
  FavoriteOffIcon,
} from "@/assets/icons";
import { OotdTop } from "@/components/Top/OotdTop.tsx";
import { OotdLayoutPreview } from "@/components/Ootd/OotdLayoutPreview";
import { TPO_LIST, STYLE_LIST } from "@/constants/ootd";
import { getOotdList, subscribeOotdList, toggleOotdFavorite } from "@/stores/ootdStore";
import type { SavedOotd } from "@/types/ootd";
import { CARD_IMAGE_WIDTH } from "./OotdScreen.styles";

type Props = {
  navigation: StackNavigationProp<OotdStackParamList, "OOTD">;
};

export function OotdScreen({ navigation }: Props) {
  const [keyword, setKeyword] = useState("");
  const [isStarred, setIsStarred] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [selectedTpo, setSelectedTpo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [ootdList, setOotdList] = useState<SavedOotd[]>(() => getOotdList());

  useEffect(() => {
    const unsub = subscribeOotdList(() => setOotdList(getOotdList()));
    return unsub;
  }, []);

  const filteredList = ootdList
    .filter((ootd) => {
      if (!Array.isArray(ootd.items) || !ootd.canvasSize) return false;
      if (keyword && !ootd.name.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (selectedTpo && ootd.tpo !== selectedTpo) return false;
      if (selectedStyle && ootd.style !== selectedStyle) return false;
      return true;
    })
    .sort((a, b) => {
      if (!isStarred) return 0;
      const aFav = a.isFavorite ? 1 : 0;
      const bFav = b.isFavorite ? 1 : 0;
      return bFav - aFav;
    });

  return (
    <>
      <OotdTop />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable onPress={() => setIsStarred((p) => !p)} style={styles.iconBtn}>
            {isStarred ? <StarIcon width={20} height={20} /> : <EmptyStarIcon width={20} height={20} />}
          </Pressable>

          <View style={styles.searchWrapper}>
            <SearchIcon width={18} height={18} color={Colors.gray400} />
            <TextInput
              placeholder="검색.."
              value={keyword}
              onChangeText={setKeyword}
              style={styles.searchInput}
              placeholderTextColor={Colors.gray400}
            />
          </View>

          <Pressable onPress={() => setIsSortActive((p) => !p)} style={styles.sortBtn}>
            <SortIcon width={20} color={isSortActive ? Colors.primary : Colors.gray400} />
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          <AppText style={styles.filterTitle}>TPO</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chipRow}>
              {TPO_LIST.map((label) => {
                const active = selectedTpo === label;
                return (
                  <Pressable
                    key={label}
                    onPress={() => setSelectedTpo((prev) => (prev === label ? null : label))}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <AppText style={[styles.chipText, active && styles.chipTextActive]}>
                      {label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.filterRow}>
          <AppText style={styles.filterTitle}>Style</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chipRow}>
              {STYLE_LIST.map((label) => {
                const active = selectedStyle === label;
                return (
                  <Pressable
                    key={label}
                    onPress={() => setSelectedStyle((prev) => (prev === label ? null : label))}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <AppText style={[styles.chipText, active && styles.chipTextActive]}>
                      {label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.ootdBox}>
          <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
            {filteredList.map((ootd) => (
              <View key={ootd.id} style={styles.card}>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate("OotdDetail", { ootdId: ootd.id })}
                >
                  <View
                    style={[
                      styles.cardImage,
                      {
                        backgroundColor:
                          ootd.imageBgColor ?? Colors.border,
                      },
                    ]}
                  >
                    <OotdLayoutPreview
                      items={ootd.items}
                      width={CARD_IMAGE_WIDTH}
                      height={CARD_IMAGE_WIDTH}
                      sourceWidth={ootd.canvasSize.width}
                      sourceHeight={ootd.canvasSize.height}
                    />
                  </View>
                  <View style={styles.cardLabel}>
                    <AppText style={styles.cardLabelText} numberOfLines={1}>
                      {ootd.name}
                    </AppText>
                  </View>
                </Pressable>
                <View style={styles.favoriteButtonOuter}>
                  <Pressable
                    style={styles.favoriteButtonInner}
                    onPress={() => toggleOotdFavorite(ootd.id)}
                  >
                    {ootd.isFavorite ? (
                      <FavoriteOnIcon width={12} height={12} />
                    ) : (
                      <FavoriteOffIcon width={12} height={12} />
                    )}
                  </Pressable>
                </View>
              </View>
            ))}
            <Pressable style={styles.card} onPress={() => navigation.navigate("OotdCreate")}>
              <View style={styles.cardImage}>
                <ItemPlus width="100%" height="100%" />
              </View>
              <View style={styles.cardLabel} />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
