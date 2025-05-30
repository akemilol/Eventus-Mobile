import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Inicial")}>
        <Feather name="home" size={26} color="#2584E8" />
        <Text style={styles.navLabel}>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Alertas")}>
        <Feather name="alert-circle" size={26} color="#A6A6A6" />
        <Text style={styles.navLabel}>Alertas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navAdd}
        onPress={() => navigation.navigate("RelatoEvento")}
      >
        <Feather name="plus-circle" size={34} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Abrigos")}>
        <Feather name="map-pin" size={26} color="#A6A6A6" />
        <Text style={styles.navLabel}>Abrigos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Perfil")}>
        <Feather name="user" size={26} color="#2584E8" />
        <Text style={[styles.navLabel, { color: "#2584E8", fontWeight: "bold" }]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 18,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    borderTopWidth: 1,
    borderColor: "#e6e6e6"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navAdd: {
    width: 56,
    height: 56,
    backgroundColor: "#3B9AF2",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 16,
    zIndex: 2,
  },
  navLabel: {
    fontSize: 12,
    color: "#2584E8",
    fontFamily: "OpenSans-SemiBold",
    marginTop: 1,
  },
});
