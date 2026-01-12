import { SafeAreaView, ScrollView } from "react-native";
import ButtonScroll from "@/components/ButtonScroll/ButtonScroll";

export default function DressroomScreen() {
  return (
        <ScrollView style={{ flex: 1 }}>
          {/* 🔹 카테고리 필터 테스트 */}
          <ButtonScroll />
        </ScrollView>
  );
}
