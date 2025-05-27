import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/telalogin.styles";

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email:"
          placeholderTextColor="#A6A6A6"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.senhaWrapper}>
          <TextInput
            placeholder="Senha:"
            placeholderTextColor="#A6A6A6"
            style={[styles.input, { marginBottom: 0, paddingRight: 40 }]}
            secureTextEntry={!showSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity style={styles.olho} onPress={() => setShowSenha(!showSenha)}>
            <Feather name={showSenha ? "eye" : "eye-off"} size={22} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={() => navigation.navigate("Inicial")}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.linkText}>Não possui conta? <Text style={styles.linkTextBold}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
