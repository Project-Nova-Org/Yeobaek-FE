import React, { useState } from "react";
import { View, ScrollView, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText as Text } from "@/components/common/AppText";
import { UndoIcon, UserIcon, PenIcon, RobotIcon } from "@/assets/icons"; // 아이콘 임포트
import { helpScreenStyles as styles } from "./HelpScreen.styles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Help">;

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface HelpItem {
  id: number;
  title: string;
  Icon: React.ElementType;
  content: React.ReactNode;
}

const HelpScreen = ({ navigation }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const helpData: HelpItem[] = [
    {
      id: 1,
      title: "계정 관리",
      Icon: UserIcon,
      content: (
        <View>
          <Text style={styles.subTitle}>• 로그아웃</Text>
          <Text style={styles.description}>우측 위 마이페이지 아이콘 {">"} 하단 로그아웃</Text>
          <Text style={[styles.subTitle]}>• 계정 삭제</Text>
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
      content: <Text style={styles.description}>배경 제거 기능에 대한 상세 설명입니다.</Text>,
    },
    {
      id: 3,
      title: "퍼스널 페어링",
      Icon: RobotIcon,
      content: <Text style={styles.description}>AI 추천 및 피팅 기능에 대한 설명입니다.</Text>,
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

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="도움말"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {helpData.map((item) => (
          <View key={item.id} style={styles.itemWrapper}>
            <Pressable
              style={[styles.headerRow, expandedId === item.id && styles.headerRowActive]}
              onPress={() => toggleExpand(item.id)}
            >
              <View style={styles.titleGroup}>
                <item.Icon width={20} height={20} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>

              <View
                style={{ transform: [{ rotate: expandedId === item.id ? "90deg" : "270deg" }] }}
              >
                <UndoIcon width={12} height={12} />
              </View>
            </Pressable>

            {expandedId === item.id && <View style={styles.contentBox}>{item.content}</View>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HelpScreen;
