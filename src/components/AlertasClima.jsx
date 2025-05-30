import { View, Text } from "react-native";
import styles from "../styles/telainicial.styles";

export default function AlertasClima({ clima }) {
  if (!clima) return null;
  const temp = clima.main.temp;
  const main = clima.weather[0]?.main.toLowerCase();

  let alertas = [];
  if (main.includes("storm") || main.includes("tempestade")) {
    alertas.push("⛈️ Tempestade prevista!");
  }
  if (main.includes("rain") || main.includes("chuva")) {
    alertas.push("🌧️ Chuva prevista!");
  }
  if (temp >= 32) {
    alertas.push("🥵 Onda de calor!");
  }
  if (temp <= 14) {
    alertas.push("❄️ Frio intenso!");
  }
  if (alertas.length === 0) {
    alertas.push("👍 Condições climáticas normais.");
  }

  return (
    <View style={styles.cardAlertas}>
      <Text style={styles.alertaTitulo}>Fique atento:</Text>
      {alertas.map((msg, idx) => (
        <Text style={styles.alertaTxt} key={idx}>{msg}</Text>
      ))}
    </View>
  );
}
