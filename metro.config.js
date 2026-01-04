const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = {
    transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
        assetExts: ["bin", "txt", "jpg", "png"],
        sourceExts: ["js", "jsx", "ts", "tsx", "svg"],
    },
};

