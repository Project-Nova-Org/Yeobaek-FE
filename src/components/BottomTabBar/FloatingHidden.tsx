import { View } from "react-native";
import { barStyles } from "@/components/BottomTabBar/BottomTabBar.styles.ts";
import { Shadow } from "react-native-shadow-2";

export function FloatingHidden() {
  return (
    <View style={barStyles.floatingWrapperHidden} pointerEvents="box-none">
      <Shadow
        startColor="rgba(0,0,0,0.1)"
        endColor="rgba(0,0,0,0)"
        distance={10}
        offset={[0, -1]}
        style={barStyles.floatingHiddenShadow}
      />
    </View>
  );
}
