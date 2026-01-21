import React, { useState } from "react";
import { ScrollView, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { AppText as Text } from "@/components/common/AppText";
import { StatDonutCard } from "@/components/State/StatDonutCard";
import { StatsLineChart } from "@/components/State/StatsLineChart";
import { statData, FREQUENT_ITEMS, UNWORN_DATA, STATS_SUMMARY } from "./statData";
import { HelpIcon, UndoIcon, ItemIcon, ClosetIcon, OOTDIcon } from "@/assets/icons";
import { statsStyles as styles } from "./StatsScreen.styles";

export function StatsScreen() {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View>
      {/* 자주 착용한 아이템 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>자주 착용한 아이템</Text>
            <Pressable hitSlop={10} onPress={() => setShowTooltip(!showTooltip)}>
              <HelpIcon width={12} height={12} />
            </Pressable>
            {showTooltip && (
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>가장 많이 등록한 옷 Top10을 보여줘요!</Text>
              </View>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollPadding}
        >
          {FREQUENT_ITEMS.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.imagePlaceholder}>
                <Image source={item.image} style={styles.fullImage} resizeMode="cover" />
              </View>
              <Text style={styles.itemLabel} numberOfLines={1}>
                {item.brand}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 최근 착용하지 않은 아이템 */}
      <Pressable style={styles.unwornSection} onPress={() => navigation.navigate("UnwornDetail")}>
        <View style={styles.unwornHeader}>
          <View style={styles.row}>
            <Text style={styles.unwornTitle}>최근 착용하지 않은 아이템</Text>
            <UndoIcon width={12} height={12} style={styles.rotateIcon} />
          </View>
          <View style={styles.unwornImages}>
            {UNWORN_DATA.previewItems.map((item) => (
              <View key={item.id} style={styles.smallImgContainer}>
                <Image source={item.image} style={styles.fullImage} resizeMode="cover" />
              </View>
            ))}
            {UNWORN_DATA.totalCount > 0 && (
              <Text style={styles.moreText}>+{UNWORN_DATA.totalCount}</Text>
            )}
          </View>
        </View>
      </Pressable>

      {/* 스타일 보고서  */}
      <View style={styles.section}>
        <Text style={styles.styleTitle}>스타일 보고서</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollPadding}
        >
          {statData.map((stat) => (
            <View key={stat.title} style={styles.horizontalChartItem}>
              <StatDonutCard stat={stat} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ootd 추이 그래프 */}
      <View style={styles.section}>
        <Text style={styles.chartTitle}>월간 OOTD 기록 추이</Text>
        <View style={styles.bottomRowSection}>
          <View style={styles.chartColumn}>
            <StatsLineChart />
          </View>
          {/* 요약 지표 영역 */}
          <View style={styles.summaryColumn}>
            <View style={styles.summaryCard}>
              <SummaryItem Icon={ItemIcon} label="아이템" count={STATS_SUMMARY.items} />
              <SummaryItem Icon={ClosetIcon} label="옷장" count={STATS_SUMMARY.closet} />
              <SummaryItem Icon={OOTDIcon} label="OOTD" count={STATS_SUMMARY.ootd} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function SummaryItem({ Icon, label, count }: { Icon: any; label: string; count: number }) {
  return (
    <View style={styles.summaryItemRow}>
      <View style={styles.summaryIconCircle}>
        <Icon width={12} height={12} />
      </View>
      <View style={styles.summaryTextContainer}>
        <Text style={styles.summaryLabelText}>{label}</Text>
        <Text style={styles.summaryCountText}>{count}</Text>
      </View>
    </View>
  );
}
