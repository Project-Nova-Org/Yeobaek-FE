import React, { useState, useMemo, useEffect } from "react";
import { View, TextInput, Pressable, ScrollView, Image, ImageSourcePropType } from "react-native";
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
import { SampleOOTD2Image } from "@/assets/images";
import { getOotdList, subscribeOotdList } from "@/stores/ootdStore";
import type { SavedOotd } from "@/types/ootd";
import { OotdLayoutPreview } from "@/components/Ootd/OotdLayoutPreview";
import { loadOotdStyles as styles } from "./LoadOotdScreen.styles";

const TPO_LIST = ["데일리", "포멀", "데이트", "여행", "레저", "파티", "하객룩", "기타"];
const STYLE_LIST = ["캐주얼", "클래식", "빈티지", "스트릿", "스포티", "힙합", "기타"];
const LOAD_PREVIEW_SIZE = 100;

type LoadOotdListItem = {
  id: string;
  name: string;
  date: string;
  image: ImageSourcePropType;
  fromSaved?: boolean;
  /** 저장된 OOTD 전체(캔버스 미리보기용) */
  ootd?: SavedOotd;
};

export default function LoadOotdScreen() {
  const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();
  const route = useRoute<RouteProp<CalendarStackParamList, "LoadOotd">>();
  const onSelectOotd = route.params?.onSelectOotd;

  const [ootdList, setOotdList] = useState(() => getOotdList());
  const [keyword, setKeyword] = useState("");
  const [isRecentFilter, setIsRecentFilter] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [selectedTpo, setSelectedTpo] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeOotdList(() => setOotdList(getOotdList()));
    return unsub;
  }, []);

  const filteredOotdList = useMemo(() => {
    const savedList: LoadOotdListItem[] = ootdList.map((ootd) => ({
      id: ootd.id,
      name: ootd.name,
      date: new Date(ootd.createdAt).toISOString().slice(0, 10),
      image: (ootd.items[0]?.image as ImageSourcePropType) ?? SampleOOTD2Image,
      fromSaved: true,
      ootd,
    }));
    const mockList: LoadOotdListItem[] = Object.entries(MOCK_OOTD_DATA).map(([date, data]) => ({
      id: data.id,
      name: data.name,
      date,
      image: data.image,
      fromSaved: false,
    }));
    let list = [...savedList, ...mockList];

    if (keyword) {
      list = list.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (isRecentFilter) {
      list = list
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12);
    }

    return list;
  }, [ootdList, keyword, isRecentFilter]);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleSave = () => {
    if (selectedId && onSelectOotd) {
      const selectedItem = filteredOotdList.find((item) => item.id === selectedId);
      if (!selectedItem) {
        navigation.goBack();
        return;
      }
      // 이미 만들어진 OOTD는 전체 데이터(items/canvasSize)를 넘겨 달력·모달에서 풀 레이아웃으로 표시
      if (selectedItem.fromSaved && selectedItem.ootd) {
        onSelectOotd(selectedItem.ootd);
      } else if (selectedItem.image) {
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
              const showOotdPreview =
                item.ootd &&
                item.ootd.items.length > 0 &&
                item.ootd.canvasSize != null;
              return (
                <Pressable key={item.id} style={styles.card} onPress={() => handleSelect(item.id)}>
                  <View style={[styles.thumbnailWrapper, active && styles.selectedThumbnail]}>
                    {showOotdPreview ? (
                      <View style={[styles.thumbnail, { width: LOAD_PREVIEW_SIZE, height: LOAD_PREVIEW_SIZE }]}>
                        <OotdLayoutPreview
                          items={item.ootd!.items}
                          width={LOAD_PREVIEW_SIZE}
                          height={LOAD_PREVIEW_SIZE}
                          sourceWidth={item.ootd!.canvasSize.width}
                          sourceHeight={item.ootd!.canvasSize.height}
                          imageBgColor={item.ootd!.imageBgColor}
                        />
                      </View>
                    ) : (
                      <Image source={item.image} style={styles.thumbnail} />
                    )}
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
