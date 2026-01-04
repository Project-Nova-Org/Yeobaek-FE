import { Modal, View, Pressable } from "react-native";
import { styles } from "./AddItemBottomSheet.styles";
import { CameraIcon, GalleryIcon } from "@/assets/icons";
import { AppText } from "@/components/common/AppText";

interface Props {
    visible: boolean;
    onClose: () => void;
    onCamera: () => void;
    onGallery: () => void;
}

export function AddItemBottomSheet({
                                       visible,
                                       onClose,
                                       onCamera,
                                       onGallery,
                                   }: Props) {
    return (
        <Modal transparent visible={visible} animationType="slide">
            {/* 배경 (누르면 닫힘) */}
            <Pressable style={styles.overlay} onPress={onClose}>
                {/* 바텀시트 (이벤트 전파 차단) */}
                <View
                    style={styles.sheet}
                    onStartShouldSetResponder={() => true}
                    onTouchEnd={(e) => e.stopPropagation()}
                >
                    <View style={styles.sheet}>
                        {/* 핸들 */}
                        <View style={styles.handle} />

                        {/* 버튼 영역 */}
                        <View style={styles.row}>
                            {/* 카메라 */}
                            <Pressable style={styles.card} onPress={onCamera}>
                                <AppText style={styles.label}>카메라</AppText>
                                <View style={styles.iconWrap}>
                                    <CameraIcon width={28} height={28} />
                                </View>
                            </Pressable>

                            {/* 갤러리 */}
                            <Pressable style={styles.card} onPress={onGallery}>
                                <AppText style={styles.label}>갤러리</AppText>
                                <View style={styles.iconWrap}>
                                    <GalleryIcon width={28} height={28} />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}