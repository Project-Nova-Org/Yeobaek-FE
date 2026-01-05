import { View, Pressable, Animated, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { useFloatingMenu } from "./useFloatingMenu";
import { FloatingActionItem } from "./FloatingActionItem";
import { barStyles } from "./BottomTabBar.styles";
import { PlusIcon, OOTDIcon, ItemIcon, ClosetIcon } from "@/assets/icons";
import { Colors } from "@/theme/colors";

export function FloatingMenu() {
  const { anim, isOpen, toggle, close, plusRotation } = useFloatingMenu();

  return (
    <>
      {isOpen && <Pressable style={StyleSheet.absoluteFill} onPress={close} />}

      <View style={barStyles.actionsLayer} pointerEvents="box-none">
        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 55, y: -20 }}
          end={{ x: 0, y: -66 }}
          onPress={close}
        >
          <ItemIcon color={Colors.white} />
        </FloatingActionItem>

        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 0, y: -66 }}
          end={{ x: -78, y: -26 }}
          onPress={close}
        >
          <OOTDIcon color={Colors.white} />
        </FloatingActionItem>

        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 95, y: -5 }}
          end={{ x: 78, y: -26 }}
          onPress={close}
        >
          <ClosetIcon color={Colors.white} />
        </FloatingActionItem>
      </View>

      <View style={barStyles.floatingWrapper} pointerEvents="box-none">
        <Shadow
          startColor="rgba(0,0,0,0.1)"
          endColor="rgba(0,0,0,0)"
          distance={2}
          offset={[0, -34]}
          style={barStyles.floatingShadow}
        >
          <Pressable onPress={toggle} style={barStyles.floatingButton}>
            <View style={barStyles.floatingInner}>
              <Animated.View style={{ transform: [{ rotate: plusRotation }] }}>
                <PlusIcon color={Colors.primary} />
              </Animated.View>
            </View>
          </Pressable>
        </Shadow>
      </View>
    </>
  );
}
