import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, View } from "react-native";
import { styles } from "./TransformEditor.styles";
import {
    FilterClose,
    RotationIcon,
} from "@/assets/icons";
import { Colors } from "@/theme/colors";
import type { OotdItemTransform } from "@/types/ootd";

type Props = {
    children: React.ReactNode;
    enabled?: boolean;
    minSize?: number;
    onRemove?: () => void;
    active?: boolean;
    onActivate?: () => void;
    onDeactivate?: () => void;
    /** 초기 배치 (저장된 OOTD 재렌더 시) */
    initialTransform?: OotdItemTransform;
    /** 배치 변경 시 콜백 (제스처 종료 시 호출) */
    onTransformChange?: (transform: OotdItemTransform) => void;
};

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function angle(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

const DEFAULT_SIZE = { width: 140, height: 140 };

function getValueOffset(v: Animated.Value): number {
    const node = v as any;
    return (node._offset ?? 0) + (node._value ?? 0);
}

export function TransformEditor({
    children,
    enabled = true,
    minSize = 60,
    onRemove,
    active = true,
    onActivate,
    onDeactivate,
    initialTransform,
    onTransformChange,
}: Props) {
    // 이동
    const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // 회전(라디안)
    const rotate = useRef(new Animated.Value(0)).current;
    // 확대(스케일)
    const scale = useRef(new Animated.Value(1)).current;
    // 크기(리사이즈 핸들용)
    const [size, setSize] = useState(
        initialTransform
            ? { width: initialTransform.width, height: initialTransform.height }
            : DEFAULT_SIZE
    );
    const sizeRef = useRef(size);
    sizeRef.current = size;

    useEffect(() => {
        if (!initialTransform) return;
        translate.setOffset({ x: initialTransform.x, y: initialTransform.y });
        rotate.setOffset(initialTransform.rotation);
        setSize({ width: initialTransform.width, height: initialTransform.height });
        pinchState.current.baseSize = { width: initialTransform.width, height: initialTransform.height };
        pinchState.current.baseRotate = initialTransform.rotation;
        pinchState.current.lastRotate = initialTransform.rotation;
    }, []);

    const notifyTransform = () => {
        if (!onTransformChange) return;
        const x = getValueOffset(translate.x);
        const y = getValueOffset(translate.y);
        const rotation = getValueOffset(rotate);
        const { width, height } = sizeRef.current;
        onTransformChange({ x, y, width, height, rotation });
    };
    const lastGesture = useRef({ dx: 0, dy: 0 });

    const pinchState = useRef<{
        baseSize: { width: number; height: number };
        startDist: number | null;
        startAngle: number | null;
        baseRotate: number;
        lastRotate: number; // 마지막 rotate 값 추적
    }>({
        baseSize: { width: 140, height: 140 },
        startDist: null,
        startAngle: null,
        baseRotate: 0,
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
            onStartShouldSetPanResponderCapture: (evt) => {
                // 삭제 버튼 영역이면 캡처하지 않음
                const { pageX, pageY } = evt.nativeEvent;
                // 삭제 버튼 영역 체크는 삭제 버튼이 먼저 처리되도록 하기 위해
                // 여기서는 항상 캡처하되, 삭제 버튼의 zIndex가 더 높아서 우선 처리됨
                isHandlingHandle.current = true;
                onActivate?.();
                return enabled;
            },
            onMoveShouldSetPanResponder: () => enabled,
            onPanResponderGrant: () => {
                isHandlingHandle.current = true;
                lastGesture.current = { dx: 0, dy: 0 };
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
                translate.extractOffset();
                notifyTransform();
            },
            onPanResponderTerminate: () => {
                isHandlingHandle.current = false;
            },
        });

    const rotateHandleState = useRef<{
        startAngle: number | null;
        baseRotate: number;
        hasStarted: boolean; // 실제 드래그가 시작되었는지 여부
    }>({
        startAngle: null,
        baseRotate: 0,
        hasStarted: false,
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
                
                // 현재 회전값을 base로 설정
                rotate.extractOffset();
                const currentRotate = (rotate as any)._value || 0;
                rotateHandleState.current.baseRotate = currentRotate;
                
                // 아직 드래그가 시작되지 않았음을 표시
                rotateHandleState.current.hasStarted = false;
                rotateHandleState.current.startAngle = null;
            },
            onPanResponderMove: (e, g) => {
                if (!enabled) return;

                // 최소 이동 거리 체크 (터치만 하고 움직이지 않으면 회전하지 않음)
                const moveDistance = Math.sqrt(g.dx * g.dx + g.dy * g.dy);
                if (moveDistance < 5) {
                    return;
                }

                if (!rotateHandleState.current.hasStarted) {
                    // 터치 시작 시점의 각도 (상대 이동량 기준)
                    const startAngle = Math.atan2(g.dy, g.dx);
                    rotateHandleState.current.startAngle = startAngle;
                    rotateHandleState.current.hasStarted = true;
                    return;
                }

                // 현재 손가락 위치의 각도 (상대 이동량 기준)
                const currentAngle = Math.atan2(g.dy, g.dx);
                
                // 시작 각도와의 차이를 회전값으로 설정
                const deltaAngle = currentAngle - rotateHandleState.current.startAngle!;
                rotate.setValue(rotateHandleState.current.baseRotate + deltaAngle);
            },
            onPanResponderRelease: () => {
                if (!enabled) return;
                isHandlingHandle.current = false;
                rotate.extractOffset();
                // 현재 회전값을 저장
                const currentRotate = (rotate as any)._value || 0;
                rotateHandleState.current.baseRotate = currentRotate;
                rotateHandleState.current.startAngle = null;
                rotateHandleState.current.hasStarted = false;
            },
            onPanResponderTerminate: () => {
                isHandlingHandle.current = false;
                rotateHandleState.current.startAngle = null;
                rotateHandleState.current.hasStarted = false;
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
    const isHandlingDelete = useRef(false);

    // 삭제 버튼용 responder
    const deleteResponder = useMemo(
        () => PanResponder.create({
            onStartShouldSetPanResponder: () => {
                isHandlingDelete.current = true;
                return enabled && !!onRemove;
            },
            onStartShouldSetPanResponderCapture: () => {
                isHandlingDelete.current = true;
                return enabled && !!onRemove;
            },
            onMoveShouldSetPanResponder: () => {
                // 이동 거리가 작으면 삭제 버튼 터치로 간주
                return false;
            },
            onPanResponderGrant: () => {
                isHandlingDelete.current = true;
            },
            onPanResponderMove: (e, g) => {
                // 이동 거리가 크면 삭제 취소 (드래그로 간주)
                const moveDistance = Math.sqrt(g.dx * g.dx + g.dy * g.dy);
                if (moveDistance > 10) {
                    isHandlingDelete.current = false;
                }
            },
            onPanResponderRelease: (e, g) => {
                // 이동 거리가 작으면 삭제 실행
                const moveDistance = Math.sqrt(g.dx * g.dx + g.dy * g.dy);
                if (isHandlingDelete.current && moveDistance < 10 && onRemove) {
                    onRemove();
                }
                isHandlingDelete.current = false;
            },
            onPanResponderTerminate: () => {
                isHandlingDelete.current = false;
            },
        }),
        [enabled, onRemove]
    );

    const moveResponder = useMemo(
        () => PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                onActivate?.();
                // 핸들을 터치한 경우는 false
                if (isHandlingHandle.current) return false;
                // 삭제 버튼을 터치한 경우는 false
                if (isHandlingDelete.current) return false;
                return enabled;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // 핸들을 드래그한 경우는 false
                if (isHandlingHandle.current) return false;
                // 삭제 버튼을 드래그한 경우는 false
                if (isHandlingDelete.current) return false;
                return enabled;
            },

            onPanResponderGrant: (e) => {
                translate.extractOffset();

                // 현재 rotate 값을 base로 설정
                rotate.extractOffset();
                
                // 현재 size를 base로 설정 (핀치 제스처 시작 시점의 크기)
                pinchState.current.baseSize = { ...size };
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

                    // 한 손으로 시작한 후 두 번째 손가락이 추가된 경우 초기화
                    if (pinchState.current.startDist === null) {
                        pinchState.current.startDist = dist(p1, p2);
                        pinchState.current.startAngle = angle(p1, p2);
                        // baseSize도 현재 size로 업데이트
                        pinchState.current.baseSize = { ...size };
                        return;
                    }

                    const d = dist(p1, p2);
                    const a = angle(p1, p2);

                    // 핀치 제스처로 크기 변경 (scale 대신 size 변경)
                    if (pinchState.current.startDist && pinchState.current.startDist > 0) {
                        const scaleRatio = d / pinchState.current.startDist;
                        const newWidth = clampSize(pinchState.current.baseSize.width * scaleRatio);
                        const newHeight = clampSize(pinchState.current.baseSize.height * scaleRatio);
                        setSize({ width: newWidth, height: newHeight });
                    }

                    // 회전 처리
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

            onPanResponderRelease: () => {
                translate.extractOffset();
                rotate.extractOffset();
                pinchState.current.baseRotate = pinchState.current.lastRotate;
                pinchState.current.baseSize = { ...size };
                notifyTransform();
            },
        }),
        [enabled, onActivate, onDeactivate, size]
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
                            <View style={styles.deleteBtn} {...deleteResponder.panHandlers}>
                                <FilterClose width={16} height={16} color={Colors.black} />
                            </View>
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