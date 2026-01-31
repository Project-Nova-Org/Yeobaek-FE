import React from "react";
import { Image, Pressable, View } from "react-native";
import { styles } from "./OotdCanvas.styles";
import { TransformEditor } from "@/components/Edit/TransformEditor/TransformEditor";
import type { OotdCanvasItem, OotdItemTransform } from "@/types/ootd";

export type { OotdCanvasItem } from "@/types/ootd";

type Props = {
    items: OotdCanvasItem[];
    editable: boolean;
    onRemove: (key: string) => void;
    onTransformChange?: (key: string, transform: OotdItemTransform) => void;
    selectedKey?: string | null;
    onSelect?: (key: string) => void;
    onClearSelection?: () => void;
};

export function OotdCanvas({
    items,
    editable,
    onRemove,
    onTransformChange,
    selectedKey,
    onSelect,
    onClearSelection,
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.canvas}>
                <Pressable
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                    onPress={() => onClearSelection?.()}
                />
                {items.map((it) => {
                    const active = selectedKey === it.key;
                    return (
                        <TransformEditor
                            key={it.key}
                            enabled={editable}
                            active={active}
                            initialTransform={it.transform}
                            onTransformChange={(t) => onTransformChange?.(it.key, t)}
                            onActivate={() => onSelect?.(it.key)}
                            onDeactivate={() => {
                                if (selectedKey === it.key) onClearSelection?.();
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