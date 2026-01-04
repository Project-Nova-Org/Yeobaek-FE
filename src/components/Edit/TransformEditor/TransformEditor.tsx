import {
    View,
    Animated,
    PanResponder,
} from "react-native";
import { useRef, useState } from "react";
import { styles } from "./TransformEditor.styles";

interface Props {
    children: React.ReactNode;
    minSize?: number;
}

export function TransformEditor({ children, minSize = 60 }: Props) {
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


    const [size, setSize] = useState({ width: 140, height: 140 });
    const lastGesture = useRef({ dx: 0, dy: 0 });

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
        handler: (dx: number, dy: number) => void
    ) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                lastGesture.current = { dx: 0, dy: 0 };
            },

            onPanResponderMove: (_, g) => {
                const deltaDx = g.dx - lastGesture.current.dx;
                const deltaDy = g.dy - lastGesture.current.dy;

                lastGesture.current = { dx: g.dx, dy: g.dy };

                handler(deltaDx, deltaDy);
            },
        });

    const resizeResponders = useRef({
        top: createResizeResponder((_, dy) => resizeH(-dy)),
        bottom: createResizeResponder((_, dy) => resizeH(dy)),
        left: createResizeResponder((dx) => resizeW(-dx)),
        right: createResizeResponder((dx) => resizeW(dx)),
        topLeft: createResizeResponder((dx, dy) => resize(-dx, -dy)),
        topRight: createResizeResponder((dx, dy) => resize(dx, -dy)),
        bottomLeft: createResizeResponder((dx, dy) => resize(-dx, dy)),
        bottomRight: createResizeResponder((dx, dy) => resize(dx, dy)),
    }).current;

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
        extrapolate: 'extend',
    });


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

                {/* 상 / 하 */}
                <View
                    style={[styles.handle, styles.top]}
                    {...resizeResponders.top.panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottom]}
                    {...resizeResponders.bottom.panHandlers}
                />

                {/* 좌 / 우 */}
                <View
                    style={[styles.handle, styles.left]}
                    {...resizeResponders.left.panHandlers}
                />
                <View
                    style={[styles.handle, styles.right]}
                    {...resizeResponders.right.panHandlers}
                />

                {/* 모서리 */}
                <View
                    style={[styles.handle, styles.topLeft]}
                    {...resizeResponders.topLeft.panHandlers}
                />
                <View
                    style={[styles.handle, styles.topRight]}
                    {...resizeResponders.topRight.panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottomLeft]}
                    {...resizeResponders.bottomLeft.panHandlers}
                />
                <View
                    style={[styles.handle, styles.bottomRight]}
                    {...resizeResponders.bottomRight.panHandlers}
                />

                <View style={styles.content}>{children}</View>
            </View>
        </Animated.View>
    );
}