import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
import styles from "../styles/telarelatoevento.styles";
import { enviarRelato } from "../services/relatoService";

const tipos = [
  { label: "Alagamento", value: "alagamento", icon: "droplet" },
  { label: "Queda de árvore", value: "arvore", icon: "activity" },
  { label: "Deslizamento", value: "deslizamento", icon: "alert-triangle" },
  { label: "Outro", value: "outro", icon: "edit" },
];

function formatDate(value) {
  return value.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10);
}

function dateToIso(str) {
  if (!str || str.length < 10) return new Date().toISOString();
  const [day, month, year] = str.split('/');
  return new Date(`${year}-${month}-${day}T00:00:00`).toISOString();
}

export default function TelaRelatoEvento({ navigation }) {
  const [tipo, setTipo] = useState("alagamento");
  const [descricao, setDescricao] = useState("");
  const [cep, setCep] = useState("");
  const [dataEvento, setDataEvento] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("usuario").then(data => {
      if (data) {
        const user = JSON.parse(data);
        setCep(user.cep || "");
      }
    });
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    setDataEvento(`${dia}/${mes}/${ano}`);
  }, []);

  async function enviarRelatoEvento() {
    if (!descricao.trim()) {
      Alert.alert("Descreva o evento!");
      return;
    }
    if (!cep || cep.length < 8) {
      Alert.alert("CEP inválido", "Digite um CEP válido.");
      return;
    }
    if (!dataEvento || dataEvento.length < 10) {
      Alert.alert("Data inválida", "Digite a data no formato DD/MM/AAAA.");
      return;
    }
    try {
      const usuarioId = await AsyncStorage.getItem("usuarioId");
      await enviarRelato({
        descricao: `[${tipo}] ${descricao}`,
        localizacao: cep,
        usuarioId: Number(usuarioId),
        dataEvento: dateToIso(dataEvento)
      });
      Alert.alert("Relato enviado!", "Obrigado pela colaboração.");
      setDescricao("");
      setTipo("alagamento");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível enviar o relato.");
    }
  }

  return (
    <View style={styles.tela}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Relatar Evento</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Tipo de evento:</Text>
          <View style={styles.tiposRow}>
            {tipos.map(t => (
              <TouchableOpacity
                key={t.value}
                style={[
                  styles.tipoBtn,
                  tipo === t.value && styles.tipoBtnAtivo,
                ]}
                onPress={() => setTipo(t.value)}
              >
                <Feather name={t.icon} size={20} color={tipo === t.value ? "#fff" : "#2584E8"} />
                <Text style={[
                  styles.tipoTxt,
                  tipo === t.value && { color: "#fff" },
                ]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o que aconteceu..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Local (CEP):</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP do evento"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={8}
          />
          <Text style={styles.label}>Data do evento:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={dataEvento}
            onChangeText={text => setDataEvento(formatDate(text))}
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity style={styles.button} onPress={enviarRelatoEvento}>
            <Text style={styles.buttonText}>Enviar Relato</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
