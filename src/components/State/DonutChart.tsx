import Svg, { Circle } from "react-native-svg";
import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { DonutStatItem } from "./Chart.types";
import { styles } from "./Chart.styles";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DonutChartProps {
  items: DonutStatItem[];
}

const SIZE = 80;
const STROKE_WIDTH = 16;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP_LENGTH = 3;

export function DonutChart({ items }: DonutChartProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  if (!items || items.length === 0) return null;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  let offset = 0;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        {items.map((item, index) => {
          const percentage = item.value / total;
          const realLength = CIRCUMFERENCE * percentage - GAP_LENGTH;

          const animatedLength = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.max(realLength, 0)],
          });

          const strokeDasharray = [animatedLength, CIRCUMFERENCE];
          const strokeDashoffset = -offset;

          offset += CIRCUMFERENCE * percentage;

          return (
            <AnimatedCircle
              key={index}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={item.color}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              rotation="-90"
              origin={`${SIZE / 2}, ${SIZE / 2}`}
            />
          );
        })}
      </Svg>
    </View>
  );
}
