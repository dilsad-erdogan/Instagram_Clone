const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Firebase'in Metro ile çalışmasını sağlamak için resolver ayarları ekliyoruz
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "cjs"],
};

// NativeWind yapılandırmasını ekleyerek CSS desteğini sağlıyoruz
module.exports = withNativeWind(config, { input: "./global.css" });