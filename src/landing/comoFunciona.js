import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../shared/styles";

const steps = [
  { number: "1", title: "Descarga la App", description: "Disponible en Play Store" },
  { number: "2", title: "Busca el servicio", description: "Encuentra lo que necesitas" },
  { number: "3", title: "Conecta", description: "Habla con el prestador" },
  { number: "4", title: "Disfruta", description: "Tu mascota en buenas manos" }
];

export default function ComoFunciona() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>¿Cómo funciona?</Text>
      <Text style={styles.subtitle}>
        En 4 simples pasos podés comenzar a disfrutar de nuestros servicios
      </Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            {idx < steps.length - 1 && (
              <Text style={styles.stepArrow}>→</Text>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.backgroundLanding,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
    fontSize: 16,
    maxWidth: 600,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    maxWidth: 1000,
  },
  stepCard: {
    alignItems: "center",
    maxWidth: 160,
    minWidth: 140,
  },
  stepNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.brand.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.brand.lightBlue,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 6,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    opacity: 0.8,
  },
  stepArrow: {
    fontSize: 24,
    color: colors.border.dark,
    marginHorizontal: 8,
  },
});

