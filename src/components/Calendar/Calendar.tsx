import React from "react";
import { View, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { calendarStyles as styles } from "./Calendar.styles";
import { getCalendarDays, MOCK_OOTD_DATA } from "./CalendarData";

interface CalendarProps {
  year: number;
  month: number;
  onOpenOOTD: (date: string) => void;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar({ year, month, onOpenOOTD }: CalendarProps) {
  const days = getCalendarDays(year, month);
  const today = new Date();
  const isTodayMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  return (
    <View style={styles.container}>
      {/* 요일 헤더 */}
      <View style={styles.weekRow}>
        {DAYS.map((day, i) => (
          <Text
            key={day}
            style={[styles.weekText, i === 0 && styles.sunday, i === 6 && styles.saturday]}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* 날짜 그리드 */}
      <View style={styles.dateGrid}>
        {days.map((item, index) => {
          const dateString = `${year}-${String(month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`;
          const hasOotd = !!MOCK_OOTD_DATA[dateString];
          const isFuture = isTodayMonth && item.day > today.getDate(); // 미래 여부

          return (
            <Pressable
              key={index}
              style={[
                styles.dateCell,
                item.isCurrentMonth && !hasOotd && !isFuture && styles.unregisteredCell, // 포스트잇 스타일
              ]}
              onPress={() => {
                if (item.isCurrentMonth && !isFuture) onOpenOOTD(dateString);
              }}
              disabled={!item.isCurrentMonth || isFuture}
            >
              <Text
                style={[
                  styles.dateText,
                  !item.isCurrentMonth && styles.otherMonthText,
                  isFuture && styles.futureText,
                  index % 7 === 0 && styles.sunday,
                  index % 7 === 6 && styles.saturday,
                ]}
              >
                {item.isCurrentMonth ? item.day : ""}
              </Text>

              {item.isCurrentMonth && hasOotd && (
                <View style={styles.imageWrapper}>
                  {/* OOTD 이미지가 있을 경우 영역 */}
                  <View style={styles.placeholderImg} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
