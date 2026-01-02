import { useRef, useState, useEffect } from "react";
import { Animated } from "react-native";

export function useFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 애니메이션 중지
      // eslint-disable-next-line react-hooks/exhaustive-deps
      animationRef.current?.stop();
    };
  }, []);

  const open = () => {
    setIsOpen(true);
    animationRef.current = Animated.timing(anim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    });
    animationRef.current.start();
  };

  const close = () => {
    animationRef.current = Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    });
    animationRef.current.start();
  };

  const toggle = () => {
    isOpen ? close() : open();
  };

  const plusRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-135deg"],
  });

  return {
    anim,
    isOpen,
    toggle,
    close,
    plusRotation,
  };
}
