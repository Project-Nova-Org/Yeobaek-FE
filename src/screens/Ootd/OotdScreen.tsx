import {
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Dimensions } from "react-native";
import { styles } from "./OotdScreen.styles";
import { OOTD_HEIGHT } from "./OotdScreen.styles";
import { AppText } from "@/components/common/AppText";
import { Colors } from "@/theme/colors";
import { RootStackParamList } from "@/types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

import { EmptyStarIcon, StarIcon, SortIcon,SearchIcon,ItemPlus } from "@/assets/icons/index"

const TPO_LIST = ["데일리", "포멀", "데이트", "여행", "레저", "파티", "하객룩", "기타"];
const STYLE_LIST = ["캐주얼", "클래식", "빈티지", "스트릿", "스포티", "힙합", "기타"];

export function OotdScreen({ navigation }: Props) {
  const [keyword, setKeyword] = useState("");
  const [isStarred, setIsStarred] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [selectedTpo, setSelectedTpo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const TOP_OFFSET = 120;
  const BOTTOM_TABBAR_HEIGHT = 56;
  const SAFE_GAP = 130;

  const MAX_AVAILABLE_HEIGHT =
      SCREEN_HEIGHT - TOP_OFFSET - BOTTOM_TABBAR_HEIGHT - SAFE_GAP;

  const FINAL_OOTD_HEIGHT = Math.min(
      OOTD_HEIGHT,
      MAX_AVAILABLE_HEIGHT);

  return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* ===== 상단 ===== */}
          <View style={styles.topRow}>
            <Pressable
                onPress={() => setIsStarred((p) => !p)}
                style={styles.iconBtn}
            >
              {isStarred ? <StarIcon width={20} /> : <EmptyStarIcon width={20} />}
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

            <Pressable
                onPress={() => setIsSortActive((p) => !p)}
                style={styles.sortBtn}
            >
              <SortIcon
                  width={20}
                  color={isSortActive ? Colors.primary : Colors.gray400}
              />
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
                          onPress={() =>
                              setSelectedTpo((prev) => (prev === label ? null : label))
                          }
                          style={[styles.chip, active && styles.chipActive]}
                      >
                        <AppText
                            style={[
                              styles.chipText,
                              active && styles.chipTextActive,
                            ]}
                        >
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
                          onPress={() =>
                              setSelectedStyle((prev) => (prev === label ? null : label))
                          }
                          style={[styles.chip, active && styles.chipActive]}
                      >
                        <AppText
                            style={[
                              styles.chipText,
                              active && styles.chipTextActive,
                            ]}
                        >
                          {label}
                        </AppText>
                      </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={[styles.ootdBox,{height: FINAL_OOTD_HEIGHT}]}>
            <View style={styles.grid}>
              <Pressable style={styles.card}
                         onPress={() => navigation.navigate("OotdCreate")}>
                <View style={styles.cardImage}>
                  <ItemPlus width="100%" height="100%" />
                </View>
                <View style={styles.cardLabel} />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
  );
}