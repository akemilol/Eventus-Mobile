import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles/telalogin.styles';
import { loginUsuario } from '../services/usuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Ainda não tem cadastro? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
