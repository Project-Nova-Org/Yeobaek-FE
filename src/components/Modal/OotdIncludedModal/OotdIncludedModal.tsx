import { Modal, View, Pressable, FlatList } from "react-native";
import { useMemo, useState } from "react";
import { styles } from "./OotdIncludedModal.styles";
import { AppText } from "@/components/common/AppText";

interface OotdItem {
    id: number;
    Icon: React.FC<{ width?: number; height?: number }>;
    label: string;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    items: OotdItem[];
}

/** ===== 고정 수치 (절대 건들지 말 것) ===== */
const PAGE_SIZE = 4;
const MODAL_WIDTH = 320;
const MODAL_PADDING = 16;

const GRID_PADDING = 16;
const GRID_GAP = 12;

const GRID_WIDTH = MODAL_WIDTH - GRID_PADDING * 2;
const CARD_SIZE = (GRID_WIDTH - GRID_GAP) / 2;
/** ====================================== */

function chunk<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}

export function OotdIncludedModal({ visible, onClose, items }: Props) {
    const pages = useMemo(() => chunk(items, PAGE_SIZE), [items]);
    const [page, setPage] = useState(0);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.modal, { width: MODAL_WIDTH }]}>
                    {/* ===== Header ===== */}
                    <View style={styles.header}>
                        <AppText style={styles.title}>아이템이 포함된 OOTD</AppText>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <AppText style={styles.closeText}>✕</AppText>
                        </Pressable>
                    </View>

                    {/* ===== Pager ===== */}
                    <FlatList
                        data={pages}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, i) => i.toString()}
                        onMomentumScrollEnd={(e) => {
                            const index = Math.round(
                                e.nativeEvent.contentOffset.x / MODAL_WIDTH
                            );
                            setPage(index);
                        }}
                        renderItem={({ item, index: pageIndex }) => (
                            <View style={[styles.page, { width: MODAL_WIDTH }]}>
                                <View style={styles.grid}>
                                    {item.map((it, idx) => {
                                        const isRight = idx % 2 === 1;
                                        return (
                                            <View
                                                key={`${it.id}-${idx}`}
                                                style={[
                                                    styles.card,
                                                    {
                                                        width: CARD_SIZE,
                                                        height: CARD_SIZE,
                                                    },
                                                    isRight && { marginRight: 0 },
                                                ]}
                                            >
                                                <it.Icon width={36} height={36} />
                                                <AppText style={styles.label}>{it.label}</AppText>
                                            </View>
                                        );
                                    })}

                                    {/* 빈칸 채우기 */}
                                    {item.length < 4 &&
                                        Array.from({ length: 4 - item.length }).map((_, i) => {
                                            const idx = item.length + i;
                                            const isRight = idx % 2 === 1;
                                            return (
                                                <View
                                                    key={`empty-${pageIndex}-${idx}`}
                                                    style={[
                                                        styles.card,
                                                        {
                                                            width: CARD_SIZE,
                                                            height: CARD_SIZE,
                                                            opacity: 0,
                                                        },
                                                        isRight && { marginRight: 0 },
                                                    ]}
                                                />
                                            );
                                        })}
                                </View>
                            </View>
                        )}
                    />

                    {/* ===== Indicator ===== */}
                    {pages.length > 1 && (
                        <View style={styles.indicator}>
                            {pages.map((_, i) => (
                                <View
                                    key={i}
                                    style={[styles.dot, i === page && styles.dotActive]}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}