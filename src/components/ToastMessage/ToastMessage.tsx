import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { toastStyles } from "./ToastMessage.styles";
import { StarIcon, EmptyStarIcon, SignedIcon, DeleteIcon } from "@/assets/icons";

export type ToastType = "star" | "empty_star" | "signed" | "delete";

interface ToastMessageProps {
  type: ToastType;
  onHide: () => void;
}

const ToastMessage = ({ type, onHide }: ToastMessageProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const onHideRef = useRef(onHide);
  useEffect(() => {
    onHideRef.current = onHide;
  }, [onHide]);

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case "star":
        return { icon: <StarIcon width={17} height={17} />, text: "즐겨찾기 등록 되었습니다" };
      case "empty_star":
        return { icon: <EmptyStarIcon width={17} height={17} />, text: "즐겨찾기 해제 되었습니다" };
      case "signed":
        return { icon: <SignedIcon width={17} height={17} />, text: "옷장이 수정 되었습니다" };
      case "delete":
        return { icon: <DeleteIcon width={17} height={17} />, text: "OOTD가 삭제 되었습니다" };
    }
  };

  const { icon, text } = getToastConfig(type);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onHideRef.current?.();
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <Animated.View style={[toastStyles.container, { opacity }]}>
      <View style={toastStyles.iconWrapper}>{icon}</View>
      <Text style={toastStyles.messageText}>{text}</Text>
    </Animated.View>
  );
};

export default ToastMessage;
