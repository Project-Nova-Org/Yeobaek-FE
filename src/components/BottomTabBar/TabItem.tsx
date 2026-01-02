import { Pressable, Text, View } from "react-native";
import { itemStyles } from "./BottomTabBar.styles";

interface TabItemProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function TabItem({ label, active, onPress }: TabItemProps) {
  return (
    <Pressable onPress={onPress} style={itemStyles.container}>
      <Text style={[itemStyles.label, active ? itemStyles.activeText : itemStyles.inactiveText]}>
        {label}
      </Text>

      {active && <View style={itemStyles.indicator} />}
    </Pressable>
  );
}
