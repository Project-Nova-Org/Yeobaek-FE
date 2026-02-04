import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, Image, ImageSourcePropType } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { AppText as Text } from "@/components/common/AppText";
import {
  CloseIcon,
  DeleteIcon,
  CheckSelectedIcon,
  CheckUnselectedIcon,
  UndoIcon,
  AddIcon,
} from "@/assets/icons";
import { Colors } from "@/theme/colors";
import LoadOOTDButton from "@/components/Buttons/medium_button/LoadOOTDButton";
import CreateOOTDButton from "@/components/Buttons/medium_button/CreateOOTDButton";
import CameraButton from "@/components/Buttons/medium_button/CameraButton";
import GalleryButton from "@/components/Buttons/medium_button/GalleryButton";
import Alert from "@/components/Alert/Alert";
import { OotdLayoutPreview } from "@/components/Ootd/OotdLayoutPreview";
import { todayOotdStyles as styles } from "./TodayOotdModal.styles";
import { SingleOotdData } from "@/components/Calendar/CalendarData";
import type { SavedOotd } from "@/types/ootd";

const CAROUSEL_WIDTH = 254;
const CAROUSEL_HEIGHT = 370;
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarStackParamList } from "@/types/navigation/CalendarStackParamList";

interface TodayOotdModalProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  /** YYYY-MM-DD (달력에서 OOTD 생성 시 전달용) */
  rawDate?: string;
  ootdData: SingleOotdData | null;
  /** slotForNewImage: 카메라/갤러리에서 새 이미지 추가 시 어느 슬롯(ootd/fullShot)에 넣을지. LoadOotd에서 저장된 OOTD 선택 시 SavedOotd 전달 */
  onSelectMainImage: (
    input: "ootd" | "fullShot" | ImageSourcePropType | SavedOotd,
    slotForNewImage?: "ootd" | "fullShot"
  ) => void;
  onDeleteImage: (type: "ootd" | "fullShot") => void;
  onPrev: () => void;
  onNext: () => void;
}
export function TodayOotdModal({
  visible,
  onClose,
  date,
  rawDate,
  ootdData,
  onSelectMainImage,
  onDeleteImage,
  onPrev,
  onNext,
}: TodayOotdModalProps) {
  const [displayList, setDisplayList] = useState<
    { id: string; image: ImageSourcePropType | null }[]
  >([]);
  const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();
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
  }, [visible, date, ootdData]);

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
  const handleImagePick = (source: "camera" | "gallery", slotId: "ootd" | "fullShot") => {
    if (source === "camera") {
      launchCamera({ mediaType: "photo" }, (res) => {
        setIsAddMenuOpen(false);
        if (res.didCancel || res.errorCode) return;
        const uri = res.assets?.[0]?.uri;
        if (uri) onSelectMainImage({ uri }, slotId);
      });
    } else {
      launchImageLibrary(
        { mediaType: "photo", selectionLimit: 1 },
        (res) => {
          setIsAddMenuOpen(false);
          if (res.didCancel || res.errorCode) return;
          const uri = res.assets?.[0]?.uri;
          if (uri) onSelectMainImage({ uri }, slotId);
        }
      );
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
                  key={`${date}-rep-${ootdData?.image === ootdData?.fullShotImage ? "fullShot" : "ootd"}`}
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
                    const isOotdLayout =
                      item.id === "ootd" &&
                      ootdData?.items != null &&
                      ootdData?.canvasSize != null &&
                      ootdData.items.length > 0;
                    const hasOotd = !!(ootdData?.ootdImage || (ootdData?.items && ootdData.items.length > 0));
                    const hasFullShot = !!ootdData?.fullShotImage;
                    const showRepresentativeCheck = hasOotd && hasFullShot;
                    const isSelected = showRepresentativeCheck
                      ? item.id === "ootd"
                        ? ootdData?.image !== ootdData?.fullShotImage
                        : ootdData?.image === ootdData?.fullShotImage
                      : false;
                    const isEmpty = !item.image && !isOotdLayout;

                    return (
                      <View
                        style={[
                          styles.cardWrapper,
                          isSelected ? styles.activeCardBorder : undefined,
                          isEmpty ? styles.emptyCardWrapper : undefined,
                        ]}
                      >
                        {isOotdLayout ? (
                          <>
                            <View style={[styles.cardImage, { width: CAROUSEL_WIDTH, height: CAROUSEL_HEIGHT }]}>
                              <OotdLayoutPreview
                                items={ootdData!.items!}
                                width={CAROUSEL_WIDTH}
                                height={CAROUSEL_HEIGHT}
                                sourceWidth={ootdData!.canvasSize!.width}
                                sourceHeight={ootdData!.canvasSize!.height}
                                imageBgColor={ootdData!.imageBgColor}
                              />
                            </View>
                            <Pressable
                              style={styles.deleteIcon}
                              onPress={() => handleOpenAlert("ootd")}
                            >
                              <DeleteIcon width={20} height={20} color="#1B2A41" />
                            </Pressable>
                            {showRepresentativeCheck && (
                              <Pressable
                                style={styles.checkIconWrap}
                                onPress={() => onSelectMainImage("ootd")}
                              >
                                {isSelected ? (
                                  <CheckSelectedIcon width={20} height={16} />
                                ) : (
                                  <CheckUnselectedIcon width={20} height={16} />
                                )}
                              </Pressable>
                            )}
                          </>
                        ) : item.image ? (
                          <>
                            <Image
                              source={item.image}
                              style={styles.cardImage}
                              resizeMode="cover"
                            />
                            <Pressable
                              style={styles.deleteIcon}
                              onPress={() => handleOpenAlert(item.id as any)}
                            >
                              <DeleteIcon width={20} height={20} color="#1B2A41" />
                            </Pressable>
                            {showRepresentativeCheck && (
                              <Pressable
                                style={styles.checkIconWrap}
                                onPress={() => onSelectMainImage(item.id as "ootd" | "fullShot")}
                              >
                                {isSelected ? (
                                  <CheckSelectedIcon width={20} height={16} />
                                ) : (
                                  <CheckUnselectedIcon width={20} height={16} />
                                )}
                              </Pressable>
                            )}
                          </>
                        ) : (
                          <View style={styles.addMenuContainer}>
                            {!isAddMenuOpen ? (
                              <Pressable onPress={() => setIsAddMenuOpen(true)}>
                                <AddIcon width={40} height={40} color="#CCC" />
                              </Pressable>
                            ) : (
                              <>
                                <CameraButton
                                  onPress={() => handleImagePick("camera", item.id as "ootd" | "fullShot")}
                                />
                                <View style={{ height: 12 }} />
                                <GalleryButton
                                  onPress={() => handleImagePick("gallery", item.id as "ootd" | "fullShot")}
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
                        onSelectMainImage(selectedImage);
                      },
                    });
                  }}
                />
                <View style={{ height: 9 }} />
                <CreateOOTDButton
                  onPress={() => {
                    onClose();
                    navigation.navigate("OotdCreate", rawDate ? { calendarDate: rawDate } : undefined);
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
