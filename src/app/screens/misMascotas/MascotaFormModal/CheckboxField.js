import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../../../shared/styles';

// Componente para renderizar un campo de checkbox con label y descripción
export const CheckboxField = ({ label, description, checked, onToggle }) => {
  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggle(!checked)}
          activeOpacity={0.7}
        >
          {checked ? (
            <View style={styles.checkedBox}>
              <Ionicons name="checkmark" size={12} color="white" />
            </View>
          ) : (
            <View style={styles.uncheckedBox} />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </View>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    marginVertical: 10,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 10,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  uncheckedBox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.button.primary,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  checkedBox: {
    width: 22,
    height: 22,
    backgroundColor: colors.button.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  checkboxLabel: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  description: {
    ...typography.styles.small,
    color: colors.text.secondary,
    marginLeft: 32,
    marginTop: 4,
  },
});
