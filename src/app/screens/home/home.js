import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import { styles } from './home.styles';
import BottomNavbar from '../../components/BottomNavbar';
import iconImage from '../../assets/icon.png';

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
  return (
    <View style={styles.header}>
      <View style={styles.statusBarSpace} />
      <View style={styles.logoContainer}>
        <Image 
          source={iconImage} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.logoText}>PAWTITAS</Text>
        <Text style={styles.taglineText}>Todo lo que tu mascota necesita, cerca de vos</Text>
      </View>
    </View>
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
