import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#fff",
  },
  conteudo: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 12,
  },
  titulo: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
    color: "#43C47F",
    marginBottom: 18,
    textAlign: "center",
  },
  lista: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#F4F7F6",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontFamily: "OpenSans-Bold",
    fontSize: 17,
    color: "#186F3D",
    marginBottom: 2,
  },
  endereco: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  distancia: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13,
    color: "#43C47F",
  },
  areaBrancaAbaixoNavbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 34,
    backgroundColor: "#fff",
    zIndex: 1,
  },
});
