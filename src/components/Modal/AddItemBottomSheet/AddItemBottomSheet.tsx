import { Modal, View, Text, Pressable } from "react-native";
import { styles } from "./AddItemBottomSheet.styles";
import { CameraIcon, GalleryIcon } from "@/assets/icons";

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
            {/* 배경 */}
            <Pressable style={styles.overlay} onPress={onClose}>
                {/* 바텀시트 */}
                <View style={styles.sheet}>
                    {/* 핸들 */}
                    <View style={styles.handle} />

                    {/* 버튼 영역 */}
                    <View style={styles.row}>
                        {/* 카메라 */}
                        <Pressable style={styles.card} onPress={onCamera}>
                            <Text style={styles.label}>카메라</Text>
                            <View style={styles.iconWrap}>
                                <CameraIcon width={28} height={28} />
                            </View>
                        </Pressable>

                        {/* 갤러리 */}
                        <Pressable style={styles.card} onPress={onGallery}>
                            <Text style={styles.label}>갤러리</Text>
                            <View style={styles.iconWrap}>
                                <GalleryIcon width={28} height={28} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}