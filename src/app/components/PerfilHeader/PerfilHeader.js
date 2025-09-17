import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./PerfilHeader.styles";

// Componente reutilizable para el header de Perfil.js y otras pantallas que lo requieran
const PerfilHeader = ({
  title,
  rightComponent,
  backgroundColor,
  titleStyle,
}) => {
  return (
    <SafeAreaView style={[styles.header, backgroundColor && { backgroundColor }]} edges={['top']}>
      <View style={styles.headerTop}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
        
        {rightComponent && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
        )}
      </View>
      
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

export default PerfilHeader;
