import React, { useState } from "react";
import { View, Modal, Pressable, ScrollView } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { saveModalStyles as styles, BG_COLORS } from "./CalendarSave.styles";
import { CloseIcon, DownloadIcon } from "@/assets/icons";

export function CalendarSave({ visible, onClose, year, month }: any) {
  const [selectedBg, setSelectedBg] = useState(BG_COLORS[0]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Pressable onPress={() => {}}>
            <DownloadIcon width={24} height={24} color="#FFF" />
          </Pressable>
          <Text style={styles.headerTitle}>
            {month}월 {year}
          </Text>
          <Pressable onPress={onClose}>
            <CloseIcon width={24} height={24} color="#FFF" />
          </Pressable>
        </View>

        <View style={[styles.previewCard, { backgroundColor: selectedBg }]}>
          <Text
            style={[styles.previewMonth, { color: selectedBg === "#000000" ? "#FFF" : "#000" }]}
          >
            {month}월 {year}
          </Text>
          <View style={styles.gridPlaceholder} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLabel}>여백 :</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorList}
          >
            {BG_COLORS.map((color, index) => (
              <Pressable
                key={index}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedBg === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedBg(color)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
