import React from "react";
import { View, Pressable, Image } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { calendarStyles as styles } from "./Calendar.styles";
import { getCalendarDays } from "./CalendarData";
import { FlipIcon } from "@/assets/icons";
import { OotdListData } from "./CalendarData";

interface CalendarProps {
  year: number;
  month: number;
  onOpenOOTD: (date: string) => void;
  ootdListData: OotdListData;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar({ year, month, onOpenOOTD, ootdListData }: CalendarProps) {
  const days = getCalendarDays(year, month);
  const todayOnlyDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );

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

          const ootdData = ootdListData[dateString];
          const hasOotd = !!ootdData;
          const isFuture = new Date(item.year, item.month - 1, item.day) > todayOnlyDate;
          const canPress = item.isCurrentMonth && (!isFuture || hasOotd);

          return (
            <Pressable
              key={`${dateString}-${index}`}
              style={styles.dateCell}
              onPress={() => {
                if (canPress) onOpenOOTD(dateString);
              }}
              disabled={!canPress}
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
