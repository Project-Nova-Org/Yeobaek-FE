import React from "react";
import { View, Image } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { FirstLogoIcon } from "@/assets/icons";
import { getCalendarDays, OotdListData } from "@/components/Calendar/CalendarData";
import { captureCardStyles as styles } from "./CalendarCaptureCard.styles";
import { Colors } from "@/theme/colors.ts";

interface CaptureCardProps {
  year: number;
  month: number;
  selectedBg: BgItem;
  ootdListData: OotdListData;
}

export type BgItem = string | { thumb: any; bg: any; isGrad?: boolean; isLight?: boolean };

export function CalendarCaptureCard({ year, month, selectedBg, ootdListData }: CaptureCardProps) {
  const days = getCalendarDays(year, month);

  const isImageObj = typeof selectedBg === "object" && selectedBg !== null && "bg" in selectedBg;
  const currentBgColor = isImageObj ? "transparent" : (selectedBg as string);
  const currentBgSource = isImageObj ? selectedBg.bg : null;

  const isDark = (() => {
    if (isImageObj) {
      if (selectedBg.isGrad) return true;
      return !selectedBg.isLight;
    }
    return [Colors.primary, Colors.black, Colors.cherry, Colors.oat].includes(selectedBg);
  })();

  const isFooterDark = (() => {
    if (isImageObj) {
      if (selectedBg.isGrad) return false;
      return !selectedBg.isLight;
    }
    return [Colors.primary, Colors.black, Colors.cherry, Colors.oat].includes(selectedBg);
  })();

  const contentColor = isDark ? Colors.white : Colors.black;
  const footerTextColor = isFooterDark ? Colors.white : Colors.black;

  return (
    <View style={[styles.cardContainer, { backgroundColor: currentBgColor }]}>
      {currentBgSource && (
        <Image source={currentBgSource} style={styles.backgroundImage} resizeMode="cover" />
      )}

      <View style={styles.header}>
        <Text style={[styles.monthText, { color: contentColor }]}>
          {month}月 {year}
        </Text>
      </View>

      <View style={styles.whiteCalendarBoard}>
        <View style={styles.gridContainer}>
          {days.map((item, index) => {
            const dateString = `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`;
            const ootdData = ootdListData?.[dateString];

            if (!item.isCurrentMonth) {
              return <View key={index} style={styles.dateCell} />;
            }

            return (
              <View key={index} style={styles.dateCell}>
                <View style={styles.dateNumberOverlay}>
                  <Text
                    style={[
                      styles.dateText,
                      !ootdData && { color: Colors.black },
                      index % 7 === 0 && { color: Colors.sunday },
                      index % 7 === 6 && { color: Colors.saturday },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
                <View style={styles.imageWrapper}>
                  {ootdData?.image ? (
                    <Image source={ootdData.image} style={styles.ootdImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.emptyFill} />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { color: footerTextColor }]}>여백 : 餘白</Text>
        <FirstLogoIcon width={16} height={16} color={footerTextColor} />
      </View>
    </View>
  );
}
