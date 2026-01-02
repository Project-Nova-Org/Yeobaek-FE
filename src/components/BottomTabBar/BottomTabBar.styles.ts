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
    height: 72,
    backgroundColor: Colors.white,
    overflow: "hidden",
    zIndex: 9,
    justifyContent: "flex-start",
  },
  floatingButton: {
    position: "absolute",
    top: -35,
    left: "50%",
    width: 54,
    height: 54,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -27.5 }],
    zIndex: 10,
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
    elevation: 8,
  },
  actionIconDummy: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: Colors.white,
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
