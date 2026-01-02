import { Text as RNText, TextProps } from "react-native";

export function AppText(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: "PretendardVariable",
        },
        props.style,
      ]}
    />
  );
}
