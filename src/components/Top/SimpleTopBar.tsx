import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileIcon } from "@/assets/icons";
import { Colors } from "@/theme/colors.ts";
import { AppText } from "@/components/common/AppText";
import { FontSize } from "@/theme/typography.ts";
import { RootStackParamList } from "@/types/navigation/RootStackParamList";

export interface SimpleTopBarProps {
  title: string;
}

export function SimpleTopBar({ title }: SimpleTopBarProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <Pressable onPress={() => navigation.navigate("MypageStack")}>
        <ProfileIcon width={27} height={27} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingLeft: 17,
    paddingRight: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "900",
    color: Colors.primary,
  },
});
