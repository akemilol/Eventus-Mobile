import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/telasplash.styles";

export default function TelaSplash({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Bem vindo ao Eventus</Text>
      <Text style={styles.subtitle}>
        sua plataforma para monitoramentos de chuvas intensas, ondas de calor e antecipação de desastres naturais
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>vamos começar</Text>
      </TouchableOpacity>
    </View>
  );
}
