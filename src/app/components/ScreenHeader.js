import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, typography } from "../../shared/styles";

// Componente reutilizable para el encabezado de las pantallas
export default function ScreenHeader({ 
  title, 
  subtitle, 
  onBackPress,
  showBackButton = true,
  rightComponent 
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightComponent && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
        )}
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginTop: 4,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: "600",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  rightComponent: {
    marginLeft: 12,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.medium,
    color: colors.primaryDark,
    marginTop: 16,
    marginHorizontal: 20,
  },
});
