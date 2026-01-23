import React, { useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, View } from "react-native";
import { styles } from "./TransformEditor.styles";
import {
    FilterClose,
    RotationIcon,
} from "@/assets/icons";
import { Colors } from "@/theme/colors";

type Props = {
    children: React.ReactNode;
    enabled?: boolean;
    minSize?: number;
    onRemove?: () => void;
    active?: boolean;
    onActivate?: () => void;
    onDeactivate?: () => void;
};

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function angle(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

export function TransformEditor({
    children,
    enabled = true,
    minSize = 60,
    onRemove,
    active = true,
    onActivate,
    onDeactivate,
}: Props) {
    // 이동
    const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // 회전(라디안)
    const rotate = useRef(new Animated.Value(0)).current;
    // 확대(스케일)
    const scale = useRef(new Animated.Value(1)).current;
    // 크기(리사이즈 핸들용)
    const [size, setSize] = useState({ width: 140, height: 140 });
    const lastGesture = useRef({ dx: 0, dy: 0 });

    const pinchState = useRef<{
        baseScale: number;
        startDist: number | null;
        startAngle: number | null;
        baseRotate: number;
        lastScale: number; // 마지막 scale 값 추적
        lastRotate: number; // 마지막 rotate 값 추적
    }>({
        baseScale: 1,
        startDist: null,
        startAngle: null,
        baseRotate: 0,
        lastScale: 1,
        lastRotate: 0,
    });

    const clampSize = (v: number) => Math.max(minSize, v);

    const resize = (dx: number, dy: number, translateDx: number = 0, translateDy: number = 0) => {
        setSize((p) => ({
            width: clampSize(p.width + dx),
            height: clampSize(p.height + dy),
        }));

        if (translateDx !== 0 || translateDy !== 0) {
            const currentOffsetX = (translate.x as any)._offset || 0;
            const currentOffsetY = (translate.y as any)._offset || 0;
            
            translate.setOffset({
                x: currentOffsetX + translateDx,
                y: currentOffsetY + translateDy,
            });
        }
    };

    const createResizeResponder = (handler: (dx: number, dy: number) => void) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => {
                isHandlingHandle.current = true;
                onActivate?.();
                return enabled;
            },
            onStartShouldSetPanResponderCapture: () => {
                isHandlingHandle.current = true;
                onActivate?.();
                return enabled;
            },
            onMoveShouldSetPanResponder: () => enabled,
            onPanResponderGrant: () => {
                isHandlingHandle.current = true;
                lastGesture.current = { dx: 0, dy: 0 };
                // translate 오프셋을 현재 값으로 고정
                translate.extractOffset();
            },
            onPanResponderMove: (_, g) => {
                if (!enabled) return;
                const deltaDx = g.dx - lastGesture.current.dx;
                const deltaDy = g.dy - lastGesture.current.dy;
                lastGesture.current = { dx: g.dx, dy: g.dy };
                handler(deltaDx, deltaDy);
            },
            onPanResponderRelease: () => {
                isHandlingHandle.current = false;
                // translate 오프셋 다시 고정
                translate.extractOffset();
            },
            onPanResponderTerminate: () => {
                isHandlingHandle.current = false;
            },
        });

    // 회전 핸들용 초기 위치 저장
    const rotateHandleState = useRef<{
        startAngle: number | null;
        baseRotate: number;
    }>({
        startAngle: null,
        baseRotate: 0,
    });

    // 회전 핸들용 responder
    const createRotateResponder = () =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => {
                isHandlingHandle.current = true;
                onActivate?.();
                return enabled;
            },
            onStartShouldSetPanResponderCapture: () => {
                isHandlingHandle.current = true;
                onActivate?.();
                return enabled;
            },
            onMoveShouldSetPanResponder: () => enabled,
            onPanResponderGrant: (e) => {
                if (!enabled) return;
                isHandlingHandle.current = true;
                lastGesture.current = { dx: 0, dy: 0 };
                rotate.extractOffset();
                rotateHandleState.current.startAngle = -Math.PI / 2;
                rotateHandleState.current.baseRotate = 0;
            },
            onPanResponderMove: (e, g) => {
                if (!enabled || rotateHandleState.current.startAngle === null) return;

                const currentAngle = Math.atan2(g.dy, g.dx);
                
                // 초기 각도(-90도)와의 차이를 회전값으로 설정
                const deltaAngle = currentAngle - rotateHandleState.current.startAngle;
                rotate.setValue(rotateHandleState.current.baseRotate + deltaAngle);
            },
            onPanResponderRelease: () => {
                if (!enabled) return;
                isHandlingHandle.current = false;
                rotate.extractOffset();
                rotateHandleState.current.baseRotate = 0;
                rotateHandleState.current.startAngle = null;
            },
            onPanResponderTerminate: () => {
                isHandlingHandle.current = false;
            },
        });

    const rotateResponder = useMemo(() => createRotateResponder(), [enabled]);

    const resizeResponders = useMemo(
        () => ({
            bottomRight: createResizeResponder((dx, dy) => resize(dx, dy)),
            bottomLeft: createResizeResponder((dx, dy) => resize(-dx, dy, dx, 0)),
            topRight: createResizeResponder((dx, dy) => resize(dx, -dy, 0, dy)),
            topLeft: createResizeResponder((dx, dy) => resize(-dx, -dy, dx, dy)),
            right: createResizeResponder((dx, dy) => resize(dx, 0)),
            left: createResizeResponder((dx, dy) => resize(-dx, 0, dx, 0)),
            top: createResizeResponder((dx, dy) => resize(0, -dy, 0, dy)),
            bottom: createResizeResponder((dx, dy) => resize(0, dy)),
        }),
        [enabled, minSize]
    );

    const isHandlingHandle = useRef(false);

    const moveResponder = useMemo(
        () => PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                onActivate?.();
                // 핸들을 터치한 경우는 false
                if (isHandlingHandle.current) return false;
                return enabled;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // 핸들을 드래그한 경우는 false
                if (isHandlingHandle.current) return false;
                return enabled;
            },

            onPanResponderGrant: (e) => {
                translate.extractOffset();

                // 현재 scale/rotate 값을 base로 설정
                // extractOffset() 후에는 값이 0이 되고 offset에 누적
                scale.extractOffset();
                rotate.extractOffset();
                
                // lastScale과 lastRotate를 base로 설정 (이전 제스처에서 저장된 값)
                pinchState.current.baseScale = pinchState.current.lastScale;
                pinchState.current.baseRotate = pinchState.current.lastRotate;

                // 두손 제스처 초기화
                const touches = e.nativeEvent.touches;
                if (touches && touches.length >= 2) {
                    const p1 = { x: touches[0].pageX, y: touches[0].pageY };
                    const p2 = { x: touches[1].pageX, y: touches[1].pageY };

                    pinchState.current.startDist = dist(p1, p2);
                    pinchState.current.startAngle = angle(p1, p2);
                } else {
                    pinchState.current.startDist = null;
                    pinchState.current.startAngle = null;
                }
            },

            onPanResponderMove: (e, g) => {
                if (!enabled) return;

                const touches = e.nativeEvent.touches;

                // 1) 두손이면: 핀치 + 회전 우선
                if (touches && touches.length >= 2) {
                    const p1 = { x: touches[0].pageX, y: touches[0].pageY };
                    const p2 = { x: touches[1].pageX, y: touches[1].pageY };

                    const d = dist(p1, p2);
                    const a = angle(p1, p2);

                    if (pinchState.current.startDist) {
                        const nextScale = (pinchState.current.baseScale * d) / pinchState.current.startDist;
                        const clampedScale = Math.max(0.4, Math.min(3, nextScale));
                        scale.setValue(clampedScale);
                        pinchState.current.lastScale = clampedScale;
                    }

                    if (pinchState.current.startAngle !== null) {
                        const delta = a - pinchState.current.startAngle;
                        const nextRotate = pinchState.current.baseRotate + delta;
                        rotate.setValue(nextRotate);
                        pinchState.current.lastRotate = nextRotate;
                    }

                    return;
                }

                // 2) 한손이면: 이동
                translate.setValue({ x: g.dx, y: g.dy });
            },

            onPanResponderRelease: (e) => {
                translate.extractOffset();

                scale.extractOffset();
                rotate.extractOffset();
                pinchState.current.baseScale = pinchState.current.lastScale;
                pinchState.current.baseRotate = pinchState.current.lastRotate;
            },
        }),
        [enabled, onActivate, onDeactivate]
    );

    // rotate 값(라디안)을 deg로 변환
    const rotateInterpolate = rotate.interpolate({
        inputRange: [-Math.PI, Math.PI],
        outputRange: ["-180deg", "180deg"],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        ...translate.getTranslateTransform(),
                        { scale },
                        { rotate: rotateInterpolate },
                    ],
                },
            ]}
            {...moveResponder.panHandlers}
        >
            <View style={[
                styles.box, 
                { width: size.width, height: size.height },
                !active && styles.boxInactive
            ]}>
                {active && (
                    <>
                        {!!onRemove && (
                            <Pressable onPress={onRemove} style={styles.deleteBtn}>
                                <FilterClose width={16} height={16} color={Colors.black} />
                            </Pressable>
                        )}

                        <View style={styles.rotateConnector} />

                        <View style={styles.rotateHandle} {...rotateResponder.panHandlers}>
                            <View style={styles.rotateArrow}>
                                <RotationIcon width={20} height={20} />
                            </View>
                        </View>

                        <View style={styles.handleBR} {...resizeResponders.bottomRight.panHandlers} />
                        <View style={styles.handleBL} {...resizeResponders.bottomLeft.panHandlers} />
                        <View style={styles.handleTR} {...resizeResponders.topRight.panHandlers} />
                        <View style={styles.handleTL} {...resizeResponders.topLeft.panHandlers} />
                        <View style={styles.handleR} {...resizeResponders.right.panHandlers} />
                        <View style={styles.handleL} {...resizeResponders.left.panHandlers} />
                        <View style={styles.handleT} {...resizeResponders.top.panHandlers} />
                        <View style={styles.handleB} {...resizeResponders.bottom.panHandlers} />
                    </>
                )}

                <View style={styles.content}>{children}</View>
            </View>
        </Animated.View>
    );
}