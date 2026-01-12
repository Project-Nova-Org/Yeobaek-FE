import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
} from "react-native";
import FilterClose from "@/assets/icons/filter_close.svg";
import { styles } from "./ButtonScroll.styles";

type TopCategory = "종류" | "계절" | "소재" | null;

interface CategoryState {
    top: TopCategory;

    // 종류
    typeCategory: string | null;
    typeDetail: string | null;

    // 계절
    season: string | null;

    // 소재
    material: string | null;
}

/* ---------------- 데이터 ---------------- */

const TOP_CATEGORIES: TopCategory[] = ["종류", "계절", "소재"];

const TYPE_CATEGORIES = [
    "상의",
    "하의",
    "한벌 옷",
    "아우터",
    "신발",
    "악세서리",
    "기타",
];

const TYPE_DETAILS: Record<string, string[]> = {
    상의: ["반팔티", "긴팔티", "니트", "맨투맨", "후드티", "조끼", "슬리브리스", "블라우스", "트레이닝", "탱크탑", "크롭탑", "기타",],
    하의: ["청바지", "슬랙스", "면바지", "반바지", "치마", "트레이닝", "레깅스", "기타",],
    원피스: ["원피스", "점프수트", "기타",],
    아우터: ["자켓", "가디건", "코트", "패딩", "후드집업", "바람막이", "블루종", "무스탕", "베스트", "야상", "기타",],
    신발: ["운동화", "스니커즈", "샌들", "슬리퍼", "부츠", "하이힐", "더비슈즈", "로퍼", "모카신", "등산화", "기타",],
    악세서리: ["모자", "가방", "머플러", "벨트", "반지", "팔찌", "목걸이", "시계", "안경", "넥타이", "귀걸이", "기타",],
};

const SEASONS = ["봄", "여름", "가을", "겨울"];

const MATERIALS = [
    "데님", "면", "나일론", "폴리에스터", "가죽", "캐시미어", "울", "린넨", "기타",
];


export default function CategoryFilter() {
    const [state, setState] = useState<CategoryState>({
        top: null,
        typeCategory: null,
        typeDetail: null,
        season: null,
        material: null,
    });

    /* ----- 하위 선택 여부 판단 (X 표시 조건) ----- */
    const hasActiveChild = (top: TopCategory) => {
        if (state.top !== top) return false;
        if (top === "종류") return !!(state.typeCategory || state.typeDetail);
        if (top === "계절") return !!state.season;
        if (top === "소재") return !!state.material;
        return false;
    };

    /* ----- 해당 최상위만 초기화 ----- */
    const clearTopCategory = (top: TopCategory) => {
        setState((prev) => {
            switch (top) {
                case "종류":
                    return {
                        ...prev,
                        top: null,
                        typeCategory: null,
                        typeDetail: null,
                    };
                case "계절":
                    return {
                        ...prev,
                        top: null,
                        season: null,
                    };
                case "소재":
                    return {
                        ...prev,
                        top: null,
                        material: null,
                    };
                default:
                    return prev;
            }
        });
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {TOP_CATEGORIES.map((item) => {
                    const active = state.top === item;
                    const showClose = hasActiveChild(item);

                    return (
                        <Pressable
                            key={item}
                            style={[
                                styles.pill,
                                active && styles.pillActive,
                                showClose &&styles.pillWithClose,
                            ]}
                            onPress={() =>
                                setState((prev) => ({
                                    ...prev,
                                    top: item,
                                }))
                            }
                        >
                            <Text
                                style={[
                                    styles.pillText,
                                    active && styles.pillTextActive,
                                ]}
                            >
                                {item}
                            </Text>

                            {showClose && (
                                <Pressable
                                    style={styles.closeAbsolute}
                                    onPress={() => clearTopCategory(item)}
                                    hitSlop={8}
                                >
                                    <FilterClose width={10} height={10} />
                                </Pressable>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>

            {state.top === "종류" && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.row}
                >
                    {TYPE_CATEGORIES.map((item) => {
                        const active = state.typeCategory === item;
                        return (
                            <Pressable
                                key={item}
                                style={[styles.pill, active && styles.pillActive]}
                                onPress={() =>
                                    setState((prev) => ({
                                        ...prev,
                                        typeCategory: item,
                                    }))
                                }
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        active && styles.pillTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            )}

            {state.top === "계절" && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.row}
                >
                    {SEASONS.map((item) => {
                        const active = state.season === item;
                        return (
                            <Pressable
                                key={item}
                                style={[styles.pill, active && styles.pillActive]}
                                onPress={() =>
                                    setState((prev) => ({
                                        ...prev,
                                        season: item,
                                    }))
                                }
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        active && styles.pillTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            )}

            {state.top === "소재" && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.row}
                >
                    {MATERIALS.map((item) => {
                        const active = state.material === item;
                        return (
                            <Pressable
                                key={item}
                                style={[styles.pill, active && styles.pillActive]}
                                onPress={() =>
                                    setState((prev) => ({
                                        ...prev,
                                        material: item,
                                    }))
                                }
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        active && styles.pillTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            )}

            {state.top === "종류" &&
                state.typeCategory &&
                TYPE_DETAILS[state.typeCategory] && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.row}
                    >
                        {TYPE_DETAILS[state.typeCategory].map((item) => {
                            const active = state.typeDetail === item;
                            return (
                                <Pressable
                                    key={item}
                                    style={[styles.pill, active && styles.pillActive]}
                                    onPress={() =>
                                        setState((prev) => ({
                                            ...prev,
                                            typeDetail: item,
                                        }))
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.pillText,
                                            active && styles.pillTextActive,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                )}
        </View>
    );
}