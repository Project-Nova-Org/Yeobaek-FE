import React from "react";
import { Pressable, View } from "react-native";
import { AppText } from "@/components/common/AppText";
import { styles } from "./ItemClosetTabs.styles";

type Props = {
    value: "아이템" | "옷장";
    onChange: (v: "아이템" | "옷장") => void;
};

export function ItemClosetTabs({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            {(["아이템", "옷장"] as const).map((t) => {
                const active = value === t;
                return (
                    <Pressable
                        key={t}
                        onPress={() => onChange(t)}
                        style={[styles.tab, active && styles.tabActive]}
                    >
                        <AppText style={[styles.tabText, active && styles.tabTextActive]}>{t}</AppText>
                    </Pressable>
                );
            })}
        </View>
    );
}