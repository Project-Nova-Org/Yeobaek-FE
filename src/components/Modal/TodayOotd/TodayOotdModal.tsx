import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarStackParamList } from "@/types/navigation/CalendarStackParamList";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { AppText as Text } from "@/components/common/AppText";
import { CloseIcon, DeleteIcon, CheckIcon, UnCheckIcon, UndoIcon, AddIcon } from "@/assets/icons";
import LoadOOTDButton from "@/components/Buttons/medium_button/LoadOOTDButton";
import CreateOOTDButton from "@/components/Buttons/medium_button/CreateOOTDButton";
import CameraButton from "@/components/Buttons/medium_button/CameraButton";
import GalleryButton from "@/components/Buttons/medium_button/GalleryButton";
import Alert from "@/components/Alert/Alert";
import { todayOotdStyles as styles } from "./TodayOotdModal.styles";

export function TodayOotdModal({
  visible,
  onClose,
  date,
  ootdData,
  onSelectMainImage,
  onDeleteImage,
  onPrev,
  onNext,
}: any) {
  const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"ootd" | "fullShot" | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  useEffect(() => {
    if (visible && ootdData) {
      const items = [
        { id: "ootd", image: ootdData.ootdImage || ootdData.image },
        { id: "fullShot", image: ootdData.fullShotImage || null },
      ];

      const sortedItems = [...items].sort((a, b) => {
        if (a.image === ootdData.image) return -1;
        if (b.image === ootdData.image) return 1;
        return 0;
      });
      setDisplayList(sortedItems);
      setIsAddMenuOpen(false);
    } else if (visible && !ootdData) {
      setDisplayList([]);
    }
  }, [visible, date]);

  const handleOpenAlert = (id: "ootd" | "fullShot") => {
    setDeleteTarget(id);
    setAlertVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDeleteImage(deleteTarget);
      setAlertVisible(false);
      setDeleteTarget(null);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={15}>
            <CloseIcon width={15} height={15} color="#1B2A41" />
          </Pressable>

          <View style={styles.dateSelector}>
            <Pressable hitSlop={15} onPress={onPrev}>
              <UndoIcon width={15} height={15} />
            </Pressable>
            <Text style={styles.dateText}>{date || ""}</Text>
            <Pressable hitSlop={15} onPress={onNext}>
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                <UndoIcon width={15} height={15} />
              </View>
            </Pressable>
          </View>

          <View style={styles.content}>
            {displayList.length > 0 && (displayList[0].image || displayList[1]?.image) ? (
              <View style={styles.carouselContainer}>
                <Carousel
                  key={date}
                  loop={false}
                  width={254}
                  height={370}
                  data={displayList}
                  customAnimation={(value: number) => {
                    "worklet";
                    const zIndex = interpolate(value, [-1, 0, 1], [10, 100, 10]);
                    const translateX = interpolate(value, [-1, 0, 1], [-25, 0, 25]);
                    const translateY = interpolate(value, [-1, 0, 1], [15, 0, 15]);
                    const scale = interpolate(value, [-1, 0, 1], [0.94, 1, 0.94]);
                    return {
                      transform: [{ translateX }, { translateY }, { scale }],
                      zIndex: Math.round(zIndex),
                      opacity: 1,
                    };
                  }}
                  renderItem={({ item }) => {
                    const isSelected = item.image && ootdData?.image === item.image;
                    const isEmpty = !item.image;

                    return (
                      <View
                        style={[
                          styles.cardWrapper,
                          isSelected && styles.activeCardBorder,
                          isEmpty && styles.emptyCardWrapper,
                        ]}
                      >
                        {item.image ? (
                          <>
                            <Image
                              source={item.image}
                              style={styles.cardImage}
                              resizeMode="contain"
                            />
                            <Pressable
                              style={styles.deleteIcon}
                              onPress={() => handleOpenAlert(item.id as any)}
                            >
                              <DeleteIcon width={20} height={20} color="#1B2A41" />
                            </Pressable>
                            <Pressable
                              style={styles.checkIcon}
                              onPress={() => onSelectMainImage(item.id)}
                            >
                              {isSelected ? (
                                <CheckIcon width={20} height={16} color="#1B2A41" />
                              ) : (
                                <UnCheckIcon width={20} height={16} color="#CCC" />
                              )}
                            </Pressable>
                          </>
                        ) : (
                          <View style={styles.addMenuContainer}>
                            {!isAddMenuOpen ? (
                              <Pressable onPress={() => setIsAddMenuOpen(true)}>
                                <AddIcon width={40} height={40} color="#CCC" />
                              </Pressable>
                            ) : (
                              <>
                                <CameraButton onPress={() => console.log("카메라 실행")} />
                                <View style={{ height: 12 }} />
                                <GalleryButton
                                  onPress={() => console.log("갤러리 실행")}
                                  label="갤러리"
                                />
                              </>
                            )}
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <LoadOOTDButton
                  onPress={() => {
                    onClose();
                    navigation.navigate("LoadOotd", {
                      onSelectOotd: (selectedImage: any) => {
                        onSelectMainImage(selectedImage); // 모달/캘린더 데이터 업데이트
                      },
                    });
                  }}
                />
                <View style={{ height: 9 }} />
                <CreateOOTDButton
                  onPress={() => {
                    onClose();
                    navigation.navigate("OotdCreate");
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>

      <Alert
        visible={alertVisible}
        message={
          deleteTarget === "ootd"
            ? "OOTD를 삭제하시겠습니까?\n등록된 전신사진도 함께 삭제됩니다."
            : "전신사진을 삭제하시겠습니까?"
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setAlertVisible(false)}
      />
    </Modal>
  );
}
