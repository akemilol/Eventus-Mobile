import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import styles from "../styles/telainicial.styles";
import { buscarUsuarioPorId, atualizarUsuario } from "../services/usuarioService";

const OPENWEATHER_API_KEY = "8470bcdb745e2c083de3821cf437c091";

export default function TelaInicial({ navigation }) {
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [editandoCep, setEditandoCep] = useState(false);
  const [novoCep, setNovoCep] = useState("");
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    setLoading(true);
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      if (!usuarioId) {
        setLoading(false);
        return;
      }
      const response = await buscarUsuarioPorId(usuarioId);
      const user = response.data;
      const cepLimpo = (user.cep || "").replace(/\D/g, "").slice(0, 8);
      setCep(cepLimpo);
      setNovoCep(cepLimpo);
      setNome(user.nome || "");

      if (!cepLimpo) {
        setLoading(false);
        return;
      }
      const viaCep = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      setCidade(viaCep.data.localidade);
      setUf(viaCep.data.uf);

      try {
        const climaRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${viaCep.data.localidade},${viaCep.data.uf},BR&appid=${OPENWEATHER_API_KEY}&lang=pt_br&units=metric`
        );
        setClima(climaRes.data);
      } catch (err) {
        setClima(null);
      }
    } catch (e) {
      setClima(null);
    }
    setLoading(false);
  }

  async function salvarCep(novo) {
    setCep(novo);
    setEditandoCep(false);
    Keyboard.dismiss();

    const usuarioId = await AsyncStorage.getItem("usuarioId");
    const response = await buscarUsuarioPorId(usuarioId);
    const usuario = response.data;
    usuario.cep = novo;
    await atualizarUsuario(usuarioId, usuario);

    await AsyncStorage.setItem("cep", novo);
    carregarDados();
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function getDicas() {
    if (!clima) return [];
    const main = clima.weather[0]?.main.toLowerCase();
    const temp = clima.main.temp;
    if (main.includes("rain") || main.includes("chuva")) {
      return [
        "🌧️ Leve guarda-chuva!",
        "⚡ Evite áreas alagadas",
        "🚗 Redobre atenção no trânsito"
      ];
    }
    if (main.includes("storm") || main.includes("tempestade")) {
      return [
        "⛈️ Fique em local seguro",
        "🔌 Desligue aparelhos eletrônicos",
        "🌳 Afaste-se de árvores e postes"
      ];
    }
    if (main.includes("flood") || main.includes("alagamento")) {
      return [
        "💧 Evite transitar por ruas alagadas",
        "🆘 Procure abrigo elevado",
        "📞 Ligue 199 em emergência"
      ];
    }
    if (temp >= 32) {
      return [
        "☀️ Use protetor solar",
        "💧 Beba muita água",
        "🧢 Use roupas leves",
        "🚫 Evite exposição ao sol"
      ];
    }
    if (temp <= 14) {
      return [
        "🧣 Use roupas quentes",
        "☕ Tome bebidas quentes",
        "❄️ Evite mudanças bruscas de temperatura"
      ];
    }
    return [
      "✅ Aproveite o dia!",
      "🔔 Fique atento às atualizações"
    ];
  }

  function getAlertas() {
    if (!clima) return [];
    const temp = clima.main.temp;
    const main = clima.weather[0]?.main.toLowerCase();
    let alertas = [];
    if (temp >= 32) {
      alertas.push("🥵 Onda de calor!");
      alertas.push("Desconforto, suor excessivo, risco de desidratação.");
    }
    if (main.includes("rain") || main.includes("chuva")) {
      alertas.push("🌧️ Vai chover hoje.");
    }
    if (main.includes("storm") || main.includes("tempestade")) {
      alertas.push("⛈️ Tempestade prevista!");
    }
    if (main.includes("flood") || main.includes("alagamento")) {
      alertas.push("💧 Risco de alagamento!");
    }
    if (alertas.length === 0) {
      alertas.push("👍 Condições normais");
    }
    return alertas;
  }

  return (
    <View style={styles.tela}>
      <View style={styles.central}>
        <View style={styles.cardClima}>
          <View style={styles.rowTop}>
            <Text style={styles.emojiClima}>
              {clima?.weather && clima.weather[0]?.main.toLowerCase().includes("rain") ? "🌧️"
                : clima?.weather && clima.weather[0]?.main.toLowerCase().includes("storm") ? "⛈️"
                : clima?.main && clima.main.temp >= 32 ? "☀️"
                : clima?.main && clima.main.temp <= 14 ? "❄️"
                : "🌤️"}
            </Text>
            <TouchableOpacity onPress={() => setEditandoCep(true)}>
              <Feather name="edit-3" size={26} color="#3B9AF2" />
            </TouchableOpacity>
          </View>
          <Text style={styles.localizacao}>
            {cidade && uf ? `${cidade} - ${uf}` : ""}
          </Text>
          {editandoCep ? (
            <View style={styles.cepRow}>
              <TextInput
                placeholder="Novo CEP"
                style={styles.cepInput}
                value={novoCep}
                keyboardType="numeric"
                maxLength={8}
                onChangeText={setNovoCep}
              />
              <TouchableOpacity style={styles.cepSalvar} onPress={() => salvarCep(novoCep)}>
                <Feather name="check-circle" size={24} color="#3B9AF2" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.cepLabel}>CEP: {cep}</Text>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#3B9AF2" style={{ marginTop: 24 }} />
          ) : clima ? (
            <>
              <Text style={styles.temp}>
                {clima.main.temp.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}°C
              </Text>
              <Text style={styles.cond}>
                {clima.weather[0]?.description?.replace(/^\w/, c => c.toUpperCase())}
              </Text>
            </>
          ) : (
            <Text style={styles.erroMsg}>Clima indisponível</Text>
          )}
        </View>
        <View style={styles.separador} />
        <View style={styles.cardDicas}>
          <Text style={styles.dicasTitulo}>Dicas de hoje:</Text>
          {getDicas().map((dica, idx) => (
            <View style={styles.dicaItem} key={idx}>
              <Text style={styles.dicaTxt}>{dica}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separador} />
        <View style={styles.cardAlertas}>
          <Text style={styles.alertaTitulo}>Fique atento:</Text>
          {getAlertas().map((alerta, idx) => (
            <View style={styles.alertaItem} key={idx}>
              <Text style={styles.alertaTxt}>{alerta}</Text>
            </View>
          ))}
        </View>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
