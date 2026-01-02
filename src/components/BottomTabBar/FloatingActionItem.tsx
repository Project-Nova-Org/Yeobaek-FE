import { Animated, Pressable } from "react-native";
import { barStyles } from "./BottomTabBar.styles";

interface Props {
  anim: Animated.Value;
  start: { x: number; y: number };
  mid: { x: number; y: number };
  end: { x: number; y: number };
  onPress?: () => void;
  children: React.ReactNode;
}

export function FloatingActionItem({ anim, start, mid, end, onPress, children }: Props) {
  const translateX = anim.interpolate({
    inputRange: [0, 0.65, 1],
    outputRange: [start.x, mid.x, end.x],
  });

  const translateY = anim.interpolate({
    inputRange: [0, 0.65, 1],
    outputRange: [start.y, mid.y, end.y],
  });

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        barStyles.actionButtonWrap,
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      <Pressable style={barStyles.actionButton} onPress={onPress}>
        {children}
      </Pressable>
    </Animated.View>
  );
}
