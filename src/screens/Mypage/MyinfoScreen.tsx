import React, { useState } from "react";
import { View, ScrollView, Pressable, Image, TextInput } from "react-native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { AppText as Text } from "@/components/common/AppText";
import { MyinfoScreenStyles as styles } from "./MyinfoScreen.styles";
import Alert from "@/components/Alert/Alert";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import { Colors } from "@/theme/colors";
import { HelpIcon, MaleIcon, FemaleIcon } from "@/assets/icons";

const InfoScreen = ({ navigation }: any) => {
  const [isExitAlertVisible, setIsExitAlertVisible] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleBack = () => {
    setIsExitAlertVisible(true);
  };

  const isFormValid = height && weight && gender && image;

  return (
    <View style={styles.container}>
      <AppHeader
        title="맞춤 정보"
        left={<HeaderLeft type="icon" onPress={handleBack} />}
        right={
          <Pressable onPress={() => {}} hitSlop={10}>
            <HelpIcon width={24} height={24} />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            {image ? (
              <Image source={{ uri: image }} style={styles.fullImage} />
            ) : (
              <View style={styles.emptyImage} />
            )}
            <Pressable style={styles.imageButton} onPress={() => setIsSheetVisible(true)}>
              <Text style={styles.imageButtonText}>
                {image ? "전신 사진 변경하기" : "전신 사진 등록하기"}
              </Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.sectionTitle}>체형 정보</Text>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>키</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="키를 입력해주세요..."
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <Text style={styles.unitText}>cm</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>몸무게</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="몸무게를 입력해주세요..."
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Text style={styles.unitText}>kg</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>성별</Text>
          <View style={styles.genderContainer}>
            <Pressable
              style={[styles.genderButton, gender === "male" && styles.genderActive]}
              onPress={() => setGender("male")}
            >
              <Text style={[styles.genderText, gender === "male" && styles.genderTextActive]}>
                남성
              </Text>
              <MaleIcon
                width={16}
                height={16}
                color={gender === "male" ? Colors.white : Colors.primary}
              />
            </Pressable>

            <Pressable
              style={[styles.genderButton, gender === "female" && styles.genderActive]}
              onPress={() => setGender("female")}
            >
              <Text style={[styles.genderText, gender === "female" && styles.genderTextActive]}>
                여성
              </Text>
              <FemaleIcon
                width={16}
                height={16}
                color={gender === "female" ? Colors.white : Colors.primary}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[styles.submitButton, isFormValid ? styles.submitActive : styles.submitDisabled]}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>등 록</Text>
        </Pressable>
      </ScrollView>

      <Alert
        visible={isExitAlertVisible}
        message={"맞춤정보 편집을\n중단하시겠습니까?"}
        onConfirm={() => navigation.goBack()}
        onCancel={() => setIsExitAlertVisible(false)}
      />

      <AddItemBottomSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
        onCamera={() => {
          setIsSheetVisible(false);
          // 카메라 로직
        }}
        onGallery={() => {
          setIsSheetVisible(false);
          // 갤러리 로직
        }}
      />
    </View>
  );
};

export default InfoScreen;
