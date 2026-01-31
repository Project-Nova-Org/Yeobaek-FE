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
    /** 오른쪽 버튼 텍스트 (기본: "다음") */
    rightLabel?: string;
}

export function OotdCreateHeader({
                                     title,
                                     onBack,
                                     onNext,
                                     disabled = true,
                                     rightLabel = "다음",
                                 }: Props) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onBack} style={styles.backBtn}>
                <UndoIcon width={20} height={20}/>
            </Pressable>

            <AppText style={styles.title}>{title}</AppText>

            <Pressable
                onPress={onNext}
                disabled={disabled}
                style={[styles.nextBtn, disabled ? styles.nextBtnDisabled : styles.nextBtnEnabled]}
            >
                <AppText style={[styles.nextText, { color: disabled ? Colors.gray400 : Colors.white }]}>
                    {rightLabel}
                </AppText>
            </Pressable>
        </View>
    );
}