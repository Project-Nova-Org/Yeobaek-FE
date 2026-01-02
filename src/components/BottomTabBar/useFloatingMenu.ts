import { useRef, useState } from "react";
import { Animated } from "react-native";

export function useFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const open = () => {
    setIsOpen(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
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
