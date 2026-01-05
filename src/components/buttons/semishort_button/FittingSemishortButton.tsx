import React from "react";
import { BaseSemishortButton } from "./BaseSemishortButton";

interface FittingSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const FittingSemishortButton = ({
  onPress,
  isActive,
  label = "피팅하기",
}: FittingSemishortButtonProps) => {
  return <BaseSemishortButton onPress={onPress} isActive={isActive} label={label} />;
};

export default FittingSemishortButton;
