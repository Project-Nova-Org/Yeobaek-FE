import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Easing, LayoutChangeEvent } from "react-native";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  G,
} from "react-native-svg";
import { AppText as Text } from "@/components/common/AppText";
import { OOTD_CHART_DATA } from "@/screens/Stats/statData";
import { styles, CHART_CONFIG } from "./StatsLineChart.styles";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

export function StatsLineChart() {
  const [chartWidth, setChartWidth] = useState(0);
  const chartHeight = 120;

  const animValue = useRef(new Animated.Value(0)).current;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) setChartWidth(width - 20);
  };

  //애니메이션 실행
  useEffect(() => {
    if (chartWidth > 0) {
      animValue.setValue(0);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [chartWidth, animValue]);

  // 데이터 중 최대값 찾기
  const maxVal = Math.max(...OOTD_CHART_DATA.map((d) => d.value), 1);

  const points = OOTD_CHART_DATA.map((d, i) => {
    // x좌표: 데이터 개수에 맞춰 간격 배치
    const x = chartWidth > 0 ? (i * (chartWidth - 30)) / (OOTD_CHART_DATA.length - 1) + 15 : 0;
    // y좌표: 최대값 대비 비율 계산
    const y = chartHeight - (d.value / maxVal) * (chartHeight - 60) - 25;
    return { x, y, value: d.value };
  });

  // 선 그려지는 애니메이션 경로
  const linePath =
    points.length > 0 ? points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") : "";

  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : "";
  // 선이 왼->오 샤라락 효과
  const strokeDashoffset = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  // 점과 숫자가 나중에 나오기
  const contentOpacity = animValue.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.lineChartBox}>
        {chartWidth > 0 && (
          <View style={{ width: chartWidth, height: chartHeight + 40 }}>
            <Svg width={chartWidth} height={chartHeight}>
              <Defs>
                {/* 그라데이션 */}
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={CHART_CONFIG.color} stopOpacity="0.1" />
                  <Stop offset="1" stopColor={CHART_CONFIG.color} stopOpacity="0" />
                </LinearGradient>
              </Defs>

              <AnimatedPath d={areaPath} fill="url(#grad)" opacity={contentOpacity} />

              <AnimatedPath
                d={linePath}
                fill="none"
                stroke={CHART_CONFIG.color}
                strokeWidth={CHART_CONFIG.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="600"
                strokeDashoffset={strokeDashoffset}
              />

              <AnimatedG opacity={contentOpacity}>
                {points.map((p, i) => (
                  <React.Fragment key={i}>
                    <Circle
                      cx={p.x}
                      cy={p.y}
                      r={CHART_CONFIG.pointRadius}
                      fill={CHART_CONFIG.color}
                    />
                    <SvgText
                      x={p.x}
                      y={p.y - 12}
                      fontSize={styles.dataLabel.fontSize}
                      fill={styles.dataLabel.color}
                      textAnchor="middle"
                      fontWeight={styles.dataLabel.fontWeight}
                    >
                      {p.value}
                    </SvgText>
                  </React.Fragment>
                ))}
              </AnimatedG>
            </Svg>

            <View style={styles.xAxis}>
              {OOTD_CHART_DATA.map((item, i) => (
                <View key={i} style={styles.axisItem}>
                  <Text style={styles.axisLabel}>{item.label}</Text>
                  {item.subLabel !== "" && <Text style={styles.axisSubLabel}>{item.subLabel}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
