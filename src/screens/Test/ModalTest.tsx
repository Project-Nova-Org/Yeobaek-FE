import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";

import { OotdIncludedModal } from "@/components/Modal/OotdIncludedModal/OotdIncludedModal";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import { MaskEditToolbar } from "@/components/Edit/MaskEditToolbar/MaskEditToolbar";
import { TransformEditor } from "@/components/Edit/TransformEditor/TransformEditor";

import { KakaoIcon } from "@/assets/icons";

export default function ModalTest() {
    const [ootdOpen, setOotdOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [brushSize, setBrushSize] = useState(5);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal / Edit 컴포넌트 테스트</Text>

            {/* ===== 테스트 버튼 영역 ===== */}
            <View style={styles.btnRow}>
                <Pressable style={styles.btn} onPress={() => setOotdOpen(true)}>
                    <Text style={styles.btnText}>OOTD 모달</Text>
                </Pressable>

                <Pressable style={styles.btn} onPress={() => setAddOpen(true)}>
                    <Text style={styles.btnText}>아이템 추가 바텀시트</Text>
                </Pressable>
            </View>

            {/* ===== 누끼 수정바 ===== */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>누끼 수정바</Text>
                <MaskEditToolbar
                    size={brushSize}
                    onChangeSize={setBrushSize}
                    onBack={() => console.log("UNDO")}
                    onFront={() => console.log("REDO")}
                />
            </View>

            {/* ===== 아이템 편집기 ===== */}
            <View style={styles.editorArea}>
                <Text style={styles.sectionTitle}>아이템 편집기</Text>

                <View style={styles.editorCanvas}>
                    <TransformEditor>
                        {/* 실제로는 누끼된 이미지 */}
                        <KakaoIcon width={120} height={120} />
                    </TransformEditor>
                </View>
            </View>

            {/* ===== OOTD 모달 ===== */}
            <OotdIncludedModal
                visible={ootdOpen}
                onClose={() => setOotdOpen(false)}
                items={[
                    { id: 1, Icon: KakaoIcon, label: "학교" },
                    { id: 2, Icon: KakaoIcon, label: "도서관" },
                    { id: 3, Icon: KakaoIcon, label: "학교" },
                    { id: 4, Icon: KakaoIcon, label: "도서관" },
                    { id: 5, Icon: KakaoIcon, label: "학교" },
                ]}
            />

            {/* ===== 아이템 추가 바텀시트 ===== */}
            <AddItemBottomSheet
                visible={addOpen}
                onClose={() => setAddOpen(false)}
                onCamera={() => {
                    console.log("카메라");
                    setAddOpen(false);
                }}
                onGallery={() => {
                    console.log("갤러리");
                    setAddOpen(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "#F5F5F5",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
    },

    btnRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },

    btn: {
        backgroundColor: "#222",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
    },

    btnText: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
    },

    section: {
        marginBottom: 28,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 10,
    },

    editorArea: {
        flex: 1,
    },

    editorCanvas: {
        flex: 1,
        backgroundColor: "#DDD",
        borderRadius: 12,
        marginTop: 10,
        overflow: "hidden",
    },
});