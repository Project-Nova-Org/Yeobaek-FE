import React, { useState } from "react";
import { View, ScrollView, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText as Text } from "@/components/common/AppText";
import { UndoIcon } from "@/assets/icons";
import { helpScreenStyles as styles } from "./HelpScreen.styles";
import { HELP_DATA } from "./MypageData";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/screens/Test/TestPlace";

type Props = NativeStackScreenProps<RootStackParamList, "Help">;

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpScreen = ({ navigation }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="도움말"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {HELP_DATA.map((item) => (
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
