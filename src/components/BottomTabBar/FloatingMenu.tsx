import { View, Pressable, Animated, StyleSheet } from "react-native";
import { useFloatingMenu } from "./useFloatingMenu";
import { FloatingActionItem } from "./FloatingActionItem";
import { barStyles } from "./BottomTabBar.styles";
import { PlusIcon, OOTDIcon, ItemIcon, ClosetIcon } from "@/assets/icons";
import { Colors } from "@/theme/colors";

export function FloatingMenu() {
  const { anim, isOpen, toggle, close, plusRotation } = useFloatingMenu();
  const handleItemPress = () => {
    close();
  };
  const handleOOTDPress = () => {
    close();
  };
  const handleClosetPress = () => {
    close();
  };

  return (
    <>
      {isOpen && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={close}
          accessibilityLabel="메뉴닫기"
          accessibilityRole="button"
        />
      )}

      <View style={barStyles.actionsLayer} pointerEvents="box-none">
        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 55, y: -20 }}
          end={{ x: 0, y: -66 }}
          onPress={handleItemPress}
        >
          <ItemIcon color={Colors.white} />
        </FloatingActionItem>

        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 0, y: -66 }}
          end={{ x: -78, y: -26 }}
          onPress={handleOOTDPress}
        >
          <OOTDIcon color={Colors.white} />
        </FloatingActionItem>

        <FloatingActionItem
          anim={anim}
          start={{ x: 120, y: 70 }}
          mid={{ x: 95, y: -5 }}
          end={{ x: 78, y: -26 }}
          onPress={handleClosetPress}
        >
          <ClosetIcon color={Colors.white} />
        </FloatingActionItem>
      </View>

      <Pressable
        onPress={toggle}
        style={barStyles.floatingButton}
        accessibilityLabel={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View style={barStyles.floatingInner}>
          <Animated.View style={{ transform: [{ rotate: plusRotation }] }}>
            <PlusIcon color={Colors.primary} />
          </Animated.View>
        </View>
      </Pressable>
    </>
  );
}
