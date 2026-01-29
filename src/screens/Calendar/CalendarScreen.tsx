import React, { useState, useCallback } from "react";
import { View, Pressable } from "react-native";
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

export function CalendarScreen() {
  const [ootdListData, setOotdListData] = useState(MOCK_OOTD_DATA);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [ootdModalVisible, setOotdModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState({ year: 2024, month: 10 });

  const [selectedDateInfo, setSelectedDateInfo] = useState({ formatted: "", raw: "" });
  const [selectedOotdData, setSelectedOotdData] = useState<any>(null);

  const updateModalData = useCallback(
    (dateStr: string) => {
      const parts = dateStr.split("-").map(Number);
      if (parts.length !== 3) return;

      setSelectedDateInfo({
        formatted: `${parts[0]}년 ${parts[1]}월 ${parts[2]}일`,
        raw: dateStr,
      });

      // 상태에서 직접 조회하여 모달 데이터 동기화
      const data = ootdListData[dateStr] || null;
      setSelectedOotdData(data);
    },
    [ootdListData],
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

    updateModalData(newDateStr);
  };

  const handleOpenOOTD = useCallback(
    (dateStr: string) => {
      updateModalData(dateStr);
      setOotdModalVisible(true);
    },
    [updateModalData],
  );

  const handleUpdateMainImage = (input: any) => {
    const dateRaw = selectedDateInfo.raw;
    if (!dateRaw) return;

    setOotdListData((prev: any) => {
      const target = prev[dateRaw];

      // 해당 날짜에 데이터가 아예 없는 경우 (새로 생성)
      if (!target) {
        const newData = {
          id: String(Date.now()),
          name: "새로운 OOTD",
          image: input, // 불러온 이미지
          ootdImage: input, // 기본 OOTD 이미지로도 설정
        };
        const updated = { ...prev, [dateRaw]: newData };
        setSelectedOotdData(updated[dateRaw]); // 모달 데이터 동기화
        return updated;
      }

      // 데이터가 있는 경우 (이미지 스위칭 또는 교체)
      let newImg;
      if (input === "ootd") {
        newImg = target.ootdImage;
      } else if (input === "fullShot") {
        newImg = target.fullShotImage;
      } else {
        newImg = input;
      }

      if (!newImg) return prev;

      const updated = {
        ...prev,
        [dateRaw]: { ...target, image: newImg },
      };

      setSelectedOotdData(updated[dateRaw]); // 모달 데이터 동기화
      return updated;
    });
  };

  const handleDeleteImage = (type: "ootd" | "fullShot") => {
    const dateRaw = selectedDateInfo.raw;

    setOotdListData((prev: any) => {
      const target = prev[dateRaw];
      if (!target) return prev;

      let updatedData = { ...prev };

      if (type === "ootd") {
        // 주인이 삭제되면 종속된 데이터 모두 삭제
        delete updatedData[dateRaw];
        setSelectedOotdData(null);
      } else {
        // 전신사진만 삭제
        const newTarget = {
          ...target,
          fullShotImage: null,
          image: target.ootdImage || target.image, // 대표이미지가 전신이었다면 OOTD로 복구
        };
        updatedData[dateRaw] = newTarget;
        setSelectedOotdData(newTarget);
      }

      return { ...updatedData };
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
          ootdListData={ootdListData}
        />
      </View>

      {/* 오늘의 OOTD 상세 모달 */}
      <TodayOotdModal
        visible={ootdModalVisible}
        onClose={() => setOotdModalVisible(false)}
        date={selectedDateInfo.formatted}
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
        ootdListData={ootdListData}
      />
    </View>
  );
}
