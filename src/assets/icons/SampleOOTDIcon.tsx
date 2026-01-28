import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export function SampleOOTDIcon({ width = 36, height = 36 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <Rect width="36" height="36" rx="10" fill="#F2F3F5" />
      <Path
        d="M12 10L18 6L24 10V28H12V10Z"
        stroke="#444"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path d="M12 10L18 14L24 10" stroke="#444" strokeWidth="1.5" strokeLinejoin="round" />
    </Svg>
  );
}
