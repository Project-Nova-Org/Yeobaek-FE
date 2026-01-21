import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export const barStyles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBar: {
    flexDirection: "row",
    height: 62,
    backgroundColor: Colors.white,
    overflow: "hidden",
    zIndex: 9,
    justifyContent: "flex-start",
  },
  shadowLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  tabBarShadow: {
    width: "100%",
    height: 62,
  },

  floatingWrapper: {
    position: "absolute",
    top: -36,
    left: "50%",
    marginLeft: -27,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  floatingWrapperHidden: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    marginLeft: -27,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  floatingHiddenShadow: {
    width: 54,
    height: 54,
    borderRadius: 100,
  },
  floatingButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingInner: {
    width: 38,
    height: 38,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsLayer: {
    position: "absolute",
    top: -35,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 8,
  },
  actionButtonWrap: {
    position: "absolute",
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});

export const itemStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
  },
  activeText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  inactiveText: {
    color: Colors.primary,
  },
  indicator: {
    marginTop: 6,
    width: 54,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
});
