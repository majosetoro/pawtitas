import React, { createContext, useState, useContext } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

// Hook para acceder al contexto de ubicación
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de LocationProvider');
  }
  return context;
};

// Gestionar la ubicación del usuario
export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Solicitar permisos de ubicación
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setLocationPermission(granted);
      return granted;
    } catch (error) {
      console.error('Error solicitando permisos de ubicación:', error);
      setLocationError('Error al solicitar permisos de ubicación');
      return false;
    }
  };

// Obtener la ubicación actual
  const getCurrentLocation = async () => {0
    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      const hasPermission = locationPermission || await requestLocationPermission();
      
      if (!hasPermission) {
        setLocationError('Permisos de ubicación denegados');
        setIsLoadingLocation(false);
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(userCoords);
      setIsLoadingLocation(false);
      return userCoords;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      setLocationError('Error al obtener ubicación');
      setIsLoadingLocation(false);
      return null;
    }
  };

  // Convertir grados a radianes
  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  // Calcular la distancia entre dos puntos geográficos usando la fórmula de Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  };

  // Calcular la distancia desde la ubicación del usuario a un punto específico
  const getDistanceFromUser = (latitude, longitude) => {
    if (!userLocation) return null;
    return calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      latitude,
      longitude
    );
  };

  // Formatear la distancia para mostrarla de manera legible
  const formatDistance = (distance) => {
    if (distance === null || distance === undefined) return '';
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  // Limpiar la ubicación guardada del usuario
  const clearLocation = () => {
    setUserLocation(null);
    setLocationError(null);
  };

  const value = {
    userLocation,
    locationPermission,
    isLoadingLocation,
    locationError,
    requestLocationPermission,
    getCurrentLocation,
    getDistanceFromUser,
    formatDistance,
    calculateDistance,
    clearLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

