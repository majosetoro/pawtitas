import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../shared/styles";

const features = [
  { icon: "⚡", title: "Rápido", description: "Encuentra servicios en minutos" },
  { icon: "🔒", title: "Seguro", description: "Prestadores verificados" },
  { icon: "📍", title: "Cercano", description: "Servicios en tu zona" },
  { icon: "💬", title: "Comunicación", description: "Chat directo con prestadores" }
];

export default function Features() {
  return (
    <View style={styles.section}>
      <View style={styles.featuresContainer}>
        {features.map((feature, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundLanding,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 32,
    maxWidth: 1000,
    alignSelf: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 200,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    opacity: 0.8,
  },
});

