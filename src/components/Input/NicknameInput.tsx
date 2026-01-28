import { useMemo } from "react";
import { TextInput, View, Pressable, Text } from "react-native";
import { styles } from "./NicknameInput.styles";
import { Colors } from "@/theme/colors";
import { AllDeleteIcon } from "@/assets/icons";

interface NicknameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  variant?: "square" | "rounded";
}

export function NicknameInput({
  value,
  onChange,
  placeholder,
  helperText,
  variant = "square",
}: NicknameInputProps) {
  const hasValue = value.length > 0;

  const hasInvalidChar = useMemo(() => {
    const regex = /^[가-힣a-zA-Z0-9\s]*$/;
    return !regex.test(value);
  }, [value]);

  const isOverLength = value.length > 10;
  const isError = hasInvalidChar || isOverLength;

  const errorMessage = useMemo(() => {
    if (hasInvalidChar) return "특수문자는 포함할 수 없습니다.";
    if (isOverLength) return "10자 이내로 입력해주세요.";
    return "";
  }, [hasInvalidChar, isOverLength]);

  return (
    <View>
      {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
      <View
        style={[
          styles.inputWrapper,
          variant === "rounded" && styles.rounded,
          isError && styles.inputError,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder ?? "공백 포함 10자 이내 한글, 영문, 숫자로 입력해주세요."}
          placeholderTextColor={Colors.placeholder}
          style={styles.input}
          maxLength={12}
        />

        {hasValue && (
          <Pressable style={styles.clearButton} onPress={() => onChange("")}>
            <AllDeleteIcon />
          </Pressable>
        )}
      </View>

      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}
