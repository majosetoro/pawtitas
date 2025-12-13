import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

export default function LoginBtn({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.button.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    color: colors.text.inverse,
    fontSize: 15,
    fontFamily: typography.fontFamily.bodySemiBold,
    letterSpacing: 0.8,
  },
});
