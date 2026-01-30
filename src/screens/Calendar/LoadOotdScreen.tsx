import React, { useState, useMemo } from "react";
import { View, TextInput, Pressable, ScrollView, Image } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarStackParamList } from "@/types/navigation/CalendarStackParamList";
import { AppText, AppText as Text } from "@/components/common/AppText";
import { Colors } from "@/theme/colors";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { TimeIcon, SortIcon, SearchIcon, SelectIcon } from "@/assets/icons";
import SaveLongButton from "@/components/Buttons/long_button/SaveLongButton";
import { MOCK_OOTD_DATA } from "@/components/Calendar/CalendarData";
import { loadOotdStyles as styles } from "./LoadOotdScreen.styles";

const TPO_LIST = ["데일리", "포멀", "데이트", "여행", "레저", "파티", "하객룩", "기타"];
const STYLE_LIST = ["캐주얼", "클래식", "빈티지", "스트릿", "스포티", "힙합", "기타"];

export default function LoadOotdScreen() {
  const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();
  const route = useRoute<RouteProp<CalendarStackParamList, "LoadOotd">>();
  const onSelectOotd = route.params?.onSelectOotd;

  const [keyword, setKeyword] = useState("");
  const [isRecentFilter, setIsRecentFilter] = useState(false); // TimeIcon 활성화 여부
  const [isSortActive, setIsSortActive] = useState(false);
  const [selectedTpo, setSelectedTpo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredOotdList = useMemo(() => {
    let list = Object.entries(MOCK_OOTD_DATA).map(([date, data]) => ({
      ...data,
      date,
    }));

    if (keyword) {
      list = list.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (isRecentFilter) {
      list = list
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 최신 날짜순
        .slice(0, 12); // 최대 12개 제한
    }

    return list;
  }, [keyword, isRecentFilter]);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleSave = () => {
    if (selectedId) {
      const selectedItem = Object.values(MOCK_OOTD_DATA).find((item) => item.id === selectedId);

      if (selectedItem && onSelectOotd) {
        onSelectOotd(selectedItem.image);
      }

      navigation.goBack();
    }
  };

  return (
    <>
      <AppHeader
        title="OOTD 불러오기"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setIsRecentFilter((p) => !p)}
            style={[
              styles.sortBtn,
              isRecentFilter ? { backgroundColor: Colors.gray400 } : undefined,
            ]}
          >
            <TimeIcon width={20} color={isRecentFilter ? Colors.primary : Colors.black} />
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
            {filteredOotdList.map((item) => {
              const active = selectedId === item.id;
              return (
                <Pressable key={item.id} style={styles.card} onPress={() => handleSelect(item.id)}>
                  <View style={[styles.thumbnailWrapper, active && styles.selectedThumbnail]}>
                    <Image source={item.image} style={styles.thumbnail} />
                    {active && (
                      <View style={styles.selectBadge}>
                        <SelectIcon width={15} height={15} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemName}>{item.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <SaveLongButton label="저 장" isActive={selectedId !== null} onPress={handleSave} />
        </View>
      </View>
    </>
  );
}
