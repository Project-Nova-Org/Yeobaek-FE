import { View, Pressable } from "react-native";
import { AppText } from "@/components/common/AppText.tsx";
import { styles } from "./OotdCreateHeader.styles";
import  UndoIcon  from "@/assets/icons/undo.svg";
import { Colors } from "@/theme/colors";

interface Props {
    title: string;
    onBack: () => void;
    onNext?: () => void;
    disabled?: boolean;
}

export function OotdCreateHeader({
                                     title,
                                     onBack,
                                     onNext,
                                     disabled = true,
                                 }: Props) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onBack} style={styles.left}>
                <UndoIcon />
            </Pressable>

            <AppText style={styles.title}>{title}</AppText>

            <Pressable
                onPress={onNext}
                disabled={disabled}
                style={[styles.nextBtn, disabled ? styles.nextBtnDisabled : styles.nextBtnEnabled]}
            >
                <AppText style={[styles.nextText, { color: disabled ? Colors.gray400 : Colors.white }]}>
                    다음
                </AppText>
            </Pressable>
        </View>
    );
}