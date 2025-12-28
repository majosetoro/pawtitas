import React from "react";
import { View, Text } from "react-native";
import styles from "./Features.styles";

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

