import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
        "OpenSans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
        "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 28, marginBottom: 12 }}>
        Eventus App
      </Text>
      <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 18, marginBottom: 6 }}>
        Bem vindo ao seu projeto!
      </Text>
      <Text style={{ fontFamily: "OpenSans-Italic", fontSize: 16, color: "#555" }}>
        Segurança e prevenção em eventos climáticos extremos.
      </Text>
    </View>
  );
}
