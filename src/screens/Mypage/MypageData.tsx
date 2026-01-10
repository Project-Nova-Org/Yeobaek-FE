import React from "react";
import { View, Pressable } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { UserIcon, PenIcon, RobotIcon } from "@/assets/icons";
import { helpScreenStyles as styles } from "./HelpScreen.styles";

export interface HelpItem {
  id: number;
  title: string;
  Icon: React.ElementType;
  content: React.ReactNode;
}

export const HELP_DATA: HelpItem[] = [
  {
    id: 1,
    title: "계정 관리",
    Icon: UserIcon,
    content: (
      <View>
        <Text style={styles.subTitle}>• 로그아웃</Text>
        <Text style={styles.description}>우측 위 마이페이지 아이콘 {">"} 하단 로그아웃</Text>
        <Text style={styles.subTitle}>• 계정 삭제</Text>
        <Pressable onPress={() => console.log("계정 삭제하기 클릭")}>
          <Text style={styles.linkText}>계정 삭제하기</Text>
        </Pressable>
      </View>
    ),
  },
  {
    id: 2,
    title: "배경 제거",
    Icon: PenIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
  {
    id: 3,
    title: "퍼스널 페어링",
    Icon: RobotIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
  {
    id: 4,
    title: "드레스룸",
    Icon: UserIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
  {
    id: 5,
    title: "OOTD",
    Icon: UserIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
  {
    id: 6,
    title: "통계",
    Icon: UserIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
  {
    id: 7,
    title: "AI 코디추천",
    Icon: UserIcon,
    content: <Text style={styles.description}>상세 내용...</Text>,
  },
];

export const INITIAL_USER_DATA = {
  email: "yeobeak@gachon.ac.kr",
  provider: "kakao",
  itemCount: 45,
  nickname: "동르반 99세",
};
