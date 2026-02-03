import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import { AppText as Text } from "@/components/common/AppText";
import { GalleryIcon, HelpIcon, SendIcon } from "@/assets/icons";
import { ChatbotImage } from "@/assets/images";
import { chatBotStyles as styles } from "./ChatBot.styles";
import { createInitialMessages, Message, getCurrentTime, AI_RESPONSES } from "./ChatBotData";

export function ChatBot() {
  const navigation = useNavigation();
  const initialMessages = useMemo(() => createInitialMessages(), []);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const timerRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const nextMessageIdRef = useRef(
    initialMessages.length ? Math.max(...initialMessages.map((m) => m.id)) + 1 : 1,
  );
  const getNextMessageId = () => nextMessageIdRef.current++;

  useEffect(() => {
    return () => {
      timerRefs.current.forEach((t) => clearTimeout(t));
      timerRefs.current.clear();
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    // 사용자 메시지 생성
    const userMsg: Message = {
      id: getNextMessageId(),
      text: inputText,
      sender: "user",
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // AI 자동 응답 시뮬레이션
    const timer = setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMsg: Message = {
        id: getNextMessageId(),
        text: randomResponse,
        sender: "ai",
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      timerRefs.current.delete(timer);
    }, 1000);
    timerRefs.current.add(timer);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="백여사"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
        right={
          <HeaderRight
            type="icon"
            onPress={() => setShowTooltip(!showTooltip)}
            icons={[<HelpIcon key="help" width={24} height={24} />]}
          />
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {showTooltip && (
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>
              {
                "엄마봇은 생활 관련 조언이나 꿀팁을 알려줍니다.\n 모르는 것은 뭐든 물어보세요! 엄마~~~ "
              }
            </Text>
          </View>
        )}

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.dateDivider}>
            <View style={styles.dateLine} />
            <Text style={styles.dateTabText}>
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </Text>
            <View style={styles.dateLine} />
          </View>

          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.bubbleWrapper,
                msg.sender === "user" ? styles.userWrapper : styles.aiWrapper,
              ]}
            >
              {msg.sender === "ai" && (
                <View style={styles.aiProfileWrapper}>
                  <Image source={ChatbotImage} style={styles.aiProfileImage} />
                </View>
              )}

              <View style={[styles.messageRow, msg.sender === "user" && { flexDirection: "row" }]}>
                {msg.sender === "user" && <Text style={styles.timeText}>{msg.time}</Text>}

                <View
                  style={[
                    styles.bubble,
                    msg.sender === "user" ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.sender === "user" ? styles.userText : styles.aiText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>

                {msg.sender === "ai" && <Text style={styles.timeText}>{msg.time}</Text>}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            accessibilityLabel="메시지 입력"
          />
          <Pressable
            style={styles.galleryButton}
            onPress={() => console.log("갤러리 열기")}
            accessibilityRole="button"
            accessibilityLabel="갤러리 열기"
          >
            <GalleryIcon width={30} height={30} color="#828282" />
          </Pressable>

          <Pressable
            style={styles.sendButton}
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="메시지 전송"
          >
            <SendIcon width={35} height={35} color="#FFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
