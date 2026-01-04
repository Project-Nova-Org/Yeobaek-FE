import {
    View,
    Animated,
    PanResponder,
    PanResponderGestureState,
} from "react-native";
import { useRef, useState } from "react";
import { styles } from "./TransformEditor.styles";

interface Props {
    children: React.ReactNode;
    minSize?: number;
}

export function TransformEditor({ children, minSize = 60 }: Props) {
    /* ================= 이동 ================= */
    const translate = useRef(new Animated.ValueXY()).current;

    const moveResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: translate.x, dy: translate.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                translate.extractOffset();
            },
        })
    ).current;

    /* ================= 크기 ================= */
    const [size, setSize] = useState({ width: 140, height: 140 });

    const clamp = (v: number) => Math.max(minSize, v);

    const resizeW = (dx: number) =>
        setSize((p) => ({ ...p, width: clamp(p.width + dx) }));

    const resizeH = (dy: number) =>
        setSize((p) => ({ ...p, height: clamp(p.height + dy) }));

    const resize = (dx: number, dy: number) =>
        setSize((p) => ({
            width: clamp(p.width + dx),
            height: clamp(p.height + dy),
        }));

    const createResizeResponder = (
        handler: (g: PanResponderGestureState) => void
    ) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, g) => handler(g),
        });

    /* ================= 회전 ================= */
    const rotation = useRef(new Animated.Value(0)).current;
    const lastRotation = useRef(0);

    const rotateResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, g) => {
                rotation.setValue(lastRotation.current + g.dx);
            },
            onPanResponderRelease: (_, g) => {
                lastRotation.current += g.dx;
            },
        })
    ).current;

    const rotateInterpolate = rotation.interpolate({
        inputRange: [-180, 180],
        outputRange: ["-180deg", "180deg"],
    });

    /* ================= Render ================= */
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        ...translate.getTranslateTransform(),
                        { rotate: rotateInterpolate },
                    ],
                },
            ]}
            {...moveResponder.panHandlers}
        >
            <View
                style={[
                    styles.box,
                    { width: size.width, height: size.height },
                ]}
            >
                {/* 회전 연결선 */}
                <View style={styles.rotateLine} />

                {/* 회전 핸들 */}
                <View
                    style={styles.rotateHandle}
                    {...rotateResponder.panHandlers}
                />

                {/* ===== 8개 리사이즈 핸들 ===== */}

                {/* 상 / 하 */}
                <View
                    style={[styles.handle, styles.top]}
                    {...createResizeResponder((g) => resizeH(-g.dy)).panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottom]}
                    {...createResizeResponder((g) => resizeH(g.dy)).panHandlers}
                />

                {/* 좌 / 우 */}
                <View
                    style={[styles.handle, styles.left]}
                    {...createResizeResponder((g) => resizeW(-g.dx)).panHandlers}
                />
                <View
                    style={[styles.handle, styles.right]}
                    {...createResizeResponder((g) => resizeW(g.dx)).panHandlers}
                />

                {/* 모서리 4개 */}
                <View
                    style={[styles.handle, styles.topLeft]}
                    {...createResizeResponder((g) => resize(-g.dx, -g.dy)).panHandlers}
                />
                <View
                    style={[styles.handle, styles.topRight]}
                    {...createResizeResponder((g) => resize(g.dx, -g.dy)).panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottomLeft]}
                    {...createResizeResponder((g) => resize(-g.dx, g.dy)).panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottomRight]}
                    {...createResizeResponder((g) => resize(g.dx, g.dy)).panHandlers}
                />

                {/* 실제 이미지 */}
                <View style={styles.content}>{children}</View>
            </View>
        </Animated.View>
    );
}