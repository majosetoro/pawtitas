//import { useNavigation } from '@react-navigation/native';
import { styles } from './home.styles';
import BottomNavbar from '../../components/BottomNavbar';
import iconImage from '../../assets/icon.png';
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // librería de íconos

// Componentes de categoría de servicios
const ServiceCategory = ({ emoji, title, description, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Text style={styles.categoryEmoji}>{emoji}</Text>
    <Text style={styles.categoryTitle}>{title}</Text>
    <Text style={styles.categoryDescription} numberOfLines={2}>
      {description}
    </Text>
  </TouchableOpacity>
);

// Componente para el encabezado de la pantalla Home
const HomeHeader = () => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  return (
  <>
    {/* Primer bloque: buscador, notificaciones, modal */}
    <View style={styles.header}>
      {/* Fila superior */}
      <View style={styles.topRow}>
        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicios, veterinarias..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Notificaciones */}
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Fila inferior */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => setLocationModalVisible(true)}
      >
        <Ionicons name="location-outline" size={18} color="#00897B" />
        <Text style={styles.locationText}>Elegí tu ubicación</Text>
      </TouchableOpacity>

      {/* Modal de ubicación */}
      <Modal
        transparent
        visible={locationModalVisible}
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elegí tu ubicación</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text>Activar ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text>Seleccionar manualmente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

    {/* Segundo bloque: logo y tagline */}
    <View style={styles.header}>
      <View style={styles.statusBarSpace} />
      <View style={styles.logoContainer}>
        <Image 
          source={iconImage} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.logoText}>PAWTITAS</Text>
        <Text style={styles.taglineText}>Todo lo que tu mascota necesita, cerca tuyo</Text>
      </View>
    </View>
  </>
);

};

const HomeScreen = () => {
  
  // Categorías de servicios
  const serviceCategories = [
    {
      id: '1',
      emoji: '🏠',
      title: 'Cuidadores',
      description: 'Encontrá el cuidador ideal',
      //onPress: () => navigation.navigate('Cuidadores'),
    },
    {
      id: '2',
      emoji: '🦮',
      title: 'Paseadores',
      description: 'Caminatas seguras cerca de tu zona',
      //onPress: () => navigation.navigate('Paseadores'),
    },
    {
      id: '3',
      emoji: '🚑',
      title: 'Salud y Bienestar',
      description: 'Médicos veterinarios y clínicas cercanas',
      //onPress: () => navigation.navigate('Emergencia'),
    },
    {
      id: '4',
      emoji: '👥',
      title: 'Mis conexiones',
      description: 'Tu red de confianza en un solo lugar',
      //onPress: () => navigation.navigate('Conexiones'),
    },
  ];

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {serviceCategories.map((category) => (
            <ServiceCategory
              key={category.id}
              emoji={category.emoji}
              title={category.title}
              description={category.description}
              onPress={category.onPress}
            />
          ))}
        </View>
      </ScrollView>
      
      <BottomNavbar />
    </View>
  );
};

export default HomeScreen;
