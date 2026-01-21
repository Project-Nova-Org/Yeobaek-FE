import { useState, useCallback } from "react";
import { View } from "react-native";

import { OotdBottomSheet } from "@/components/Ootd/OotdBottomSheet.tsx";
import { OotdCanvas } from "@/components/Ootd/OotdCanvas";
import { OotdCreateHeader } from "@/components/Ootd/OotdCreateHeader";
import { styles } from "./OotdCreateScreen.styles";

import type { Item } from "@/mocks/items";
import type { ClosetItem } from "@/screens/Dressroom/dressroom.mock";

export default function OotdCreateScreen() {
    /** ===== BottomSheet 상태 ===== */
    // 0~2 : 최소(18%) ~ 완전 펼침(88%)
    const [sheetIndex, setSheetIndex] = useState<number>(1);

    /** ===== BottomSheet index 변경 핸들러 ===== */
    const handleSheetIndexChange = useCallback((index: number) => {
        // 최소 0 (18%) 유지
        const minIndex = 0;
        setSheetIndex(Math.max(minIndex, index));
    }, []);

    /** ===== 탭 / 필터 ===== */
    const [tab, setTab] = useState<"아이템" | "옷장">("아이템");
    const [category, setCategory] = useState("상의");
    const [detail, setDetail] = useState<string | null>(null);

    /** ===== 옷장 선택 ===== */
    const [selectedWardrobeId, setSelectedWardrobeId] = useState<number | null>(null);

    /** ===== 옷장 선택 ===== */
    const handleSelectWardrobe = useCallback((wardrobe: ClosetItem) => {
        setSelectedWardrobeId((prev) => {
            // 이미 선택된 옷장을 다시 클릭하면 해제
            if (prev === wardrobe.id) {
                return null;
            }
            // 다른 옷장 선택
            return wardrobe.id;
        });
    }, []);

    /** ===== Canvas 아이템 ===== */
    const [canvasItems, setCanvasItems] = useState<
        { key: string; image: any }[]
    >([]);
    const [selectedCanvasKey, setSelectedCanvasKey] = useState<string | null>(null);

    /** ===== Canvas 제스처 활성 여부 ===== */
    // 항상 편집 가능
    const canvasGestureEnabled = true;

    /** ===== 아이템 토글 (선택/해제) ===== */
    const handleToggleItem = useCallback((item: Item) => {
        setCanvasItems((prev) => {
            const existing = prev.find((p) => p.key.startsWith(`${item.id}-`));
            if (existing) {
                return prev.filter((p) => p.key !== existing.key);
            }
            return [
                ...prev,
                {
                    key: `${item.id}-${Date.now()}`,
                    image: item.image,
                },
            ];
        });
    }, []);

    /** ===== 아이템 제거 ===== */
    const handleRemoveItem = useCallback((key: string) => {
        setCanvasItems((prev) => prev.filter((v) => v.key !== key));
        setSelectedCanvasKey((prev) => (prev === key ? null : prev));
    }, []);

    return (
        <View style={styles.container}>
            {/* 상단 헤더 */}
            <OotdCreateHeader
                title="OOTD 등록"
                disabled={canvasItems.length < 2}
                onBack={() => {}}
                onNext={() => {}}
            />

            {/* 캔버스 */}
            <OotdCanvas
                items={canvasItems}
                onRemove={handleRemoveItem}
                editable={canvasGestureEnabled}
                selectedKey={selectedCanvasKey}
                onSelect={setSelectedCanvasKey}
                onClearSelection={() => setSelectedCanvasKey(null)}
            />

            {/* BottomSheet */}
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
