import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../styles/navbar.styles"; 

export default function Navbar() {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Inicial")}>
        <Feather
          name="home"
          size={26}
          color={route.name === "Inicial" ? "#2294f3" : "#A6A6A6"}
        />
        <Text style={[
          styles.navLabel,
          route.name === "Inicial" && { color: "#2294f3", fontWeight: "bold" }
        ]}>
          Início
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Alertas")}>
        <Feather
          name="alert-circle"
          size={26}
          color={route.name === "Alertas" ? "#d13824" : "#A6A6A6"}
        />
        <Text style={[
          styles.navLabel,
          route.name === "Alertas" && { color: "#2294f3", fontWeight: "bold" }
        ]}>
          Alertas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navAdd}
        onPress={() => navigation.navigate("RelatoEvento")}
      >
        <Feather name="plus-circle" size={34} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Abrigos")}>
        <Feather
          name="map-pin"
          size={26}
          color={route.name === "Abrigos" ? "#6acf80" : "#A6A6A6"}
        />
        <Text style={[
          styles.navLabel,
          route.name === "Abrigos" && { color: "#2294f3", fontWeight: "bold" }
        ]}>
          Abrigos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Perfil")}>
        <Feather
          name="user"
          size={26}
          color={route.name === "Perfil" ? "#d1a104" : "#A6A6A6"}
        />
        <Text style={[
          styles.navLabel,
          route.name === "Perfil" && { color: "#2294f3", fontWeight: "bold" }
        ]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}