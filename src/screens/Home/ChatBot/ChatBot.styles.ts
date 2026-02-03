import { StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";
import { FontSize } from "@/theme/typography.ts";

export const chatBotStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatList: {
    padding: 20,
    paddingBottom: 20,
  },
  dateDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  dateLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
  },
  dateTabText: {
    fontSize: FontSize.xs,
    color: Colors.gray400,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "100%",
  },

  timeText: {
    fontSize: FontSize.xxs,
    color: Colors.gray400,
    marginHorizontal: 5,
    marginBottom: 2,
  },

  bubbleWrapper: {
    marginBottom: 25,
    flexDirection: "row",
  },
  userWrapper: {
    justifyContent: "flex-end",
  },
  aiWrapper: {
    justifyContent: "flex-start",
  },

  aiProfileWrapper: {
    marginRight: 8,
    marginBottom: 4,
  },
  aiProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray400,
  },

  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: Colors.white,
    borderBottomRightRadius: 4,
    elevation: 1,
  },
  aiBubble: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: Colors.gray400,
    fontSize: FontSize.base,
    lineHeight: 20,
  },
  userText: {
    color: Colors.black,
  },
  aiText: {
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },

  galleryButton: {
    padding: 8,
    marginRight: 4,
  },

  input: {
    flex: 1,
    backgroundColor: Colors.messageBubble,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: FontSize.base,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  tooltipContainer: {
    position: "absolute",
    top: 10,
    right: 20,
    left: 20,
    backgroundColor: Colors.help,
    padding: 18,
    borderRadius: 12,
    zIndex: 100,
  },
  tooltipText: {
    fontWeight: "700",
    fontSize: FontSize.xxs,
    color: Colors.primary,
    textAlign: "center",
  },
});
