import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaSplash from "./src/screens/TelaSplash";
import TelaLogin from "./src/screens/TelaLogin";
import TelaCadastro from "./src/screens/TelaCadastro";
import TelaInicial from "./src/screens/TelaInicial";
import TelaAlertas from "./src/screens/TelaAlertas";
import TelaAbrigos from "./src/screens/TelaAbrigos";
import TelaPerfil from "./src/screens/TelaPerfil";
import TelaRelatoEvento from "./src/screens/TelaRelatoEvento";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TelaSplash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TelaSplash" component={TelaSplash} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Inicial" component={TelaInicial} />
          <Stack.Screen name="Alertas" component={TelaAlertas} />
          <Stack.Screen name="Abrigos" component={TelaAbrigos} />
          <Stack.Screen name="Perfil" component={TelaPerfil} />
          <Stack.Screen name="RelatoEvento" component={TelaRelatoEvento} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
