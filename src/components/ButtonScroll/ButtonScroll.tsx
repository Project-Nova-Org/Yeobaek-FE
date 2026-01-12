import { useEffect, useState } from "react";
import { View, ScrollView, LayoutChangeEvent } from "react-native";
import { styles } from "./ButtonScroll.styles";

import type { CategoryState, TopCategory } from "./ButtonScroll.types";
import {
  TOP_CATEGORIES,
  TYPE_CATEGORIES,
  TYPE_DETAILS,
  SEASONS,
  MATERIALS,
} from "./buttonScroll.data";

import { TopCategoryPill } from "./TopCategoryPill";
import { HorizontalPillRow } from "./HorizontalPillRow";
import { useCenterScroll } from "./useCenterScroll";

interface Props {
  onChange?: (state: CategoryState) => void;
}

export default function ButtonScroll({ onChange }: Props) {
  const [state, setState] = useState<CategoryState>({
    top: null,
    typeCategory: null,
    typeDetail: null,
    season: null,
    material: null,
  });

  const { scrollRef, onScrollViewLayout, registerItemLayout, scrollToCenter } = useCenterScroll();

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const hasActiveChild = (top: TopCategory) => {
    if (state.top !== top) return false;
    if (top === "종류") return !!(state.typeCategory || state.typeDetail);
    if (top === "계절") return !!state.season;
    if (top === "소재") return !!state.material;
    return false;
  };

  const clearTopCategory = (top: TopCategory) => {
    setState((prev) => {
      switch (top) {
        case "종류":
          return { ...prev, top: null, typeCategory: null, typeDetail: null };
        case "계절":
          return { ...prev, top: null, season: null };
        case "소재":
          return { ...prev, top: null, material: null };
        default:
          return prev;
      }
    });
  };

  const handleScrollLayout = (e: LayoutChangeEvent) => {
    onScrollViewLayout(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        onLayout={handleScrollLayout}
      >
        {TOP_CATEGORIES.map((item) => (
          <TopCategoryPill
            key={item}
            label={item}
            active={state.top === item}
            showClose={hasActiveChild(item)}
            onLayout={(x, w) => registerItemLayout(item, x, w)}
            onPress={() => {
              scrollToCenter(item);
              setState((p) => ({ ...p, top: item }));
            }}
            onClear={() => clearTopCategory(item)}
          />
        ))}
      </ScrollView>

      {state.top === "종류" && (
        <>
          <HorizontalPillRow
            items={TYPE_CATEGORIES}
            selected={state.typeCategory}
            onSelect={(v) => setState((p) => ({ ...p, typeCategory: v }))}
          />

          {state.typeCategory && TYPE_DETAILS[state.typeCategory] && (
            <HorizontalPillRow
              items={TYPE_DETAILS[state.typeCategory]}
              selected={state.typeDetail}
              onSelect={(v) => setState((p) => ({ ...p, typeDetail: v }))}
            />
          )}
        </>
      )}

      {state.top === "계절" && (
        <HorizontalPillRow
          items={SEASONS}
          selected={state.season}
          onSelect={(v) => setState((p) => ({ ...p, season: v }))}
        />
      )}

      {state.top === "소재" && (
        <HorizontalPillRow
          items={MATERIALS}
          selected={state.material}
          onSelect={(v) => setState((p) => ({ ...p, material: v }))}
        />
      )}
    </View>
  );
}
