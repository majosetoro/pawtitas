import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const plans = [
  {
    category: "Para Dueños de Mascotas",
    options: [
      { name: "Plan Básico", price: "GRATIS" },
      { name: "Plan Premium", price: "$4.00 MENSUAL" },
    ],
  },
  {
    category: "Para Prestadores de Servicios",
    options: [{ name: "Plan Pro", price: "$8.00 MENSUAL" }],
  },
];

export default function Suscripciones() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Suscripciones</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
        adipiscing elit quisque faucibus ex sapien vitae.
      </Text>

      <View style={styles.cardsContainer}>
        {plans.map((planGroup, idx) => (
          <View key={idx} style={styles.planCard}>
            <Text style={styles.planCategory}>{planGroup.category}</Text>
            {planGroup.options.map((opt, j) => (
              <View key={j} style={styles.planOption}>
                <Text style={styles.planName}>{opt.name}</Text>
                <Text style={styles.planPrice}>{opt.price}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Adquirir plan</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b2d1d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: 600,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  planCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    margin: 10,
    minWidth: 200,
  },
  planCategory: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#6b2d1d",
  },
  planOption: {
    marginBottom: 15,
    alignItems: "center",
  },
  planName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  planPrice: {
    color: "#2e7d32",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#c94f7c",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
