import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import styles from "../styles/telaalertas.styles";
import { buscarUsuarioPorId } from "../services/usuarioService";

const OPENWEATHER_API_KEY = "8470bcdb745e2c083de3821cf437c091";

export default function TelaAlertas({ navigation }) {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscarAlertas() {
    setLoading(true);
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("ID do usuário não encontrado");

      const res = await buscarUsuarioPorId(usuarioId);
      const cep = (res.data.cep || "").replace(/\D/g, "").slice(0, 8);
      if (!cep) throw new Error("CEP não encontrado para o usuário");

      const viaCepRes = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const cidade = viaCepRes.data.localidade;
      const uf = viaCepRes.data.uf;
      if (!cidade || !uf) throw new Error("Cidade ou UF não encontrada pelo CEP");

      const climaRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${uf},BR&appid=${OPENWEATHER_API_KEY}&lang=pt_br&units=metric`
      );
      const clima = climaRes.data;
      const main = clima.weather[0]?.main.toLowerCase();
      const temp = clima.main.temp;

      const listaAlertas = [];

      if (main.includes("rain") || main.includes("chuva")) {
        listaAlertas.push({
          tipo: "Chuva Forte",
          icone: "cloud-rain",
          cor: "#2584E8",
          hora: "Agora",
          detalhe: "Há previsão de chuva intensa na sua região. Fique atento a alagamentos.",
        });
      }
      if (main.includes("storm") || main.includes("tempestade")) {
        listaAlertas.push({
          tipo: "Tempestade",
          icone: "cloud-lightning",
          cor: "#f54e42",
          hora: "Agora",
          detalhe: "Tempestade prevista. Redobre os cuidados e fique em local seguro.",
        });
      }
      if (temp >= 32) {
        listaAlertas.push({
          tipo: "Onda de Calor",
          icone: "sun",
          cor: "#F7B731",
          hora: "Agora",
          detalhe: "Temperaturas acima de 32°C. Beba água e evite exposição ao sol.",
        });
      }
      if (temp <= 14) {
        listaAlertas.push({
          tipo: "Frio Intenso",
          icone: "cloud-snow",
          cor: "#00BFFF",
          hora: "Agora",
          detalhe: "Temperaturas baixas. Agasalhe-se bem.",
        });
      }

      setAlertas(
        listaAlertas.length > 0
          ? listaAlertas
          : [
              {
                tipo: "Sem Alertas",
                icone: "check-circle",
                cor: "#3B9AF2",
                hora: "",
                detalhe: "Nenhum alerta importante para sua região.",
              },
            ]
      );
    } catch (e) {
      setAlertas([
        {
          tipo: "Erro ao buscar alertas",
          icone: "alert-triangle",
          cor: "#d9534f",
          hora: "",
          detalhe: "Não foi possível obter os alertas.",
        },
      ]);
      Alert.alert("Erro", e.message || "Erro desconhecido ao obter alertas.");
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
