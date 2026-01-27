import React, { useState, useRef } from "react";
import { View, Modal, Pressable, ScrollView, Image, Alert, Platform } from "react-native";
import { captureRef } from "react-native-view-shot";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { saveModalStyles as styles, BG_COLORS } from "./CalendarSave.styles";
import { CloseIcon, DownloadIcon } from "@/assets/icons";
import { CalendarCaptureCard } from "./CalendarCaptureCard";

type BgItem = string | { thumb: any; bg: any; isGrad?: boolean; isLight?: boolean };

interface CalendarSaveProps {
  visible: boolean;
  onClose: () => void;
  year: number;
  month: number;
}

export function CalendarSave({ visible, onClose, year, month }: CalendarSaveProps) {
  const [selectedBg, setSelectedBg] = useState<BgItem>(BG_COLORS[0]);
  const captureViewRef = useRef<View>(null); // 💡 캡처할 영역을 가리키는 Ref

  const isImageObj = (
    item: BgItem,
  ): item is { thumb: any; bg: any; isGrad?: boolean; isLight?: boolean } => {
    return typeof item === "object" && item !== null && "bg" in item;
  };

  const handleDownload = async () => {
    try {
      const uri = await captureRef(captureViewRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      await CameraRoll.saveAsset(uri, { type: "photo", album: "여백" });

      Alert.alert("저장 완료", "갤러리에 달력이 저장되었습니다.");
      onClose();
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert("저장 실패", "이미지를 저장하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.headerActions}>
            <Pressable hitSlop={15} onPress={handleDownload}>
              <DownloadIcon width={25} height={25} color="#FFFFFF" />
            </Pressable>
            <Pressable hitSlop={15} onPress={onClose}>
              <CloseIcon width={15} height={25} color="#FFFFFF" />
            </Pressable>
          </View>

          <View ref={captureViewRef} collapsable={false} style={{ backgroundColor: "transparent" }}>
            <CalendarCaptureCard year={year} month={month} selectedBg={selectedBg} />
          </View>

          <View style={styles.footer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorList}
            >
              {BG_COLORS.map((item: BgItem, index) => {
                const isItemObj = isImageObj(item);
                const isSelected = selectedBg === item;

                return (
                  <Pressable
                    key={index}
                    style={[
                      styles.colorCircle,
                      !isItemObj && { backgroundColor: item as string },
                      isSelected && styles.selectedColor,
                    ]}
                    onPress={() => setSelectedBg(item)}
                  >
                    {isItemObj && (
                      <Image source={item.thumb} style={styles.paletteImage} resizeMode="cover" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}
