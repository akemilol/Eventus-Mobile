import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Keyboard, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import DicasClima from "../components/DicasClima";
import AlertasClima from "../components/AlertasClima";
import styles from "../styles/telainicial.styles";
import { buscarUsuarioPorId, atualizarUsuario } from "../services/usuarioService";

const OPENWEATHER_API_KEY = "8470bcdb745e2c083de3821cf437c091";

function formatarDataISO(dataStr) {
  if (!dataStr) return "";
  if (dataStr.includes("T")) return dataStr;
  const [dia, mes, ano] = dataStr.split("/");
  if (!dia || !mes || !ano) return "";
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}T00:00:00`;
}

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
      const cepBanco = (user.cep || "").replace(/\D/g, "").slice(0, 8);
      setCep(cepBanco);
      setNovoCep(cepBanco);
      setNome(user.nome || "");

      if (!cepBanco) {
        setLoading(false);
        return;
      }
      const viaCep = await axios.get(`https://viacep.com.br/ws/${cepBanco}/json/`);
      setCidade(viaCep.data.localidade);
      setUf(viaCep.data.uf);

      try {
        const climaRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${viaCep.data.localidade},${viaCep.data.uf},BR&appid=${OPENWEATHER_API_KEY}&lang=pt_br&units=metric`
        );
        setClima(climaRes.data);
      } catch {
        setClima(null);
      }
    } catch {
      setClima(null);
    }
    setLoading(false);
  }

  async function editarCepHandler() {
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      if (!usuarioId) {
        Alert.alert("Erro", "Usuário não encontrado.");
        return;
      }
      const response = await buscarUsuarioPorId(usuarioId);
      const usuario = response.data;

      const usuarioAtualizado = {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        cpf: usuario.cpf,
        cep: novoCep,
        dataNascimento: formatarDataISO(usuario.dataNascimento),
      };

      await atualizarUsuario(usuarioId, usuarioAtualizado);

      setCep(novoCep);
      setEditandoCep(false);
      Keyboard.dismiss();
      carregarDados();
      Alert.alert("Sucesso", "CEP atualizado com sucesso!");
    } catch (err) {
      Alert.alert("Erro", err.response?.data?.message || "Não foi possível atualizar o CEP.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={styles.tela}>
      <View style={styles.central}>
        <View style={styles.cardClima}>
          <View style={styles.rowTop}>
            <Text style={styles.emojiClima}>
              {clima?.weather && clima.weather[0]?.main.toLowerCase().includes("rain")
                ? "🌧️"
                : clima?.weather && clima.weather[0]?.main.toLowerCase().includes("storm")
                ? "⛈️"
                : clima?.main && clima.main.temp >= 32
                ? "☀️"
                : clima?.main && clima.main.temp <= 14
                ? "❄️"
                : "🌤️"}
            </Text>
            <TouchableOpacity onPress={() => setEditandoCep(true)}>
              <Feather name="edit-3" size={26} color="#3B9AF2" />
            </TouchableOpacity>
          </View>
          <Text style={styles.localizacao}>{cidade && uf ? `${cidade} - ${uf}` : ""}</Text>
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
              <TouchableOpacity style={styles.cepSalvar} onPress={editarCepHandler}>
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
                {clima.main.temp.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                °C
              </Text>
              <Text style={styles.cond}>
                {clima.weather[0]?.description?.replace(/^\w/, (c) => c.toUpperCase())}
              </Text>
            </>
          ) : (
            <Text style={styles.erroMsg}>Clima indisponível</Text>
          )}
        </View>
        <DicasClima clima={clima} />
        <AlertasClima clima={clima} />
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
