import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import styles from "../styles/telaalertas.styles";

const OPENWEATHER_API_KEY = "8470bcdb745e2c083de3821cf437c091";

export default function TelaAlertas({ navigation }) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscarAlertas() {
    setLoading(true);
    try {
      const cep = await AsyncStorage.getItem("cep");
      const viaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const cidade = viaCep.data.localidade;
      const uf = viaCep.data.uf;

      const climaRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${uf},BR&appid=${OPENWEATHER_API_KEY}&lang=pt_br&units=metric`
      );
      const clima = climaRes.data;

      const main = clima.weather[0]?.main.toLowerCase();
      const temp = clima.main.temp;
      const lista = [];

      if (main.includes("rain") || main.includes("chuva")) {
        lista.push({
          tipo: "Chuva Forte",
          icone: "cloud-rain",
          cor: "#2584E8",
          hora: "Agora",
          detalhe: "Há previsão de chuva intensa na sua região. Fique atento a alagamentos.",
        });
      }
      if (main.includes("storm") || main.includes("tempestade")) {
        lista.push({
          tipo: "Tempestade",
          icone: "cloud-lightning",
          cor: "#f54e42",
          hora: "Agora",
          detalhe: "Tempestade prevista. Redobre os cuidados e fique em local seguro.",
        });
      }
      if (temp >= 32) {
        lista.push({
          tipo: "Onda de Calor",
          icone: "sun",
          cor: "#F7B731",
          hora: "Agora",
          detalhe: "Temperaturas acima de 32°C. Beba água e evite exposição ao sol.",
        });
      }
      if (temp <= 14) {
        lista.push({
          tipo: "Frio Intenso",
          icone: "cloud-snow",
          cor: "#00BFFF",
          hora: "Agora",
          detalhe: "Temperaturas baixas. Agasalhe-se bem.",
        });
      }

      if (cidade === "Curitiba") {
        lista.push({
          tipo: "Vento Forte",
          icone: "wind",
          cor: "#6DD3CE",
          hora: "Hoje 12:30",
          detalhe: "Rajadas de vento acima de 60km/h previstas para esta tarde.",
        });
      }

      setAlertas(lista.length > 0 ? lista : [{
        tipo: "Sem Alertas",
        icone: "check-circle",
        cor: "#3B9AF2",
        hora: "",
        detalhe: "Nenhum alerta grave para sua região no momento.",
      }]);
    } catch {
      setAlertas([{
        tipo: "Erro",
        icone: "alert-triangle",
        cor: "#d9534f",
        hora: "",
        detalhe: "Não foi possível obter os alertas.",
      }]);
    }
    setLoading(false);
  }

  useEffect(() => {
    buscarAlertas();
  }, []);

  return (
    <View style={styles.tela}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Alertas Atuais</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2584E8" style={{ marginTop: 30 }} />
        ) : (
          <ScrollView contentContainerStyle={styles.lista}>
            {alertas.map((al, idx) => (
              <View key={idx} style={styles.card}>
                <View style={[styles.iconeArea, { backgroundColor: al.cor + "22" }]}>
                  <Feather name={al.icone} size={32} color={al.cor} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.tipo}>{al.tipo}</Text>
                  <Text style={styles.hora}>{al.hora}</Text>
                  <Text style={styles.detalhe}>{al.detalhe}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
