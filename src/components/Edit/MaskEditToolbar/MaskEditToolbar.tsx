import { View, Pressable } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { styles } from "./MaskEditToolbar.styles";
import {
    EditIcon,
    EraserIcon,
    BackIcon,
    FrontIcon,
} from "@/assets/icons";

import { AppText } from "@/components/common/AppText";
import { Colors } from "@/theme/colors";

type Tool = "brush" | "eraser";

const ACTIVE = Colors.primary;
const INACTIVE = Colors.gray400;

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

            <View style={styles.leftGroup}>
                <Pressable onPress={() => setTool("brush")} style={styles.iconBtn}>
                    <EditIcon
                        width={15}
                        height={15}
                        color={tool === "brush" ? ACTIVE : INACTIVE}
                    />
                </Pressable>

                <Pressable onPress={() => setTool("eraser")} style={styles.iconBtn}>
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
                    maximumTrackTintColor={Colors.disable}
                    thumbTintColor={ACTIVE}
                />

                <AppText style={styles.sizeText}>{size}</AppText>
            </View>
            {/* 구분선*/}
            <View style={styles.divider} />

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