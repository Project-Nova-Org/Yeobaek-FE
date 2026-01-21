import React from "react";
import { Image, View } from "react-native";
import { styles } from "./OotdCanvas.styles";
import { TransformEditor } from "@/components/Edit/TransformEditor/TransformEditor";

export type CanvasItem = {
    key: string;
    image: any;
};

type Props = {
    items: CanvasItem[];
    editable: boolean;
    onRemove: (key: string) => void;
    selectedKey?: string | null;
    onSelect?: (key: string) => void;
    onClearSelection?: () => void;
};

export function OotdCanvas({
    items,
    editable,
    onRemove,
    selectedKey,
    onSelect,
    onClearSelection,
}: Props) {
    const handleBackgroundPress = () => {
        onClearSelection?.();
    };

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.target === e.currentTarget}
            onResponderRelease={handleBackgroundPress}
        >
            <View style={styles.canvas}>
                {items.map((it) => {
                    const active = selectedKey === it.key;
                    return (
                        <TransformEditor
                            key={it.key}
                            enabled={editable}
                            active={active}
                            onActivate={() => onSelect?.(it.key)}
                            onDeactivate={() => {
                                // 아이템에서 손을 떼면 active 해제
                                if (selectedKey === it.key) {
                                    onClearSelection?.();
                                }
                            }}
                            onRemove={() => onRemove(it.key)}
                        >
                            <Image source={it.image} style={styles.itemImage} resizeMode="cover" />
                        </TransformEditor>
                    );
                })}
            </View>
        </View>
    );
}