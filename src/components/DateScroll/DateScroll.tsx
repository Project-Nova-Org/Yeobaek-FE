import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import { dateStyles } from "./DateScroll.styles";
import { PickerIcon } from "@/assets/icons";

const ITEM_HEIGHT = 40;
const YEARS = Array.from({ length: 20 }, (_, i) => 2015 + i); // 2015 ~ 2034
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

interface DateScrollProps {
  visible: boolean;
  onClose: (year: number, month: number) => void;
  currentYear?: number;
  currentMonth?: number;
}

const DateScroll = ({
  visible,
  onClose,
  currentYear = 2025,
  currentMonth = 6,
}: DateScrollProps) => {
  const getClampedIndex = (value: number, array: number[], label: string) => {
    const index = array.indexOf(value);
    if (index !== -1) return index;

    const minVal = array[0];
    const maxVal = array[array.length - 1];
    const clampedIndex = value < minVal ? 0 : array.length - 1;

    console.warn(
      `[DateScroll] Invalid ${label}: ${value}. ` +
        `Valid range is ${minVal}-${maxVal}. Clamping to ${array[clampedIndex]}.`,
    );
    return clampedIndex;
  };

  const initialYearIndex = getClampedIndex(currentYear, YEARS, "year");
  const initialMonthIndex = getClampedIndex(currentMonth, MONTHS, "month");

  // 보정된 초기값으로 상태 설정
  const [year, setYear] = useState(YEARS[initialYearIndex]);
  const [month, setMonth] = useState(MONTHS[initialMonthIndex]);

  // 런타임 Prop 변경 감시 (선택 사항)
  useEffect(() => {
    if (visible) {
      setYear(YEARS[initialYearIndex]);
      setMonth(MONTHS[initialMonthIndex]);
    }
  }, [visible, currentYear, currentMonth]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>, type: "year" | "month") => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);

    if (type === "year") {
      if (YEARS[index]) setYear(YEARS[index]);
    } else {
      if (MONTHS[index]) setMonth(MONTHS[index]);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={dateStyles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => onClose(year, month)} />

        <View style={dateStyles.container}>
          <View style={dateStyles.indicatorContainer} pointerEvents="none">
            <PickerIcon width={12} height={12} />
            <PickerIcon width={12} height={12} style={{ transform: [{ rotate: "180deg" }] }} />
          </View>

          <View style={dateStyles.pickerContent}>
            <View style={dateStyles.scrollWrapper}>
              <FlatList
                data={YEARS}
                keyExtractor={(item) => `y-${item}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={(e) => handleScroll(e, "year")}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                initialScrollIndex={initialYearIndex}
                contentContainerStyle={{ paddingVertical: (211 - ITEM_HEIGHT) / 2 }}
                renderItem={({ item }) => (
                  <Text style={[dateStyles.itemText, item === year && dateStyles.selectedItemText]}>
                    {item}
                  </Text>
                )}
              />
            </View>

            <View style={dateStyles.scrollWrapper}>
              <FlatList
                data={MONTHS}
                keyExtractor={(item) => `m-${item}`}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={(e) => handleScroll(e, "month")}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                initialScrollIndex={initialMonthIndex}
                contentContainerStyle={{ paddingVertical: (211 - ITEM_HEIGHT) / 2 }}
                renderItem={({ item }) => (
                  <Text
                    style={[dateStyles.itemText, item === month && dateStyles.selectedItemText]}
                  >
                    {item}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateScroll;
