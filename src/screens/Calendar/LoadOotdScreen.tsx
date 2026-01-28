import React, { useState } from "react";
import { View, ScrollView, TextInput, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppText as Text } from "@/components/common/AppText";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { SearchIcon, SortIcon, TimeIcon } from "@/assets/icons";
import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import CreateLongButton from "@/components/Buttons/long_button/CreateLongButton";
import { MOCK_CLOSETS } from "@/screens/Dressroom/dressroom.mock";
import { loadOotdStyles as styles } from "./LoadOotdScreen.styles";

export default function LoadOotdScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOotdId, setSelectedOotdId] = useState<number | null>(null);

  // 선택 토글 로직
  const handleSelect = (id: number) => {
    setSelectedOotdId(id === selectedOotdId ? null : id);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="OOTD 불러오기"
        left={<HeaderLeft type="button" label="이전" onPress={() => navigation.goBack()} />}
      />

      {/* 검색창 영역 */}
      <View style={styles.searchSection}>
        <TimeIcon width={20} height={20} color="#1B2A41" />
        <View style={styles.searchBox}>
          <SearchIcon width={18} height={18} color="#999" />
          <TextInput
            placeholder="검색.."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <SortIcon width={20} height={20} color="#1B2A41" />
      </View>

      {/* 필터 카테고리 (TPO, Style 등) */}
      <View style={styles.filterArea}>
        <ButtonScroll onChange={() => {}} />
      </View>

      {/* OOTD 그리드 리스트 */}
      <View style={styles.gridWrapper}>
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {MOCK_CLOSETS.map((item) => {
            const isSelected = selectedOotdId === item.id;
            return (
              <Pressable key={item.id} style={styles.card} onPress={() => handleSelect(item.id)}>
                <View style={[styles.thumbnailWrapper, isSelected && styles.selectedBorder]}>
                  <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* 하단 저장 버튼 */}
      <View style={styles.footer}>
        <CreateLongButton
          label="저 장"
          isActive={selectedOotdId !== null}
          onPress={() => {
            console.log("선택된 OOTD:", selectedOotdId);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
