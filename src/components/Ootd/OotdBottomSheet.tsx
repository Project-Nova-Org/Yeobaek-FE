import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo } from "react";

import { ItemClosetTabs } from "./ItemClosetTabs";
import { CategoryTabs } from "./CategoryTabs";
import { ItemGrid } from "./ItemGrid";
import { styles as bottomSheetStyles } from "./OotdBottomSheet.styles";

interface Props {
    tab: "아이템" | "옷장";
    onTabChange: (v: "아이템" | "옷장") => void;

    index?: number;
    category: string;
    detail: string | null;
    onCategoryChange: (c: string) => void;
    onDetailChange: (d: string | null) => void;

    onSelectItem: (item: any) => void;
    onIndexChange: (index: number) => void; // 부모 상태용
    selectedItems?: string[]; // 선택된 아이템의 key 배열
}

export function OotdBottomSheet({
    tab,
    onTabChange,
    index = 1,
    category,
    detail,
    onCategoryChange,
    onDetailChange,
    onSelectItem,
    onIndexChange,
    selectedItems = [],
}: Props) {
    const snapPoints = useMemo(() => ["18%", "58%", "88%"], []);

    return (
        <BottomSheet
            index={index}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            enableContentPanningGesture={false}
            onChange={(idx: number) => {
                // 최소 0 (18%) 유지
                const minIndex = 0;
                const safeIndex = Math.max(minIndex, idx);
                onIndexChange(safeIndex);
            }}
            backgroundStyle={bottomSheetStyles.background}
            handleIndicatorStyle={bottomSheetStyles.indicator}
        >
            <BottomSheetView style={bottomSheetStyles.content}>
                <ItemClosetTabs value={tab} onChange={onTabChange} />

                <CategoryTabs
                    category={category}
                    detail={detail}
                    onCategoryChange={onCategoryChange}
                    onDetailChange={onDetailChange}
                />

                <ItemGrid
                    category={category}
                    detail={detail}
                    selectedItems={selectedItems}
                    onSelect={onSelectItem}
                />
            </BottomSheetView>
        </BottomSheet>
    );
}