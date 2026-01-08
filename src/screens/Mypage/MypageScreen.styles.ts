import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors.ts";
import { FontSize } from "@/theme/typography.ts";

export const MyPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 37,
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  gradeText: {
    fontSize: FontSize.xxs,
    fontWeight: "600",
    color: Colors.primary,
    alignItems: "center",
    marginBottom: 10,
  },
  nicknameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  nicknameText: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.primary,
  },
  divider: {
    height: 11,
    backgroundColor: Colors.border,
    width: "100%",
    marginTop: 15,
  },
  menuSection: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLabel: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.black,
    paddingLeft: 14,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  darkModeRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalBar: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
    marginRight: 12,
  },
  switchBase: {
    width: 45,
    height: 24,
    justifyContent: "center",
  },
  emailText: {
    fontSize: FontSize.xs,
    fontWeight: "300",
    color: Colors.black,
  },
  versionText: {
    fontSize: 14,
    color: Colors.black,
  },
  chevronRotate: {
    transform: [{ scaleX: -1 }],
  },
  logoutButtonContainer: {
    marginTop: 18,
    alignItems: "flex-end",
    paddingHorizontal: 33,
    paddingBottom: 40,
  },
  logoutText: {
    fontSize: FontSize.xxs,
    color: Colors.textDisabled,
  },
});
