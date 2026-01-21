import { View, Pressable, ScrollView } from "react-native";
import { AppText } from "@/components/common/AppText";
import { styles } from "./CategoryTabs.styles";
import { TYPE_CATEGORIES, TYPE_DETAILS } from "@/theme/itemCategories";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface Props {
    category: string;
    detail: string | null;
    onCategoryChange: (c: string) => void;
    onDetailChange: (d: string) => void;
}

export function CategoryTabs({
                                 category,
                                 detail,
                                 onCategoryChange,
                                 onDetailChange,
                             }: Props) {
    return (
        <View>
            {/* 상위 카테고리 - 슬라이드 형식 */}
            <View style={styles.categoryScrollContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryRow}
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    bounces={false}
                    style={styles.categoryScrollView}
                >
                {TYPE_CATEGORIES.map((c) => {
                    const active = category === c;
                    return (
                        <Pressable
                            key={c}
                            style={[styles.categoryTab, active && styles.active]}
                            onPress={() => onCategoryChange(c)}
                        >
                            <AppText
                                style={[
                                    styles.categoryText,
                                    active && styles.activeText,
                                ]}
                            >
                                {c}
                            </AppText>
                        </Pressable>
                    );
                })}
                </ScrollView>
            </View>

            {/* 하위 카테고리 - 슬라이드 형식 */}
            {TYPE_DETAILS[category] && (
                <View style={styles.detailContainer}>
                    <View style={styles.detailScrollContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.detailRow}
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                            bounces={false}
                            style={styles.detailScrollView}
                        >
                        {TYPE_DETAILS[category].map((d) => {
                            const active = detail === d;
                            return (
                                <Pressable
                                    key={d}
                                    style={[styles.detailChip, active && styles.detailActive]}
                                    onPress={() => onDetailChange(d)}
                                >
                                    <AppText
                                        style={[
                                            styles.detailText,
                                            active && styles.detailActiveText,
                                        ]}
                                    >
                                        {d}
                                    </AppText>
                                </Pressable>
                            );
                        })}
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
}