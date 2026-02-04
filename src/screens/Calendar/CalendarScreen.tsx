import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Pressable, ImageSourcePropType } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { Calendar } from "@/components/Calendar/Calendar";
import { CalendarSave } from "@/components/Modal/CalendarSave/CalendarSave";
import { TodayOotdModal } from "@/components/Modal/TodayOotd/TodayOotdModal";
import CalsaveSemishortButton from "@/components/Buttons/semishort_button/CalsaveSemishortButton";
import DateScroll from "@/components/DateScroll/DateScroll";
import { UndoIcon } from "@/assets/icons";
import { calendarScreenStyles as styles } from "./CalendarScreen.styles";
import { CalendarTop } from "@/components/Top/CalendarTop.tsx";
import { MOCK_OOTD_DATA } from "@/components/Calendar/CalendarData";
import { OotdListData, SingleOotdData } from "@/components/Calendar/CalendarData";
import {
  getAllDateToOotdIds,
  removeOotdForDate,
  setOotdForDate,
  subscribeCalendarDates,
} from "@/stores/calendarStore";
import { getOotdList, subscribeOotdList } from "@/stores/ootdStore";
import { SampleOOTD2Image } from "@/assets/images";
import type { SavedOotd } from "@/types/ootd";

function savedOotdToSingleOotdData(ootd: SavedOotd): SingleOotdData {
  const image = (ootd.items[0]?.image as ImageSourcePropType) ?? SampleOOTD2Image;
  return {
    id: ootd.id,
    name: ootd.name,
    image,
    ootdImage: image,
    items: ootd.items,
    canvasSize: ootd.canvasSize,
    imageBgColor: ootd.imageBgColor,
  };
}

function getCalendarSavedEntries(): OotdListData {
  const dateToOotdId = getAllDateToOotdIds();
  const ootdList = getOotdList();
  const entries: OotdListData = {};
  for (const [dateStr, ootdId] of Object.entries(dateToOotdId)) {
    const ootd = ootdList.find((o) => o.id === ootdId);
    if (ootd) entries[dateStr] = savedOotdToSingleOotdData(ootd);
  }
  return entries;
}

export function CalendarScreen() {
  const [ootdListData, setOotdListData] = useState<OotdListData>(() => ({
    ...MOCK_OOTD_DATA,
    ...getCalendarSavedEntries(),
  }));
  const [calendarVersion, setCalendarVersion] = useState(0);

  useEffect(() => {
    const unsubCal = subscribeCalendarDates(() => setCalendarVersion((v) => v + 1));
    const unsubOotd = subscribeOotdList(() => setCalendarVersion((v) => v + 1));
    return () => {
      unsubCal();
      unsubOotd();
    };
  }, []);

  const mergedOotdListData = useMemo(
    () => ({ ...getCalendarSavedEntries(), ...ootdListData }),
    [ootdListData, calendarVersion]
  );
  const [selectedOotdData, setSelectedOotdData] = useState<SingleOotdData | null>(null);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [ootdModalVisible, setOotdModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const [selectedDateInfo, setSelectedDateInfo] = useState({ formatted: "", raw: "" });

  const updateModalData = useCallback(
    (dateStr: string) => {
      const parts = dateStr.split("-").map(Number);
      if (parts.length !== 3) return;

      setSelectedDateInfo({
        formatted: `${parts[0]}년 ${parts[1]}월 ${parts[2]}일`,
        raw: dateStr,
      });

      // 상태에서 직접 조회하여 모달 데이터 동기화
      const data = mergedOotdListData[dateStr] || null;
      setSelectedOotdData(data);
    },
    [mergedOotdListData],
  );

  const handleMoveDate = (direction: "prev" | "next") => {
    if (!selectedDateInfo.raw) return;

    const [y, m, d] = selectedDateInfo.raw.split("-").map(Number);
    const current = new Date(y, m - 1, d);

    if (direction === "prev") {
      current.setDate(current.getDate() - 1);
    } else {
      current.setDate(current.getDate() + 1);
    }

    const nextY = current.getFullYear();
    const nextM = String(current.getMonth() + 1).padStart(2, "0");
    const nextD = String(current.getDate()).padStart(2, "0");
    const newDateStr = `${nextY}-${nextM}-${nextD}`;

    setCurrentDate({
      year: nextY,
      month: current.getMonth() + 1,
    });

    updateModalData(newDateStr);
  };

  const handleOpenOOTD = useCallback(
    (dateStr: string) => {
      updateModalData(dateStr);
      setOotdModalVisible(true);
    },
    [updateModalData],
  );

  const handleUpdateMainImage = (
    input: "ootd" | "fullShot" | ImageSourcePropType | SavedOotd,
    slotForNewImage?: "ootd" | "fullShot"
  ) => {
    const dateRaw = selectedDateInfo.raw;
    if (!dateRaw) return;

    // 이미 만들어진 OOTD를 달력에 등록한 경우: 전체 레이아웃(items/canvasSize)을 반영해 모달·달력 셀 모두 동일하게 표시
    const isSavedOotd =
      input &&
      typeof input === "object" &&
      "items" in input &&
      Array.isArray((input as SavedOotd).items) &&
      "canvasSize" in input &&
      "id" in input;
    if (isSavedOotd) {
      const ootd = input as SavedOotd;
      const entry = savedOotdToSingleOotdData(ootd);
      setOotdListData((prev) => ({ ...prev, [dateRaw]: entry }));
      setSelectedOotdData(entry);
      setOotdForDate(dateRaw, ootd.id);
      return;
    }

    setOotdListData((prev: OotdListData) => {
      const target = prev[dateRaw];
      let updatedEntry: SingleOotdData;

      // 카메라/갤러리에서 새 이미지를 특정 슬롯에 추가하는 경우
      if (typeof input === "object" && slotForNewImage != null) {
        const newImg = input as ImageSourcePropType;
        if (!target) {
          updatedEntry = {
            id: String(Date.now()),
            name: "새로운 OOTD",
            image: newImg,
            ootdImage: slotForNewImage === "ootd" ? newImg : newImg,
            fullShotImage: slotForNewImage === "fullShot" ? newImg : undefined,
          };
        } else {
          if (slotForNewImage === "ootd") {
            updatedEntry = { ...target, image: newImg, ootdImage: newImg };
          } else {
            updatedEntry = {
              ...target,
              image: newImg,
              fullShotImage: newImg,
            };
          }
        }
      } else if (!target) {
        updatedEntry = {
          id: String(Date.now()),
          name: "새로운 OOTD",
          image: input as ImageSourcePropType,
          ootdImage: input as ImageSourcePropType,
        };
      } else {
        let newImg: ImageSourcePropType;
        if (input === "ootd") newImg = target.ootdImage;
        else if (input === "fullShot") newImg = target.fullShotImage || target.ootdImage;
        else newImg = input as ImageSourcePropType;
        // LoadOotd에서 이미지 선택 시 ootd 슬롯에도 반영해 선택 상태/체크 아이콘이 올바르게 표시되도록 함
        const isExternalImage = input !== "ootd" && input !== "fullShot";
        updatedEntry = {
          ...target,
          image: newImg,
          ootdImage: isExternalImage ? newImg : target.ootdImage,
        };
      }

      const updatedList = { ...prev, [dateRaw]: updatedEntry };
      setTimeout(() => setSelectedOotdData(updatedEntry), 0);
      return updatedList;
    });
  };

  const handleDeleteImage = (type: "ootd" | "fullShot") => {
    const dateRaw = selectedDateInfo.raw;
    if (!dateRaw) return;

    setOotdListData((prev: any) => {
      const target = prev[dateRaw];
      if (!target) return prev;

      let updatedList = { ...prev };
      let newSelectedData = null;

      if (type === "ootd") {
        // 주인이 삭제되면 전체 삭제 + 달력 날짜-OOTD 연결 해제 (OOTD 생성으로 등록한 것도 삭제 반영)
        removeOotdForDate(dateRaw);
        delete updatedList[dateRaw];
        newSelectedData = null;
      } else {
        // 전신사진만 삭제
        const newTarget = {
          ...target,
          fullShotImage: null,
          image: target.ootdImage || target.image,
        };
        updatedList[dateRaw] = newTarget;
        newSelectedData = newTarget;
      }

      setTimeout(() => setSelectedOotdData(newSelectedData), 0);
      return updatedList;
    });
  };

  return (
    <View style={styles.container}>
      <CalendarTop />

      <View style={styles.fixedContent}>
        {/* 월 선택 및 저장 버튼 영역 */}
        <View style={styles.monthSelectorRow}>
          <View style={styles.arrowControls}>
            <Pressable
              hitSlop={10}
              onPress={() =>
                setCurrentDate((p) =>
                  p.month === 1 ? { year: p.year - 1, month: 12 } : { ...p, month: p.month - 1 },
                )
              }
            >
              <UndoIcon width={16} height={16} />
            </Pressable>
            <Pressable onPress={() => setDatePickerVisible(true)}>
              <Text style={styles.currentMonthText}>
                {currentDate.year}년 {currentDate.month}월
              </Text>
            </Pressable>
            <Pressable
              hitSlop={10}
              onPress={() =>
                setCurrentDate((p) =>
                  p.month === 12 ? { year: p.year + 1, month: 1 } : { ...p, month: p.month + 1 },
                )
              }
            >
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                <UndoIcon width={16} height={16} />
              </View>
            </Pressable>
          </View>
          <CalsaveSemishortButton onPress={() => setSaveModalVisible(true)} isActive={true} />
        </View>

        {/* 달력 본체 */}
        <Calendar
          year={currentDate.year}
          month={currentDate.month}
          onOpenOOTD={handleOpenOOTD}
          ootdListData={mergedOotdListData}
        />
      </View>

      {/* 오늘의 OOTD 상세 모달 */}
      <TodayOotdModal
        visible={ootdModalVisible}
        onClose={() => setOotdModalVisible(false)}
        date={selectedDateInfo.formatted}
        rawDate={selectedDateInfo.raw}
        ootdData={selectedOotdData}
        onPrev={() => handleMoveDate("prev")}
        onNext={() => handleMoveDate("next")}
        onSelectMainImage={handleUpdateMainImage}
        onDeleteImage={handleDeleteImage} // 삭제 로직 연결
      />

      {/* 날짜 선택기, 전체 저장 */}
      <DateScroll
        visible={datePickerVisible}
        currentYear={currentDate.year}
        currentMonth={currentDate.month}
        onClose={(y, m) => {
          if (y && m) setCurrentDate({ year: y, month: m });
          setDatePickerVisible(false);
        }}
      />

      <CalendarSave
        visible={saveModalVisible}
        onClose={() => setSaveModalVisible(false)}
        year={currentDate.year}
        month={currentDate.month}
        ootdListData={mergedOotdListData}
      />
    </View>
  );
}
