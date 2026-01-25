import React, { useState } from "react";
import { View, FlatList, Pressable, Image } from "react-native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import { AppText as Text } from "@/components/common/AppText";
import { HelpIcon, Grid2Icon, Grid3Icon } from "@/assets/icons";
import { UNWORN_ITEMS } from "@/screens/Stats/statData";
import { styles } from "./UnwornScreen.styles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatsStackParamList } from "@/types/navigation/StatsStackParamList";

type Props = NativeStackScreenProps<StatsStackParamList, "UnwornDetail">;

const UnwornScreen = ({ navigation }: Props) => {
  const [numColumns, setNumColumns] = useState(2);
  const [showTooltip, setShowTooltip] = useState(false);

  // 격자 모드 전환
  const toggleGrid = () => setNumColumns((prev) => (prev === 2 ? 3 : 2));

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      style={numColumns === 2 ? styles.itemCard2 : styles.itemCard3}
      onPress={() => {
        // 아이템 정보 페이지로 이동
        // navigation.navigate("ItemDetail", { id: item.id });
        console.log("아이템 클릭:", item.id);
      }}
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      </View>
      <Text style={styles.itemName} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="최근 착용하지 않은 아이템"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        right={
          <HeaderRight
            type="icon"
            onPress={() => setShowTooltip(!showTooltip)}
            icons={[<HelpIcon key="help" width={21} height={21} />]}
          />
        }
      />

      {/* 도움말 안내 문구 */}
      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>
            최근 6개월 동안 착용하지 않은 아이템들이에요.{"\n"}
            다양한 코디를 시도해보는 건 어떨까요?
          </Text>
        </View>
      )}

      <View style={styles.content}>
        {/* 아이템 갯수 및 정렬 버튼 레이아웃 */}
        <View style={styles.infoRow}>
          <Text style={styles.itemCount}>{UNWORN_ITEMS.length}개</Text>
          <Pressable onPress={toggleGrid}>
            {numColumns === 2 ? (
              <Grid3Icon width={20} height={20} />
            ) : (
              <Grid2Icon width={20} height={20} />
            )}
          </Pressable>
        </View>

        <FlatList
          key={numColumns}
          data={UNWORN_ITEMS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default UnwornScreen;
