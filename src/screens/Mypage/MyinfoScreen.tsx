import React, { useState, useMemo } from "react";
import { View, ScrollView, Pressable, Image, TextInput } from "react-native";
import { AppHeader } from "@/components/Header/AppHeader";
import { HeaderLeft } from "@/components/Header/HeaderLeft";
import { HeaderRight } from "@/components/Header/HeaderRight";
import { AppText as Text } from "@/components/common/AppText";
import { MyinfoScreenStyles as styles } from "./MyinfoScreen.styles";
import Alert from "@/components/Alert/Alert";
import { AddItemBottomSheet } from "@/components/Modal/AddItemBottomSheet/AddItemBottomSheet";
import { Colors } from "@/theme/colors";
import { HelpIcon, MaleIcon, FemaleIcon } from "@/assets/icons";
import FullbodyRegisterButton from "@/components/Buttons/medium_button/FullbodyRegisterButton";
import AddLongButton from "@/components/Buttons/long_button/AddLongButton";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Myinfo">;

const InfoScreen = ({ navigation, route }: Props) => {
  const initialData = route.params?.initialData;

  const defaultData = useMemo(
    () => ({
      gender: initialData?.gender || null,
      height: initialData?.height || "",
      weight: initialData?.weight || "",
      image: initialData?.image || null,
    }),
    [initialData],
  );

  const [isExitAlertVisible, setIsExitAlertVisible] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [gender, setGender] = useState<"male" | "female" | null>(defaultData.gender);
  const [height, setHeight] = useState(defaultData.height);
  const [weight, setWeight] = useState(defaultData.weight);
  const [image, _setImage] = useState<string | null>(defaultData.image);

  const isDataChanged =
    gender !== defaultData.gender ||
    height !== defaultData.height ||
    weight !== defaultData.weight ||
    image !== defaultData.image;

  const canSubmit = isDataChanged;

  const handleNumericInput = (text: string, setter: (val: string) => void) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setter(cleaned);
  };

  const handleBack = () => {
    if (isDataChanged) {
      setIsExitAlertVisible(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="맞춤 정보"
        left={<HeaderLeft type="icon" onPress={handleBack} />}
        right={
          <HeaderRight
            type="icon"
            onPress={() => setShowTooltip(!showTooltip)}
            icons={[<HelpIcon key="help" width={24} height={24} />]}
          />
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageSection}>
          {showTooltip && (
            <View style={styles.tooltipContainer}>
              <Text style={styles.tooltipText}>
                전신 사진을 등록해주면 가상피팅에서 사용할 수 있어요!{"\n"}
                여러분의 개인정보는 필수가 아니에요!
              </Text>
            </View>
          )}
          <View style={styles.imagePlaceholder}>
            {image ? (
              <Image source={{ uri: image }} style={styles.fullImage} />
            ) : (
              <View style={styles.emptyImage} />
            )}
          </View>
          <View style={{ marginTop: 16, width: "100%" }}>
            <FullbodyRegisterButton
              onPress={() => setIsSheetVisible(true)}
              label={image ? "전신 사진 변경하기" : "전신 사진 등록하기"}
            />
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
              onChangeText={(text) => handleNumericInput(text, setHeight)}
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
              onChangeText={(text) => handleNumericInput(text, setWeight)}
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

        <View style={styles.addButton}>
          <AddLongButton
            label="등 록"
            isActive={canSubmit}
            onPress={() => {
              console.log("저장 데이터:", { height, weight, gender, image });
              navigation.goBack(); // 저장 후 이동
            }}
          />
        </View>
      </ScrollView>

      <Alert
        visible={isExitAlertVisible}
        message={"맞춤정보 편집을\n중단하시겠습니까?"}
        onConfirm={() => {
          setIsExitAlertVisible(false);
          navigation.goBack();
        }}
        onCancel={() => setIsExitAlertVisible(false)}
      />

      <AddItemBottomSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
        // ESLint 오류 방지를 위해 임시로 setImage 연결
        onCamera={() => setIsSheetVisible(false)}
        onGallery={() => setIsSheetVisible(false)}
      />
    </View>
  );
};

export default InfoScreen;
