import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { View } from "react-native";

import { ItemClosetTabs } from "./ItemClosetTabs";
import { CategoryTabs } from "./CategoryTabs";
import { ItemGrid } from "./ItemGrid";
import { WardrobeGrid } from "./WardrobeGrid";
import { WardrobeScroll } from "./WardrobeScroll";
import { styles as bottomSheetStyles } from "./OotdBottomSheet.styles";
import { type ClosetItem } from "@/screens/Dressroom/dressroom.mock";

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

    // 옷장 관련
    selectedWardrobeId: number | null;
    onSelectWardrobe: (wardrobe: ClosetItem) => void;
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
    selectedWardrobeId,
    onSelectWardrobe,
}: Props) {
    const snapPoints = useMemo(() => ["18%", "58%", "88%"], []);

    // 옷장이 선택되었는지 확인
    const hasSelectedWardrobe = selectedWardrobeId !== null;

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

                {tab === "옷장" ? (
                    <>
                        {hasSelectedWardrobe ? (
                            <>
                                <WardrobeScroll
                                    selectedWardrobeId={selectedWardrobeId}
                                    onSelectWardrobe={onSelectWardrobe}
                                />
                                <View style={bottomSheetStyles.wardrobeContentWrapper}>
                                    <CategoryTabs
                                        category={category}
                                        detail={detail}
                                        onCategoryChange={onCategoryChange}
                                        onDetailChange={onDetailChange}
                                        isWardrobeTab={true}
                                    />
                                    <ItemGrid
                                        category={category}
                                        detail={detail}
                                        selectedItems={selectedItems}
                                        onSelect={onSelectItem}
                                        selectedWardrobeId={selectedWardrobeId}
                                    />
                                </View>
                            </>
                        ) : (
                            <WardrobeGrid
                                selectedWardrobeId={selectedWardrobeId}
                                onSelectWardrobe={onSelectWardrobe}
                            />
                        )}
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
}