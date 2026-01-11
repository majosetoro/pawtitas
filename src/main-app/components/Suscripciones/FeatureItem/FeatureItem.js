import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../shared/styles";
import { styles } from "./FeatureItem.styles";

// Mostrar característica individual de un plan
const FeatureItem = ({ feature, color, isLast, showX = false }) => (
  <View style={[styles.featureRow, isLast && styles.featureRowLast]}>
    <Ionicons 
      name={showX ? "close-circle" : "checkmark-circle"} 
      size={20} 
      color={showX ? colors.error : color} 
      style={styles.featureCheck} 
    />
    <Text style={styles.featureText}>{feature}</Text>
  </View>
);

export default FeatureItem;

