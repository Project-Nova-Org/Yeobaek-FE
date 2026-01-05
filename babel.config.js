module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@": "./src", // tsconfig와 동일하게 src 폴더를 가리키도록 설정
        },
      },
    ],
  ],
};
