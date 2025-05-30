import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles/telalogin.styles';
import { loginUsuario } from '../services/usuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';


export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      const response = await loginUsuario({ email, senha });
      await AsyncStorage.setItem("usuarioId", String(response.data.id));
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Inicial'); 
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'E-mail ou senha incorretos.');
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={styles.senhaWrapper}>
        <TextInput
          placeholder="Senha"
          style={[styles.input, { marginBottom: 0, paddingRight: 40 }]}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showSenha}
        />
        <TouchableOpacity
          style={styles.olho}
          onPress={() => setShowSenha(!showSenha)}
        >
        <Feather name={showSenha ? "eye" : "eye-off"} size={22} color="#888" />
        </TouchableOpacity>
        </View>

        <LinearGradient
        colors={["#78f6ff", "#2294f3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <TouchableOpacity style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Ainda não tem cadastro? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
