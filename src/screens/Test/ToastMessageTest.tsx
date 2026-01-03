import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import ToastMessage, { ToastType } from "@/components/ToastMessage/ToastMessage";

export default function HomeScreen() {
  const [toastType, setToastType] = useState<ToastType | null>(null);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setToastType("star")} style={styles.btn}>
        <Text style={{ color: "white" }}>즐겨찾기 테스트</Text>
      </Pressable>

      <Pressable onPress={() => setToastType("delete")} style={[styles.btn, { marginTop: 10 }]}>
        <Text style={{ color: "white" }}>삭제 테스트</Text>
      </Pressable>

      {toastType && <ToastMessage type={toastType} onHide={() => setToastType(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#1B2A41",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
