import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { styles } from "./MaskEditToolbar.styles";
import {
    EditIcon,
    EraserIcon,
    BackIcon,   // ↶
    FrontIcon,  // ↷
} from "@/assets/icons";

type Tool = "brush" | "eraser";

const ACTIVE = "#1B2A41";
const INACTIVE = "#767676";

interface Props {
    size: number;
    onChangeSize: (v: number) => void;
    onBack: () => void;
    onFront: () => void;
}

export function MaskEditToolbar({
                                    size,
                                    onChangeSize,
                                    onBack,
                                    onFront,
                                }: Props) {
    const [tool, setTool] = useState<Tool>("brush");

    return (
        <View style={styles.container}>
            {/* 왼쪽 영역 */}
            <View style={styles.leftGroup}>
                <Pressable onPress={() => setTool("brush")} style={styles.iconBtn}>
                    <EditIcon
                        width={15}
                        height={15}
                        color={tool === "brush" ? ACTIVE : INACTIVE}
                    />
                </Pressable>

                <Pressable onPress={() => setTool("eraser")} style={styles.iconBtn} >
                    <EraserIcon
                        width={15}
                        height={15}
                        color={tool === "eraser" ? ACTIVE : INACTIVE}
                    />
                </Pressable>

                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={size}
                    onValueChange={onChangeSize}
                    minimumTrackTintColor={ACTIVE}
                    maximumTrackTintColor="#D0D0D0"
                    thumbTintColor={ACTIVE}
                />

                <Text style={styles.sizeText}>{size}</Text>
            </View>

            {/* 구분선 */}
            <View style={styles.divider} />

            {/* 오른쪽 영역 */}
            <View style={styles.rightGroup}>
                <Pressable onPress={onBack} style={styles.iconBtn}>
                    <BackIcon width={20} height={20} color={INACTIVE} />
                </Pressable>

                <Pressable onPress={onFront} style={styles.iconBtn}>
                    <FrontIcon width={20} height={20} color={INACTIVE} />
                </Pressable>
            </View>
        </View>
    );
}