import React from "react";
import { Image, Pressable, View } from "react-native";
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
    return (
        <View style={styles.container}>
            <View style={styles.canvas}>
                <Pressable 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    onPress={() => onClearSelection?.()}
                />
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