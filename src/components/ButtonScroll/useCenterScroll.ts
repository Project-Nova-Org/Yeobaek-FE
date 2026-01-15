import { useRef } from "react";
import { ScrollView } from "react-native";

interface Layout {
  x: number;
  width: number;
}

export function useCenterScroll() {
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Record<string, Layout>>({});
  const scrollViewWidth = useRef(0);

  const onScrollViewLayout = (width: number) => {
    scrollViewWidth.current = width;
  };

  const registerItemLayout = (key: string, x: number, width: number) => {
    layouts.current[key] = { x, width };
  };

  const scrollToCenter = (key: string) => {
    const layout = layouts.current[key];
    const scrollView = scrollRef.current;

    if (!layout || !scrollView) return;

    const centerX = layout.x + layout.width / 2;
    const targetX = Math.max(centerX - scrollViewWidth.current / 2, 0);

    scrollView.scrollTo({ x: targetX, animated: true });
  };

  return {
    scrollRef,
    onScrollViewLayout,
    registerItemLayout,
    scrollToCenter,
  };
}
