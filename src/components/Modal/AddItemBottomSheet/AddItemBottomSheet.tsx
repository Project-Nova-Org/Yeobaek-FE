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
            <Pressable style={styles.overlay} onPress={onClose}>
                {/* 이벤트 전파 차단) */}
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <View style={styles.sheet}>
                        <View style={styles.handle} />

                        <View style={styles.row}>
                            <Pressable style={styles.card} onPress={onCamera}>
                                <Text style={styles.label}>카메라</Text>
                                <View style={styles.iconWrap}>
                                    <CameraIcon width={28} height={28} />
                                </View>
                            </Pressable>

                            <Pressable style={styles.card} onPress={onGallery}>
                                <Text style={styles.label}>갤러리</Text>
                                <View style={styles.iconWrap}>
                                    <GalleryIcon width={28} height={28} />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}