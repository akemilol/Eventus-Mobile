import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/telasplash.styles";

export default function TelaSplash({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Bem vindo ao Eventus</Text>
      <Text style={styles.subtitle}>
        sua plataforma para monitoramentos de chuvas intensas, ondas de calor e antecipação de desastres naturais
      </Text>
      <LinearGradient
        colors={["#78f6ff", "#2294f3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <TouchableOpacity
          style={styles.buttonTouchable}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>vamos começar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
