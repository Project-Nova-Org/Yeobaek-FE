import React, { useState, useRef } from "react";
import { View, Pressable, ScrollView, Animated, Easing } from "react-native";
import { AppText as Text } from "@/components/common/AppText";
import { MyPageStyles as styles } from "./MypageScreen.styles";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import Alert from "@/components/Alert/Alert";
import { Colors } from "@/theme/colors.ts";
import {
  EditIcon,
  KakaoIcon,
  GoogleIcon,
  DarkModeOnIcon,
  DarkModeOffIcon,
  FirstLogoIcon,
  SecondLogoIcon,
  ThirdLogoIcon,
  LoginLogoIcon,
  UndoIcon,
} from "@/assets/icons";

const MyPageScreen = ({ navigation }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleDarkMode = () => {
    const toValue = isDarkMode ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setIsDarkMode(!isDarkMode);
  };
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const userData = {
    email: "yeobeak@gachon.ac.kr",
    provider: "kakao",
    itemCount: 45,
    nickname: "동르반 99세",
  };

  const getGradeInfo = (count: number) => {
    if (count >= 100) return { Icon: LoginLogoIcon, label: "패셔니스타" };
    if (count >= 50) return { Icon: ThirdLogoIcon, label: "무드 설계자" };
    if (count >= 10) return { Icon: SecondLogoIcon, label: "취향 수집가" };
    return { Icon: FirstLogoIcon, label: "패션 입문자" };
  };

  const { Icon: ProfileLogo, label: gradeLabel } = getGradeInfo(userData.itemCount);

  return (
    <View style={styles.container}>
      <AppHeader
        title="마이페이지"
        left={<HeaderLeft type="icon" onPress={() => navigation.goBack()} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.logoContainer}>
            <ProfileLogo width={120} height={120} />
          </View>
          <Text style={styles.gradeText}>{gradeLabel}</Text>
          <View style={styles.nicknameRow}>
            <Text style={styles.nicknameText}>{userData.nickname}</Text>
            <Pressable onPress={() => navigation.navigate("NicknameEditScreen")} hitSlop={15}>
              <EditIcon width={14} height={14} color={Colors.primary} />
            </Pressable>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.menuSection}>
          <View style={styles.menuItem}>
            <Text style={styles.menuLabel}>소셜 계정</Text>
            <View style={styles.menuRight}>
              <Text style={styles.emailText}>{userData.email}</Text>
              {userData.provider === "kakao" ? (
                <KakaoIcon width={20} height={20} />
              ) : (
                <GoogleIcon width={20} height={20} />
              )}
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuLabel}>다크모드</Text>
            <View style={styles.darkModeRight}>
              <View style={styles.verticalBar} />
              <Pressable onPress={toggleDarkMode} hitSlop={10}>
                <View style={styles.switchBase}>
                  <Animated.View style={{ transform: [{ translateX }] }}>
                    {isDarkMode ? (
                      <DarkModeOnIcon width={45} height={24} />
                    ) : (
                      <DarkModeOffIcon width={45} height={24} />
                    )}
                  </Animated.View>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.menuItem} onPress={() => navigation.navigate("MyinfoScreen")}>
            <Text style={styles.menuLabel}>맞춤 정보</Text>
            <View style={styles.chevronRotate}>
              <UndoIcon width={8} height={13} color={Colors.primary} />
            </View>
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => navigation.navigate("HelpScreen")}>
            <Text style={styles.menuLabel}>도움말</Text>
            <View style={styles.chevronRotate}>
              <UndoIcon width={8} height={13} color={Colors.primary} />
            </View>
          </Pressable>
          <View style={styles.menuItem}>
            <Text style={styles.menuLabel}>버전</Text>
            <Text style={styles.versionText}>0.0.1</Text>
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <Pressable onPress={() => setIsLogoutAlertVisible(true)} hitSlop={20}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Alert
        visible={isLogoutAlertVisible}
        message="로그아웃 하시겠습니까?"
        onConfirm={() => {
          setIsLogoutAlertVisible(false);
        }}
        onCancel={() => setIsLogoutAlertVisible(false)}
      />
    </View>
  );
};

export default MyPageScreen;
