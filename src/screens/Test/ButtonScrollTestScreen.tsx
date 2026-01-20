import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";
import type { CategoryState } from "@/components/ButtonScroll/ButtonScroll.types";

export default function ButtonScrollTestScreen() {
  const [filterState, setFilterState] = useState<CategoryState | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ButtonScroll 테스트</Text>

      {/* 필터 컴포넌트 */}
      <ButtonScroll
        onChange={(state) => {
          setFilterState(state);
        }}
      />

      {/* 상태 확인용 */}
      <View style={styles.debugBox}>
        <Text style={styles.debugTitle}>현재 선택 상태</Text>
        <Text style={styles.debugText}>
          {filterState ? JSON.stringify(filterState, null, 2) : "선택 없음"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  debugBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F4F4F5",
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "monospace",
  },
});
