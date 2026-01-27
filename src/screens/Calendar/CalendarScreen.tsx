import React, { useState } from "react";
import { View, ScrollView, Pressable, SafeAreaView } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { Calendar } from "@/components/Calendar/Calendar";
import { CalendarSave } from "@/components/Modal/CalendarSave/CalendarSave";
import CalsaveSemishortButton from "@/components/Buttons/semishort_button/CalsaveSemishortButton";
import { UndoIcon, UserIcon } from "@/assets/icons";
import { calendarScreenStyles as styles } from "./CalendarScreen.styles";

export function CalendarScreen() {
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState({ year: 2024, month: 10 });

  // 예시: 월말이거나 특정 조건일 때 버튼 활성화
  const isButtonActive = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>달력</Text>
          <UserIcon width={24} height={24} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.monthSelectorRow}>
            <View style={styles.arrowControls}>
              <UndoIcon width={20} height={20} />
              <Text style={styles.currentMonthText}>
                {currentDate.year}년 {currentDate.month}월
              </Text>
              <UndoIcon width={20} height={20} />
            </View>

            <CalsaveSemishortButton
              onPress={() => isButtonActive && setSaveModalVisible(true)}
              isActive={isButtonActive}
            />
          </View>

          <Calendar year={currentDate.year} month={currentDate.month} onOpenOOTD={() => {}} />
        </ScrollView>

        <CalendarSave
          visible={saveModalVisible}
          onClose={() => setSaveModalVisible(false)}
          year={currentDate.year}
          month={currentDate.month}
        />
      </View>
    </SafeAreaView>
  );
}
