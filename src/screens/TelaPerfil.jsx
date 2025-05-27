import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Navbar from "../components/Navbar";
import styles from "../styles/telaperfil.styles";

export default function TelaPerfil({ navigation }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoUri, setFotoUri] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setNome((await AsyncStorage.getItem("nome")) || "Nome do usuário");
      setCpf((await AsyncStorage.getItem("cpf")) || "");
      setCep((await AsyncStorage.getItem("cep")) || "");
      setDataNasc((await AsyncStorage.getItem("dataNasc")) || "");
      setEmail((await AsyncStorage.getItem("email")) || "");
      setSenha((await AsyncStorage.getItem("senha")) || "");
      setFotoUri(await AsyncStorage.getItem("fotoPerfil"));
    }
    fetchData();
  }, []);

  async function salvar() {
    await AsyncStorage.setItem("nome", nome);
    await AsyncStorage.setItem("cpf", cpf);
    await AsyncStorage.setItem("cep", cep);
    await AsyncStorage.setItem("dataNasc", dataNasc);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("senha", senha);
    setEditando(false);
  }

  async function selecionarFoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Permita acesso à galeria para selecionar uma foto.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.6,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoUri(uri);
      await AsyncStorage.setItem("fotoPerfil", uri);
    }
  }

  async function excluirConta() {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.tela}>
        <View style={styles.centralizador}>
          <TouchableOpacity style={styles.avatarArea} onPress={editando ? selecionarFoto : undefined} activeOpacity={0.85}>
            <View style={styles.avatarCircle}>
              {fotoUri ? (
                <Image source={{ uri: fotoUri }} style={styles.avatarImg} />
              ) : (
                <Feather name="user" size={54} color="#ccc" />
              )}
              {editando && (
                <View style={styles.avatarEditIcon}>
                  <Feather name="camera" size={19} color="#fff" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.nome}>{nome}</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={cpf}
              placeholder="cpf"
              placeholderTextColor="#888"
              editable={editando}
              onChangeText={setCpf}
            />
            <TextInput
              style={styles.input}
              value={cep}
              placeholder="cep"
              placeholderTextColor="#888"
              editable={editando}
              onChangeText={setCep}
            />
            <TextInput
              style={styles.input}
              value={dataNasc}
              placeholder="data de nascimento"
              placeholderTextColor="#888"
              editable={editando}
              onChangeText={setDataNasc}
            />
            <TextInput
              style={styles.input}
              value={email}
              placeholder="email"
              placeholderTextColor="#888"
              editable={editando}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              value={senha}
              placeholder="senha:"
              placeholderTextColor="#888"
              editable={editando}
              secureTextEntry
              onChangeText={setSenha}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? salvar : () => setEditando(true)}
            activeOpacity={0.86}
          >
            <Text style={styles.buttonText}>{editando ? "Salvar" : "Editar Informações"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnExcluir} onPress={excluirConta}>
            <Feather name="trash-2" size={18} color="#fff" />
            <Text style={styles.txtExcluir}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>
        <Navbar navigation={navigation} />
        <View style={styles.areaBrancaAbaixoNavbar} />
      </View>
    </KeyboardAvoidingView>
  );
}
