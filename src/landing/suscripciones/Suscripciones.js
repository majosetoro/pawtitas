import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Suscripciones.styles";

const plans = [
  {
    category: "Para Dueños de Mascotas",
    icon: "🐾",
    options: [
      {
        name: "Plan Básico",
        price: "GRATIS",
        period: "",
        recommended: false,
      },
      {
        name: "Plan Premium",
        price: "$8.000",
        period: "/mes",
        recommended: true,
      },
    ],
  },
  {
    category: "Para Prestadores de Servicios",
    icon: "💼",
    options: [
      {
        name: "Plan Básico",
        price: "$8.000",
        period: "/mes",
        recommended: false,
      },
      {
        name: "Plan Premium",
        price: "$10.000",
        period: "/mes",
        recommended: true,
      },
    ],
  },
];

export default function Suscripciones({ scrollToSection }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Suscripciones</Text>
        <Text style={styles.subtitle}>
          Suscribite a nuestros planes para una mejor experiencia
        </Text>
      </View>

      <View style={styles.plansWrapper}>
        {plans.map((planGroup, groupIdx) => (
          <View key={groupIdx} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{planGroup.icon}</Text>
              <Text style={styles.categoryTitle}>{planGroup.category}</Text>
            </View>

            <View style={styles.cardsRow}>
              {planGroup.options.map((plan, planIdx) => {
                const isPrestador = groupIdx === 1; // Prestadores de Servicios es el segundo grupo
                return (
                  <View
                    key={planIdx}
                    style={[
                      styles.planCard,
                      plan.recommended && (isPrestador 
                        ? styles.planCardRecommendedPrestador 
                        : styles.planCardRecommended),
                    ]}
                  >
                    {plan.recommended && (
                      <View style={isPrestador 
                        ? styles.recommendedBadgePrestador 
                        : styles.recommendedBadge}>
                        <Text style={styles.recommendedText}>Recomendado</Text>
                      </View>
                    )}

                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={[
                          styles.planPrice,
                          isPrestador && styles.planPricePrestador
                        ]}>{plan.price}</Text>
                        {plan.period && (
                          <Text style={styles.planPeriod}>{plan.period}</Text>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.ctaButton,
                        isPrestador && styles.ctaButtonPrestador,
                        plan.recommended && (isPrestador 
                          ? styles.ctaButtonRecommendedPrestador 
                          : styles.ctaButtonRecommended),
                      ]}
                      onPress={() => scrollToSection?.("contacto")}
                    >
                      <Text
                        style={[
                          styles.ctaButtonText,
                          isPrestador && styles.ctaButtonTextPrestador,
                          plan.recommended && styles.ctaButtonTextRecommended,
                        ]}
                      >
                        Consultar plan
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
