import React from "react";
import { BaseSemishortButton } from "./BaseSemishortButton";

interface SaveSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const SaveSemishortButton = ({
  onPress,
  isActive,
  label = "저장하기",
}: SaveSemishortButtonProps) => {
  return <BaseSemishortButton onPress={onPress} isActive={isActive} label={label} />;
};

export default SaveSemishortButton;
