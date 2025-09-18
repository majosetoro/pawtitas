import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './perfil.styles';
import { colors } from '../../../shared/styles';
import { PerfilHeader, BottomNavbar } from '../../components';
import { PerfilInfoCard, MascotasSection, LogoutBtn, SettingsMenu, SupportService } from './components';

// Perfil del usuario
const PerfilScreen = () => {
  const navigation = useNavigation();
  
  // Estado del usuario
  // Implementar la llamada a la API. Estos datos son de ejemplo.
  const [userProfile] = useState({
    id: '1',
    name: 'María López',
    email: 'maria.lopez@gmail.com',
    phone: '+54 9 11 12345678',
    location: 'Belgrano, CABA',
    role: 'Cliente (Dueño de mascota)',
    rating: 4,
    description: 'Soy dueña de Luna y busco un lugar confiable para dejarla mientras estoy de vacaciones.',
    registrationDate: '15-08-2025',
    petsCount: 1,
  });

  // Handlers para acciones del usuario
  const handleEditProfile = () => {
    navigation.navigate('EditarPerfil');
  };

  const handleNavigateToPets = () => {
    navigation.navigate('MisMascotas');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            // Limpiar el estado de autenticación
            navigation.reset({
              index: 0,
              routes: [{ name: 'Inicio' }],
            });
          }
        }
      ]
    );
  };

  const handleSupport = () => {
    SupportService.contactEmail();
  };

  const handleSettingsMenu = () => {
    SettingsMenu.showMainMenu(handleSupport);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <PerfilHeader
        title="PERFIL"
        rightComponent={
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettingsMenu}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color={colors.brand.accent} />
          </TouchableOpacity>
        }
      />

      {/* Contenido principal */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tarjeta de información del perfil */}
        <PerfilInfoCard
          user={userProfile}
          onEdit={handleEditProfile}
        />

        {/* Sección de mascotas */}
        <MascotasSection
          petsCount={userProfile.petsCount}
          description={userProfile.petsDescription}
          onPress={handleNavigateToPets}
        />

        {/* Botón de cerrar sesión */}
        <LogoutBtn onPress={handleLogout} />
      </ScrollView>

      {/* Navegación inferior */}
      <BottomNavbar />
    </View>
  );
};

export default PerfilScreen;
