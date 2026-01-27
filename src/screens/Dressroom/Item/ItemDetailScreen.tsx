import { View, ScrollView, Image, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import { AppText } from "@/components/common/AppText";

import { Colors } from "@/theme/colors";
import { styles } from "./ItemDetail.styles";

import { DeleteIcon, EditIcon } from "@/assets/icons";
import { PersonalPairingBanner } from "@/screens/Home/PersonalPairingBanner";
import Alert from "@/components/Alert/Alert";
import { OotdIncludedModal } from "@/components/Modal/OotdIncludedModal/OotdIncludedModal";

import { MOCK_ITEMS } from "@/screens/Dressroom/dressroom.mock";
import { SampleOOTDIcon } from "@/assets/icons/SampleOOTDIcon"; // 예시 아이콘

type ItemColor =
  | "black"
  | "white"
  | "gray"
  | "beige"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

const ITEM_COLOR_MAP: Record<ItemColor, string> = {
  black: Colors.itemBlack,
  white: Colors.itemWhite,
  gray: Colors.itemGray,
  beige: Colors.itemBeige,
  brown: Colors.itemBrown,
  red: Colors.itemRed,
  orange: Colors.itemOrange,
  yellow: Colors.itemYellow,
  green: Colors.itemGreen,
  blue: Colors.itemBlue,
  purple: Colors.itemPurple,
  pink: Colors.itemPink,
};

export function ItemDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [alertVisible, setAlertVisible] = useState(false);
  const [ootdModalVisible, setOotdModalVisible] = useState(false);

  const { itemId } = route.params;
  const item = MOCK_ITEMS.find((it) => it.id === itemId);

  if (!item) {
    return null;
  }

  const handleDelete = () => {
    setAlertVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="아이템 정보"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        right={
          <HeaderRight
            type="icons"
            icons={[
              <Pressable key="delete" onPress={() => setAlertVisible(true)}>
                <DeleteIcon />
              </Pressable>,
              <EditIcon key="edit" width={18} height={18} />,
            ]}
          />
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />

          <Pressable style={styles.ootdButton} onPress={() => setOotdModalVisible(true)}>
            <AppText style={styles.ootdButtonText}>저장된 OOTD 보기</AppText>
          </Pressable>
        </View>

        <View style={styles.infoList}>
          <InfoRow label="종류" value={item.category} />
          <InfoRow
            label="색상"
            value={
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: ITEM_COLOR_MAP[item.color as ItemColor] },
                ]}
              />
            }
          />
          <InfoRow label="계절" value={item.season} />
          <InfoRow label="소재" value={item.material} />
          <InfoRow label="사이즈" value={item.size} />
          <InfoRow label="브랜드" value={item.brand} />
          <InfoRow label="가격" value={`${item.price.toLocaleString()}원`} />
          <InfoRow label="최근 착용 날짜" value={item.lastWornAt} />
          <InfoRow label="착용 횟수" value={`${item.wearCount}회`} />
        </View>

        {item.memo && (
          <View style={styles.memoBox}>
            <AppText style={styles.memoText}>{item.memo}</AppText>
          </View>
        )}

        <PersonalPairingBanner />
      </ScrollView>

      <Alert
        visible={alertVisible}
        message={`해당 아이템을\n삭제하시겠습니까?`}
        onConfirm={handleDelete}
        onCancel={() => setAlertVisible(false)}
      />

      <OotdIncludedModal
        visible={ootdModalVisible}
        onClose={() => setOotdModalVisible(false)}
        items={[
          { id: 1, Icon: SampleOOTDIcon, label: "OOTD 1" },
          { id: 2, Icon: SampleOOTDIcon, label: "OOTD 2" },
          { id: 3, Icon: SampleOOTDIcon, label: "OOTD 3" },
          { id: 4, Icon: SampleOOTDIcon, label: "OOTD 4" },
          { id: 5, Icon: SampleOOTDIcon, label: "OOTD 5" },
        ]}
      />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <View style={styles.infoRow}>
      <AppText style={styles.infoLabel}>{label}</AppText>
      {typeof value === "string" ? <AppText style={styles.infoValue}>{value}</AppText> : value}
    </View>
  );
}
