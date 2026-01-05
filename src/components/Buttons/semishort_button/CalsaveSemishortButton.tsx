import React from "react";
import { BaseSemishortButton } from "./BaseSemishortButton";

interface CalsaveSemishortButtonProps {
  onPress: () => void;
  isActive: boolean;
  label?: string;
}

const CalsaveSemishortButton = ({
  onPress,
  isActive,
  label = "달력 저장",
}: CalsaveSemishortButtonProps) => {
  return <BaseSemishortButton onPress={onPress} isActive={isActive} label={label} />;
};

export default CalsaveSemishortButton;
