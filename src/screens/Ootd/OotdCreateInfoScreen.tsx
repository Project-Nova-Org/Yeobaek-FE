import { useMemo, useState, useEffect } from "react";
import { ScrollView, TextInput, View, Pressable, Alert, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";

import { OotdStackParamList } from "@/types/navigation/OotdStackParamList";
import { OotdCreateHeader } from "@/components/Ootd/OotdCreateHeader";
import { OotdLayoutPreview } from "@/components/Ootd/OotdLayoutPreview";
import { AppText } from "@/components/common/AppText";
import { EditIcon } from "@/assets/icons";
import { TPO_LIST, STYLE_LIST, type TpoOption, type StyleOption } from "@/constants/ootd";
import { saveOotd, getOotdById, updateOotd } from "@/stores/ootdStore";
import { setOotdForDate } from "@/stores/calendarStore";
import { uploadOotdImagesAndGetUrls } from "@/api/ootdUpload";
import { Colors } from "@/theme/colors";
import {
  styles,
  CARD_WIDTH,
  CARD_HEIGHT,
  IMAGE_CARD_WIDTH,
  IMAGE_CARD_HEIGHT,
} from "./OotdCreateInfoScreen.styles";

type NavigationProp = StackNavigationProp<OotdStackParamList, "OotdCreateInfo">;
type RouteProps = RouteProp<OotdStackParamList, "OotdCreateInfo">;

type Props = {
  navigation: NavigationProp;
  route: RouteProps;
};

export default function OotdCreateInfoScreen({ navigation, route }: Props) {
  const { canvasItems, canvasSize, editOotdId, calendarDate } = route.params;

  const [name, setName] = useState("");
  const [tpo, setTpo] = useState<TpoOption | null>(null);
  const [style, setStyle] = useState<StyleOption | null>(null);
  const [memo, setMemo] = useState("");
  const PREVIEW_BG_COLORS = [
    { id: "gray", color: Colors.border },
    { id: "white", color: Colors.white },
  ] as const;
  const [previewBgColor, setPreviewBgColor] = useState(() => {
    if (editOotdId) {
      const o = getOotdById(editOotdId);
      if (o?.imageBgColor) return o.imageBgColor;
    }
    return PREVIEW_BG_COLORS[0].color;
  });
  const [isUploading, setIsUploading] = useState(false);

  const isEditMode = !!editOotdId;

  useEffect(() => {
    if (editOotdId) {
      const ootd = getOotdById(editOotdId);
      if (ootd) {
        setName(ootd.name);
        setTpo(ootd.tpo as TpoOption);
        setStyle(ootd.style as StyleOption);
        setMemo(ootd.memo ?? "");
        if (ootd.imageBgColor) setPreviewBgColor(ootd.imageBgColor);
      }
    }
  }, [editOotdId]);

  /** 한글/영문/숫자/공백만 허용
   * - 가-힣: 완성형
   * - \u1100-\u11FF: 한글 자모(초성·중성·종성, 조합용)
   * - \u3130-\u318F: 한글 호환 자모(ㄱ, ㅏ 등) */
  const NAME_VALID_REGEX = /^[가-힣\u1100-\u11FF\u3130-\u318Fa-zA-Z0-9\s]*$/;
  const isNameInvalid = name.length > 0 && !NAME_VALID_REGEX.test(name);

  const isCompleteEnabled = useMemo(() => {
    return (
      name.trim().length > 0 &&
      !!tpo &&
      !!style &&
      !isNameInvalid
    );
  }, [name, tpo, style, isNameInvalid]);

  const handlePressComplete = async () => {
    if (!isCompleteEnabled || !tpo || !style) return;
    if (isEditMode && editOotdId) {
      updateOotd(editOotdId, {
        name: name.trim(),
        tpo,
        style,
        memo: memo.trim() || undefined,
        items: canvasItems,
        canvasSize,
        imageBgColor: previewBgColor,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: "OOTD" },
            { name: "OotdDetail", params: { ootdId: editOotdId } },
          ],
        })
      );
    } else {
      setIsUploading(true);
      try {
        const itemsWithUrls = await uploadOotdImagesAndGetUrls(canvasItems);
        const saved = saveOotd({
          name: name.trim(),
          tpo,
          style,
          memo: memo.trim() || undefined,
          items: itemsWithUrls,
          canvasSize,
          imageBgColor: previewBgColor,
        });
        if (calendarDate) {
          setOotdForDate(calendarDate, saved.id);
        }
        const rootRouteName = navigation.getState().routes[0]?.name;
        if (rootRouteName === "Calendar") {
          navigation.reset({ index: 0, routes: [{ name: "Calendar" }] });
        } else {
          navigation.navigate("OOTD");
        }
      } catch (e) {
        Alert.alert(
          "저장 실패",
          "이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요."
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <OotdCreateHeader
        title={isEditMode ? "OOTD 수정" : "OOTD 등록"}
        onBack={() => navigation.goBack()}
        disabled={!isCompleteEnabled || isUploading}
        onNext={handlePressComplete}
        rightLabel={isUploading ? "저장 중…" : "완료"}
      />
      {isUploading && (
        <View style={styles.uploadOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <AppText style={styles.uploadOverlayText}>이미지 업로드 중…</AppText>
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
        bounces={false}
      >
          <View style={styles.headerSpacer} />

          {/* 왼쪽: 배경색 동그라미 / 오른쪽: 대표 이미지 카드 */}
          <View style={styles.imageCardRow}>
            <View style={styles.colorCirclesColumn}>
              {PREVIEW_BG_COLORS.map(({ id, color }) => (
                <Pressable
                  key={id}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    previewBgColor === color && styles.colorCircleSelected,
                  ]}
                  onPress={() => setPreviewBgColor(color)}
                />
              ))}
            </View>
            <View style={styles.imageCard}>
              <View style={[styles.imageInner, { backgroundColor: previewBgColor }]}>
                <OotdLayoutPreview
                  items={canvasItems}
                  width={IMAGE_CARD_WIDTH}
                  height={IMAGE_CARD_HEIGHT}
                  sourceWidth={canvasSize.width}
                  sourceHeight={canvasSize.height}
                />
              </View>
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("OotdCreate", {
                    canvasItems,
                    canvasSize,
                    editOotdId,
                  })
                }
              >
                <EditIcon width={18} height={18} />
              </Pressable>
            </View>
          </View>

        {/* 이름 */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <View style={styles.labelLeft}>
              <AppText style={styles.labelText}>이름</AppText>
              <AppText style={styles.requiredDot}>*</AppText>
            </View>
            {isNameInvalid && (
              <AppText style={styles.nameErrorText}>
                한글/영문/숫자만 가능합니다.
              </AppText>
            )}
          </View>
          <View style={[styles.inputWrapper, isNameInvalid && styles.inputWrapperError]}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="공백 포함 15자 이내 한글, 영문, 숫자로 입력해주세요."
              placeholderTextColor="#9CA3AF"
              style={styles.textInput}
              maxLength={15}
            />
          </View>
        </View>

        {/* TPO */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <View style={styles.labelLeft}>
              <AppText style={styles.labelText}>TPO</AppText>
              <AppText style={styles.requiredDot}>*</AppText>
            </View>
          </View>
          <View style={styles.chipRow}>
            {TPO_LIST.map((item) => {
              const active = tpo === item;
              return (
                <Pressable
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setTpo(active ? null : item)}
                >
                  <AppText style={[styles.chipText, active && styles.chipTextActive]}>{item}</AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Style */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <View style={styles.labelLeft}>
              <AppText style={styles.labelText}>Style</AppText>
              <AppText style={styles.requiredDot}>*</AppText>
            </View>
          </View>
          <View style={styles.chipRow}>
            {STYLE_LIST.map((item) => {
              const active = style === item;
              return (
                <Pressable
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setStyle(active ? null : item)}
                >
                  <AppText style={[styles.chipText, active && styles.chipTextActive]}>{item}</AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 메모 (선택) */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <View style={styles.labelLeft}>
              <AppText style={styles.labelText}>메모</AppText>
              <AppText style={{ marginLeft: 4, fontSize: 11, color: "#9CA3AF" }}>(선택)</AppText>
            </View>
          </View>
          <View style={styles.memoInputWrapper}>
            <TextInput
              value={memo}
              onChangeText={setMemo}
              placeholder="입력해주세요"
              placeholderTextColor="#9CA3AF"
              style={styles.memoInput}
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

