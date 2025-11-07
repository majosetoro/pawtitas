import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#fff", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 50 },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 10,
      marginBottom: 12,
    },
    inputError: {
      borderColor: "#ff0000",
      borderWidth: 1,
    },
    errorText: {
      color: "#ff0000",
      fontSize: 12,
      marginBottom: 8,
      marginTop: -8,
    },
    subtitle: { fontSize: 16, fontWeight: "600", marginTop: 10, marginBottom: 5 },
    picker: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      marginBottom: 12,
    },
    clipButton: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      backgroundColor: "#f9f9f9",
    },
    clipButtonError: {
      borderColor: "#ff0000",
      borderWidth: 1,
    },
    clipText: {
      color: "#333",
      fontSize: 16,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginHorizontal: 5,
    },
    cancel: { backgroundColor: "#eee" },
    confirm: { backgroundColor: "#6b4226" },
    cancelText: { color: "#333", fontWeight: "600" },
    confirmText: { color: "#fff", fontWeight: "600" },
  });
  