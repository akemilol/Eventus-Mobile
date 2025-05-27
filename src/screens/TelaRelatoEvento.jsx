import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, Image, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Navbar from "../components/Navbar";
import styles from "../styles/telarelatoevento.styles";

const tipos = [
  { label: "Alagamento", value: "alagamento", icon: "droplet" },
  { label: "Queda de árvore", value: "arvore", icon: "activity" },
  { label: "Deslizamento", value: "deslizamento", icon: "alert-triangle" },
  { label: "Outro", value: "outro", icon: "edit" },
];

export default function TelaRelatoEvento({ navigation }) {
  const [tipo, setTipo] = useState("alagamento");
  const [descricao, setDescricao] = useState("");
  const [fotoUri, setFotoUri] = useState(null);
  const [cep, setCep] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("cep").then(setCep);
  }, []);

  async function selecionarFoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permita acesso à galeria.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.6,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  }

  async function enviarRelato() {
    if (!descricao.trim()) {
      Alert.alert("Descreva o evento!");
      return;
    }
    Alert.alert("Relato enviado!", "Obrigado pela colaboração.");
    setDescricao("");
    setFotoUri(null);
    setTipo("alagamento");
    navigation.goBack();
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
            style={[styles.input, { backgroundColor: "#f0f3f9" }]}
            value={cep}
            editable={false}
          />
          <Text style={styles.label}>Foto (opcional):</Text>
          <TouchableOpacity style={styles.fotoBtn} onPress={selecionarFoto}>
            <Feather name="camera" size={22} color="#2584E8" />
            <Text style={styles.fotoBtnTxt}>Selecionar Foto</Text>
          </TouchableOpacity>
          {fotoUri && <Image source={{ uri: fotoUri }} style={styles.fotoPreview} />}
          <TouchableOpacity style={styles.button} onPress={enviarRelato}>
            <Text style={styles.buttonText}>Enviar Relato</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
