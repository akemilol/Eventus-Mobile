import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import styles from "../styles/telacadastro.styles";
import { cadastrarUsuario } from "../services/usuarioService";
import { LinearGradient } from 'expo-linear-gradient';

function formatCPF(value) {
  return value.replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
    .slice(0, 14);
}
function formatCEP(value) {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{1,3})/, '$1-$2').slice(0, 9);
}
function formatDate(value) {
  return value.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10);
}
function parseDataISO(dateStr) {
  if (!dateStr || dateStr.length !== 10) return null;
  const [dia, mes, ano] = dateStr.split('/');
  if (!dia || !mes || !ano || ano.length !== 4) return null;
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T00:00:00`;
}

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  async function validarCampos() {
    if (!nome.trim()) {
      Alert.alert("Campo obrigatório", "Digite seu nome.");
      return;
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      Alert.alert("Nome inválido", "Digite apenas letras no campo nome.");
      return;
    }
    if (!cpf || cpf.length < 14) {
      Alert.alert("CPF inválido", "Digite um CPF válido (11 dígitos).");
      return;
    }
    if (!cep || cep.length < 9) {
      Alert.alert("CEP inválido", "Digite um CEP válido (8 dígitos).");
      return;
    }
    if (!dataNasc || dataNasc.length < 10) {
      Alert.alert("Data inválida", "Digite a data de nascimento (dd/mm/aaaa).");
      return;
    }
    const dataNascFormatada = parseDataISO(dataNasc);
    if (!dataNascFormatada) {
      Alert.alert("Data inválida", "Digite a data de nascimento corretamente.");
      return;
    }
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert("Email inválido", "Digite um email válido.");
      return;
    }
    if (!senha || senha.length < 6) {
      Alert.alert("Senha inválida", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Senhas diferentes", "As senhas não coincidem.");
      return;
    }
    try {
      const usuario = {
        nome: nome.trim(),
        email,
        senha,
        cpf: cpf.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        dataNascimento: dataNascFormatada
      };
      console.log("Enviando:", usuario);
      await cadastrarUsuario(usuario);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("ERRO AO CADASTRAR:", error?.response?.data, error?.response?.status, error);
      if (error.response?.data?.message) {
        Alert.alert("Erro", error.response.data.message);
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar. Tente novamente.");
      }
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.centralizador}>
          <Text style={styles.title}>Cadastro</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Nome Completo:"
              placeholderTextColor="#999"
              style={styles.input}
              value={nome}
              onChangeText={text => setNome(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ""))}
            />
            <TextInput
              placeholder="CPF:"
              placeholderTextColor="#999"
              style={styles.input}
              value={cpf}
              keyboardType="numeric"
              maxLength={14}
              onChangeText={text => setCpf(formatCPF(text))}
            />
            <TextInput
              placeholder="CEP:"
              placeholderTextColor="#999"
              style={styles.input}
              value={cep}
              keyboardType="numeric"
              maxLength={9}
              onChangeText={text => setCep(formatCEP(text))}
            />
            <TextInput
              placeholder="Data de Nascimento:"
              placeholderTextColor="#999"
              style={styles.input}
              value={dataNasc}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setDataNasc(formatDate(text))}
            />
            <TextInput
              placeholder="Email:"
              placeholderTextColor="#999"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.senhaWrapper}>
              <TextInput
                placeholder="Senha:"
                placeholderTextColor="#999"
                style={[styles.input, { marginBottom: 0, paddingRight: 40 }]}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showSenha}
              />
              <TouchableOpacity style={styles.olho} onPress={() => setShowSenha(!showSenha)}>
                <Feather name={showSenha ? "eye" : "eye-off"} size={22} color="#888" />
              </TouchableOpacity>
            </View>
            <View style={styles.senhaWrapper}>
              <TextInput
                placeholder="Confirmar Senha:"
                placeholderTextColor="#999"
                style={[styles.input, { marginBottom: 0, paddingRight: 40 }]}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!showConfirmarSenha}
              />
              <TouchableOpacity style={styles.olho} onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}>
                <Feather name={showConfirmarSenha ? "eye" : "eye-off"} size={22} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
          colors={["#78f6ff", "#2294f3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
            activeOpacity={0.8}
            onPress={validarCampos}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </LinearGradient>

          <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Já possui conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
