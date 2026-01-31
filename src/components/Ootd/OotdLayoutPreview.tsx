import React from "react";
import { Image, View } from "react-native";
import { styles } from "./OotdLayoutPreview.styles";
import type { OotdCanvasItem } from "@/types/ootd";

type Props = {
  /** 배치 데이터 */
  items: OotdCanvasItem[];
  /** 미리보기 컨테이너 너비 */
  width: number;
  /** 미리보기 컨테이너 높이 */
  height: number;
  /** 배치가 기록된 캔버스 크기 (스케일 계산용) */
  sourceWidth: number;
  sourceHeight: number;
};

/**
 * 저장된 배치 데이터를 그대로 다시 그리는 미리보기.
 * OotdCreateInfo 대표 이미지, OotdScreen 리스트 카드에서 사용.
 */
export function OotdLayoutPreview({
  items,
  width,
  height,
  sourceWidth,
  sourceHeight,
}: Props) {
  if (items.length === 0) return <View style={[styles.container, { width, height }]} />;

  /** 회전된 사각형의 축정렬 바운딩 박스(AABB). 회전 시 실제 차지하는 영역을 반영한다. */
  const getRotatedBounds = (
    x: number,
    y: number,
    w: number,
    h: number,
    rotation: number
  ) => {
    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const rotatedW = w * cos + h * sin;
    const rotatedH = w * sin + h * cos;
    const cx = x + w / 2;
    const cy = y + h / 2;
    return {
      minX: cx - rotatedW / 2,
      minY: cy - rotatedH / 2,
      maxX: cx + rotatedW / 2,
      maxY: cy + rotatedH / 2,
    };
  };

  const boundsList = items.map((it) => {
    const t = it.transform;
    return getRotatedBounds(t.x, t.y, t.width, t.height, t.rotation);
  });
  const minX = Math.min(...boundsList.map((b) => b.minX));
  const minY = Math.min(...boundsList.map((b) => b.minY));
  const maxX = Math.max(...boundsList.map((b) => b.maxX));
  const maxY = Math.max(...boundsList.map((b) => b.maxY));
  const layoutW = maxX - minX;
  const layoutH = maxY - minY;
  const scale = Math.min(
    width / Math.max(layoutW, 1),
    height / Math.max(layoutH, 1)
  );

  return (
    <View style={[styles.container, { width, height }]}>
      {items.map((item) => {
        const { x, y, width: w, height: h, rotation } = item.transform;
        const left = (x - minX) * scale;
        const top = (y - minY) * scale;
        const itemW = w * scale;
        const itemH = h * scale;
        return (
          <View
            key={item.key}
            style={[
              styles.item,
              {
                left,
                top,
                width: itemW,
                height: itemH,
                transform: [{ rotate: `${rotation}rad` }],
              },
            ]}
          >
            <Image
              source={item.image}
              style={styles.itemImage}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </View>
  );
}
