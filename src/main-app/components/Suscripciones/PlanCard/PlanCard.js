import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../shared/styles";
import { styles } from "./PlanCard.styles";
import FeatureItem from "../FeatureItem";

// Mostrar tarjeta de plan de suscripción
const PlanCard = ({ 
  titulo, 
  precio, 
  esGratis = false, 
  esPremium = false, 
  colorPrincipal,
  caracteristicas = [],
  onConsultar,
  disabled = false 
}) => {
  return (
    <View style={[
      styles.planCard, 
      esPremium && styles.planCardPremium,
      esPremium && { backgroundColor: colorPrincipal + '05' }
    ]}>
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>
          {titulo}
        </Text>
        {esPremium && (
          <View style={styles.recomendadoTag}>
            <Text style={[styles.recomendadoText, { color: colorPrincipal }]}>
              Recomendado
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.priceSection}>
        {esGratis ? (
          <Text style={[styles.planPrice, { color: colorPrincipal }]}>Gratis</Text>
        ) : (
          <>
            <View style={styles.priceRow}>
              <Text style={styles.priceCurrency}>$</Text>
              <Text style={[styles.planPrice, { color: colorPrincipal }]}>
                {precio.toLocaleString('es-AR')}
              </Text>
              <Text style={styles.priceCurrencyARS}>ARS</Text>
            </View>
            <Text style={styles.pricePeriod}>por mes</Text>
          </>
        )}
      </View>

      <View style={styles.featuresContainer}>
        {caracteristicas.map((feature, index) => (
          <FeatureItem 
            key={index} 
            feature={feature} 
            color={colorPrincipal}
            isLast={index === caracteristicas.length - 1}
            showX={esPremium && feature === "Publicidad"}
          />
        ))}
      </View>
      
      <TouchableOpacity
        style={[
          styles.consultarButton,
          { backgroundColor: colorPrincipal },
          disabled && { opacity: 0.5 }
        ]}
        onPress={onConsultar}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[
          styles.consultarButtonText,
          { color: colors.text.inverse }
        ]}>
          {disabled ? "Procesando..." : "Comenzar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanCard;

