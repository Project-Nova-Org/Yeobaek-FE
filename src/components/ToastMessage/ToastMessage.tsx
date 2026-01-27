import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { toastStyles } from "./ToastMessage.styles";
import { StarIcon, EmptyStarIcon, SignedIcon, DeleteIcon } from "@/assets/icons";

export type ToastAction = "star" | "unstar" | "signed" | "delete";
export type ToastTarget = "closet" | "ootd" | "item";

interface ToastMessageProps {
  action: ToastAction;
  target: ToastTarget;
  onHide: () => void;
}

const ACTION_ICON_MAP: Record<ToastAction, React.ReactNode> = {
  star: <StarIcon width={17} height={17} />,
  unstar: <EmptyStarIcon width={17} height={17} />,
  signed: <SignedIcon width={17} height={17} />,
  delete: <DeleteIcon width={17} height={17} />,
};

const TARGET_LABEL_MAP: Record<ToastTarget, string> = {
  closet: "옷장",
  ootd: "OOTD",
  item: "아이템",
};

const getToastText = (action: ToastAction, target: ToastTarget) => {
  const label = TARGET_LABEL_MAP[target];

  switch (action) {
    case "star":
      return `즐겨찾기가 등록 되었습니다`;
    case "unstar":
      return `즐겨찾기가 해제 되었습니다`;
    case "signed":
      return `${label}이 수정 되었습니다`;
    case "delete":
      return `${label}이 삭제 되었습니다`;
  }
};

const ToastMessage = ({ action, target, onHide }: ToastMessageProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const onHideRef = useRef(onHide);

  useEffect(() => {
    onHideRef.current = onHide;
  }, [onHide]);

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
        onHideRef.current();
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <Animated.View style={[toastStyles.container, { opacity }]}>
      <View style={toastStyles.iconWrapper}>{ACTION_ICON_MAP[action]}</View>
      <Text style={toastStyles.messageText}>{getToastText(action, target)}</Text>
    </Animated.View>
  );
};

export default ToastMessage;
