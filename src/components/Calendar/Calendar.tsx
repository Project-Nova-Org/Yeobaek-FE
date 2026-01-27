import React from "react";
import { View, Pressable, Image } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { calendarStyles as styles } from "./Calendar.styles";
import { getCalendarDays, MOCK_OOTD_DATA } from "./CalendarData";
import { FlipIcon } from "@/assets/icons";

interface CalendarProps {
  year: number;
  month: number;
  onOpenOOTD: (date: string) => void;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar({ year, month, onOpenOOTD }: CalendarProps) {
  const days = getCalendarDays(year, month);
  const today = new Date();
  // 시간 정보를 제외한 오늘 날짜 객체 생성
  const todayOnlyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <View style={styles.container}>
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

      <View style={styles.dateGrid}>
        {days.map((item, index) => {
          const dateString = `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`;
          const ootdData = MOCK_OOTD_DATA[dateString];
          const hasOotd = !!ootdData;

          // 오늘 날짜와 비교 로직
          const cellDate = new Date(item.year, item.month - 1, item.day);
          const isFuture = cellDate > todayOnlyDate;

          // 클릭 가능 조건: 현재 달이면서 오늘 포함 과거인 날짜만
          const canPress = item.isCurrentMonth && !isFuture;

          return (
            <Pressable
              key={`${dateString}-${index}`}
              style={styles.dateCell}
              onPress={() => {
                if (canPress) onOpenOOTD(dateString);
              }}
              disabled={!canPress} // 이전 달, 다음 달, 미래 날짜 클릭 차단
            >
              <View style={styles.dateNumberOverlay}>
                <Text
                  style={[
                    styles.dateText,
                    !item.isCurrentMonth && { opacity: 0.5 },
                    isFuture && styles.futureText,
                    index % 7 === 0 && styles.sunday,
                    index % 7 === 6 && styles.saturday,
                  ]}
                >
                  {item.day}
                </Text>
              </View>

              <View style={styles.contentArea}>
                <View style={styles.itemWrapper}>
                  {hasOotd ? (
                    <Image
                      source={ootdData.image}
                      style={[styles.ootdImage, !item.isCurrentMonth && { opacity: 0.5 }]}
                      resizeMode="cover"
                    />
                  ) : (
                    // 현재 달의 과거/오늘 날짜만 포스트잇 표시
                    item.isCurrentMonth && !isFuture && <FlipIcon width="100%" height="100%" />
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
