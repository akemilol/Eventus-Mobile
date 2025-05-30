import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Navbar from "../components/Navbar";
import styles from "../styles/telaperfil.styles";
import { buscarUsuarioPorId, atualizarUsuario, deletarUsuario } from "../services/usuarioService";
import { LinearGradient } from "expo-linear-gradient";

function dataBRparaISO(data) {
  const [dia, mes, ano] = data.split("/");
  if (!dia || !mes || !ano) return "";
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}T00:00:00`;
}

export default function TelaPerfil({ navigation }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoUri, setFotoUri] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const id = await AsyncStorage.getItem("usuarioId");
      setUsuarioId(id);
      if (id) {
        const response = await buscarUsuarioPorId(id);
        const user = response.data;
        setNome(user.nome || "");
        setCpf(user.cpf || "");
        setCep(user.cep || "");
        setDataNasc(user.dataNascimento ? user.dataNascimento.substring(0, 10).split("-").reverse().join("/") : "");
        setEmail(user.email || "");
        setSenha("");
        setFotoUri(await AsyncStorage.getItem(`fotoPerfil_${id}`));
      }
    }
    fetchData();
  }, []);

  async function salvar() {
    try {
      if (usuarioId) {
        const usuarioAtual = await buscarUsuarioPorId(usuarioId);
        const senhaFinal = senha || usuarioAtual.data.senha || "";
        await atualizarUsuario(usuarioId, {
          nome,
          cpf,
          cep,
          dataNascimento: dataBRparaISO(dataNasc),
          email,
          senha: senhaFinal
        });
        await AsyncStorage.setItem("nome", nome);
        await AsyncStorage.setItem("cpf", cpf);
        await AsyncStorage.setItem("cep", cep);
        await AsyncStorage.setItem("dataNasc", dataNasc);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("senha", senhaFinal);
      }
      setEditando(false);
      Alert.alert("Sucesso", "Dados editados com sucesso!");
    } catch (err) {
      Alert.alert("Erro", err.response?.data?.message || "Não foi possível salvar.");
    }
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
      if (usuarioId) await AsyncStorage.setItem(`fotoPerfil_${usuarioId}`, uri);
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
            if (usuarioId) {
              await deletarUsuario(usuarioId);
            }
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

  async function deslogar() {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
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
            <TextInput style={styles.input} value={cpf} placeholder="cpf" placeholderTextColor="#888" editable={editando} onChangeText={setCpf} />
            <TextInput style={styles.input} value={cep} placeholder="cep" placeholderTextColor="#888" editable={editando} onChangeText={setCep} />
            <TextInput style={styles.input} value={dataNasc} placeholder="data de nascimento" placeholderTextColor="#888" editable={editando} onChangeText={setDataNasc} />
            <TextInput style={styles.input} value={email} placeholder="email" placeholderTextColor="#888" editable={editando} autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />
            <TextInput style={styles.input} value={senha} placeholder="senha:" placeholderTextColor="#888" editable={editando} secureTextEntry onChangeText={setSenha} />
            {editando && (
              <TouchableOpacity style={styles.inputExcluir} onPress={excluirConta}>
                <Feather name="trash-2" size={20} color="#fff" />
                <Text style={styles.txtExcluirInput}>Excluir Conta</Text>
              </TouchableOpacity>
            )}
          </View>
          <LinearGradient
        colors={["#78f6ff", "#2294f3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, { borderRadius: 12, paddingVertical: 14 }]} // igual input
      >
        <TouchableOpacity
          style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
          onPress={editando ? salvar : () => setEditando(true)}
          activeOpacity={0.86}
        >
          <Text style={styles.buttonText}>{editando ? "Salvar" : "Editar Informações"}</Text>
        </TouchableOpacity>
      </LinearGradient>


          <View style={{ height: 18 }} />
          <LinearGradient
            colors={["#fd556a", "#c90a25"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, { borderRadius: 12, marginTop: 22 }]}
          >
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}
              onPress={deslogar}
              activeOpacity={0.86}
            >
              <Feather name="log-out" size={18} color="#fff" />
              <Text style={[styles.buttonText, { marginLeft: 8 }]}>Sair da Conta</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Navbar navigation={navigation} />
        <View style={styles.areaBrancaAbaixoNavbar} />
      </View>
    </KeyboardAvoidingView>
  );
}
