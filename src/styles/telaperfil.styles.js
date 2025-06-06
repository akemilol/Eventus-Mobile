import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FCFCF7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingBottom: 80,
  },
  centralizador: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 40,
    flex: 1,
  },
  avatarArea: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 18,
  },
  avatarCircle: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: "#e5e5e5",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  position: "relative",
},
avatarImg: {
  width: 120,
  height: 120,
  borderRadius: 60,
},
  avatarEditIcon: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "#2584E8",
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  nome: {
    fontFamily: "OpenSans-Bold",
    fontSize: 25,
    color: "#2584E8",
    marginBottom: 18,
    textAlign: "center",
  },
  form: {
    width: "87%",
    alignSelf: "center",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#E9EAEA",
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontFamily: "OpenSans-Regular",
    fontSize: 15.5,
    color: "#222",
    marginBottom: 13,
    borderWidth: 0,
  },
  button: {
    width: "87%",
    backgroundColor: "#3B9AF2",
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#1976D2",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: "#fff",
  },
  btnExcluir: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D83349",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 22,
    alignSelf: "center",
    shadowColor: "#b81b35",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  txtExcluir: {
    color: "#fff",
    fontFamily: "OpenSans-SemiBold",
    marginLeft: 8,
    fontSize: 15,
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
  inputExcluir: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#D83349",
  borderRadius: 7,
  paddingHorizontal: 14,
  paddingVertical: 13,
  marginBottom: 13,
  justifyContent: "center",
},
txtExcluirInput: {
  color: "#fff",
  fontFamily: "OpenSans-SemiBold",
  fontSize: 15.5,
  marginLeft: 10,
},
});
