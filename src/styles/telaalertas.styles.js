import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FCFCF7",
  },
  conteudo: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 12,
  },
  titulo: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
    color: "#2584E8",
    marginBottom: 18,
    textAlign: "center",
  },
  lista: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#F7F9FB",
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
  iconeArea: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  info: {
    flex: 1,
  },
  tipo: {
    fontFamily: "OpenSans-Bold",
    fontSize: 17,
    color: "#1976D2",
    marginBottom: 2,
  },
  hora: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13,
    color: "#888",
    marginBottom: 3,
  },
  detalhe: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: "#333",
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
