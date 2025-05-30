import { StyleSheet } from "react-native";

export default StyleSheet.create({
navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
    width: "100%",
    height: 70,
    backgroundColor: "#FCFCF7",
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
