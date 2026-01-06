import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NicknameInput } from "@/components/Input/NicknameInput";

export default function NicknameInputTestScreen() {
  const [nickname, setNickname] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임 입력 테스트</Text>

      <NicknameInput value={nickname} onChange={setNickname} />

      <View style={styles.debugBox}>
        <Text style={styles.debugLabel}>현재 값</Text>
        <Text style={styles.debugValue}>{nickname || "(비어 있음)"}</Text>
        <Text style={styles.debugCount}>길이: {nickname.length} / 10</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    color: "#111111",
  },

  debugBox: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },

  debugLabel: {
    fontSize: 12,
    color: "#8E8E8E",
    marginBottom: 4,
  },

  debugValue: {
    fontSize: 16,
    color: "#111111",
  },

  debugCount: {
    marginTop: 8,
    fontSize: 12,
    color: "#555555",
  },
});
