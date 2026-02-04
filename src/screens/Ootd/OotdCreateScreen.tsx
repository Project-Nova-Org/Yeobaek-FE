import { useState, useCallback } from "react";
import { View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";

import { OotdBottomSheet } from "@/components/Ootd/OotdBottomSheet.tsx";
import { OotdCanvas } from "@/components/Ootd/OotdCanvas";
import { OotdCreateHeader } from "@/components/Ootd/OotdCreateHeader";
import { styles } from "./OotdCreateScreen.styles";
import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import type { OotdCanvasItem, OotdItemTransform } from "@/types/ootd";
import { DEFAULT_ITEM_TRANSFORM } from "@/types/ootd";

import type { Item } from "@/mocks/items";
import type { ClosetItem } from "@/screens/Dressroom/dressroom.mock";

const DEFAULT_CANVAS_SIZE = { width: 360, height: 360 };

type Props = {
  navigation: StackNavigationProp<OotdStackParamList, "OotdCreate">;
  route: RouteProp<OotdStackParamList, "OotdCreate">;
};

export default function OotdCreateScreen({ navigation, route }: Props) {
  const params = route.params;
  const initialItems = params?.canvasItems ?? [];
  const initialSize = params?.canvasSize ?? DEFAULT_CANVAS_SIZE;

  const [sheetIndex, setSheetIndex] = useState<number>(1);
  const [tab, setTab] = useState<"아이템" | "옷장">("아이템");
  const [category, setCategory] = useState("상의");
  const [detail, setDetail] = useState<string | null>(null);
  const [selectedWardrobeId, setSelectedWardrobeId] = useState<number | null>(null);

  const [canvasItems, setCanvasItems] = useState<OotdCanvasItem[]>(initialItems);
  const [selectedCanvasKey, setSelectedCanvasKey] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState(initialSize);
  const isEditCanvas = !!params;

  const canvasGestureEnabled = true;

  const handleSheetIndexChange = useCallback((index: number) => {
    setSheetIndex(Math.max(0, index));
  }, []);

  const handleSelectWardrobe = useCallback((wardrobe: ClosetItem) => {
    setSelectedWardrobeId((prev) => (prev === wardrobe.id ? null : wardrobe.id));
  }, []);

  const handleToggleItem = useCallback((item: Item) => {
    setCanvasItems((prev) => {
      const existing = prev.find((p) => p.key.startsWith(`${item.id}-`));
      if (existing) return prev.filter((p) => p.key !== existing.key);
      return [
        ...prev,
        {
          key: `${item.id}-${Date.now()}`,
          image: item.image,
          transform: { ...DEFAULT_ITEM_TRANSFORM },
        },
      ];
    });
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setCanvasItems((prev) => prev.filter((v) => v.key !== key));
    setSelectedCanvasKey((prev) => (prev === key ? null : prev));
  }, []);

  const handleTransformChange = useCallback((key: string, transform: OotdItemTransform) => {
    setCanvasItems((prev) =>
      prev.map((it) => (it.key === key ? { ...it, transform } : it))
    );
  }, []);

  return (
    <View style={styles.container}>
      <OotdCreateHeader
        title={isEditCanvas ? "OOTD 수정" : "OOTD 등록"}
        disabled={canvasItems.length < 2}
        onBack={() => navigation.goBack()}
        onNext={() => {
          if (canvasItems.length < 2) return;
          const payload = {
            canvasItems,
            canvasSize,
            editOotdId: params?.editOotdId,
            calendarDate: params?.calendarDate,
          };
          const serializable = JSON.parse(
            JSON.stringify(payload)
          ) as typeof payload;
          navigation.navigate("OotdCreateInfo", serializable);
        }}
      />

      <View
        style={{ flex: 1 }}
        onLayout={(e) => {
          if (isEditCanvas) return;
          const { width, height } = e.nativeEvent.layout;
          if (width > 0 && height > 0) setCanvasSize({ width, height });
        }}
      >
        <OotdCanvas
          items={canvasItems}
          onRemove={handleRemoveItem}
          onTransformChange={handleTransformChange}
          editable={canvasGestureEnabled}
          selectedKey={selectedCanvasKey}
          onSelect={setSelectedCanvasKey}
          onClearSelection={() => setSelectedCanvasKey(null)}
        />
      </View>

      <OotdBottomSheet
        index={sheetIndex}
        tab={tab}
        onTabChange={setTab}
        category={category}
        detail={detail}
        onCategoryChange={setCategory}
        onDetailChange={setDetail}
        onSelectItem={handleToggleItem}
        onIndexChange={handleSheetIndexChange}
        selectedItems={canvasItems.map((item) => item.key)}
        selectedWardrobeId={selectedWardrobeId}
        onSelectWardrobe={handleSelectWardrobe}
      />
    </View>
  );
}
