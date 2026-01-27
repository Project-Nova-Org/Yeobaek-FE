import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { Calendar } from "@/components/Calendar/Calendar";
import { CalendarSave } from "@/components/Modal/CalendarSave/CalendarSave";
import CalsaveSemishortButton from "@/components/Buttons/semishort_button/CalsaveSemishortButton";
import DateScroll from "@/components/DateScroll/DateScroll";
import { UndoIcon } from "@/assets/icons";
import { calendarScreenStyles as styles } from "./CalendarScreen.styles";
import { CalendarTop } from "@/components/Top/CalendarTop.tsx";

export function CalendarScreen() {
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false); // 날짜 모달 상태
  const [currentDate, setCurrentDate] = useState({ year: 2024, month: 10 });

  // 이전 달 이동
  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 1) return { year: prev.year - 1, month: 12 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  // 다음 달 이동
  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 12) return { year: prev.year + 1, month: 1 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  // DateScroll에서 날짜 선택 시 호출되는 함수
  const handleDateSelect = (year: number, month: number) => {
    setCurrentDate({ year, month });
    setDatePickerVisible(false); // 선택 후 모달 닫기
  };

  const isButtonActive = true;

  return (
    <View style={styles.container}>
      <CalendarTop />
      <View style={styles.fixedContent}>
        <View style={styles.monthSelectorRow}>
          <View style={styles.arrowControls}>
            <Pressable hitSlop={10} onPress={handlePrevMonth}>
              <UndoIcon width={16} height={16} />
            </Pressable>
            <Pressable onPress={() => setDatePickerVisible(true)}>
              <Text style={styles.currentMonthText}>
                {currentDate.year}년 {currentDate.month}월
              </Text>
            </Pressable>

            <Pressable hitSlop={10} onPress={handleNextMonth}>
              <View style={styles.rotateIcon}>
                <UndoIcon width={16} height={16} />
              </View>
            </Pressable>
          </View>

          <CalsaveSemishortButton
            onPress={() => isButtonActive && setSaveModalVisible(true)}
            isActive={isButtonActive}
          />
        </View>
        <Calendar
          year={currentDate.year}
          month={currentDate.month}
          onOpenOOTD={(date) => console.log(`${date} 클릭`)}
        />
      </View>
      <DateScroll
        visible={datePickerVisible}
        currentYear={currentDate.year}
        currentMonth={currentDate.month}
        onClose={handleDateSelect}
      />

      <CalendarSave
        visible={saveModalVisible}
        onClose={() => setSaveModalVisible(false)}
        year={currentDate.year}
        month={currentDate.month}
      />
    </View>
  );
}
