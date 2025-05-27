import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import styles from "../styles/telaabrigos.styles";

export default function TelaAbrigos({ navigation }) {
  const abrigos = [
    { nome: "Escola Municipal Central", endereco: "Rua das Flores, 120 - Centro", distancia: "800m" },
    { nome: "Igreja São José", endereco: "Praça da Matriz, 17 - Centro", distancia: "1,4km" },
    { nome: "Clube da Comunidade", endereco: "Av. Brasil, 2222 - Jardim das Árvores", distancia: "2,1km" },
    { nome: "Ginásio Poliesportivo", endereco: "Rua do Esporte, 55 - Vila Nova", distancia: "2,8km" },
    { nome: "Colégio Estadual Aurora", endereco: "Av. Getúlio Vargas, 910 - Aurora", distancia: "3,2km" },
    { nome: "Centro Social Dom Bosco", endereco: "Rua Dom Bosco, 77 - São Bento", distancia: "3,5km" },
    { nome: "Paróquia Cristo Rei", endereco: "Rua da Paz, 150 - Bela Vista", distancia: "4,0km" },
    { nome: "Quadra Coberta Zé Pequeno", endereco: "Rua Alvorada, 321 - Alvorada", distancia: "4,2km" },
    { nome: "Associação de Moradores Jardim Sol", endereco: "Rua Sol Nascente, 99 - Jardim Sol", distancia: "4,9km" },
    { nome: "Igreja Batista Esperança", endereco: "Rua Esperança, 200 - Esperança", distancia: "5,5km" },
  ];

  return (
    <View style={styles.tela}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Abrigos Seguros Próximos</Text>
        <ScrollView contentContainerStyle={styles.lista}>
          {abrigos.map((ab, idx) => (
            <View key={idx} style={styles.card}>
              <Feather name="map-pin" size={30} color="#43C47F" style={{ marginRight: 18 }} />
              <View style={styles.info}>
                <Text style={styles.nome}>{ab.nome}</Text>
                <Text style={styles.endereco}>{ab.endereco}</Text>
                <Text style={styles.distancia}>{ab.distancia} de você</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.areaBrancaAbaixoNavbar} />
    </View>
  );
}
