import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateScroll from "@/components/DateScroll/DateScroll";

export default function HomeScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState({ year: 2025, month: 6 });

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        선택된 날짜: {date.year}.{date.month < 10 ? `0${date.month}` : date.month}
      </Text>

      <Pressable style={styles.openBtn} onPress={() => setIsModalOpen(true)}>
        <Text style={{ color: "white" }}>날짜 변경</Text>
      </Pressable>

      <DateScroll
        visible={isModalOpen}
        onClose={(y, m) => {
          setDate({ year: y, month: m });
          setIsModalOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  resultText: { fontSize: 20, fontWeight: "bold", marginBottom: 30, color: "#1B2A41" },
  openBtn: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#1B2A41",
    borderRadius: 25,
  },
});
