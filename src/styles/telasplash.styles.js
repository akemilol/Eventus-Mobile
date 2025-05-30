import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCF7",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
    color: "#2584E8",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    color: "#222",
    textAlign: "center",
    marginBottom: 48,
  },
  button: {
    width: "100%",
    borderRadius: 24,
    shadowColor: "#222",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
  },
  buttonGradient: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: "#fff",
    textTransform: "lowercase",
  },
});
