import React from 'react';
import { PrestadorServiciosScreen } from '../../components';

// Implementar la llamada a la API. Estos datos son de ejemplo.
const CUIDADORES_DATA = [
  {
    id: '1',
    nombre: 'Juan Perez',
    rating: 5,
    descripcion: 'Cuidadora profesional con 5 años de experiencia en cuidado de mascotas.',
    precio: '$30.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Lunes, Miércoles, Jueves',
    horario: 'A convenir',
    // Coordenadas de Belgrano, CABA
    latitude: -34.5628,
    longitude: -58.4556,
  },
  {
    id: '2',
    nombre: 'Susana Jimenez',
    rating: 3,
    descripcion: 'Cuidadora con 1 año de experiencia en cuidado de mascotas.',
    precio: '$15.000',
    ubicacion: 'Colegiales, CABA',
    disponibilidad: 'Viernes, Sábado',
    horario: '5-8 horas',
    // Coordenadas de Colegiales, CABA
    latitude: -34.5741,
    longitude: -58.4487,
  },
  {
    id: '3',
    nombre: 'Paula Benal',
    rating: 4,
    descripcion: 'Cuidadora profesional con 3 años de experiencia. Solo cuido gatos.',
    precio: '$25.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Lunes, Miércoles, Jueves',
    horario: 'A convenir',
    // Coordenadas de Belgrano, CABA (diferente punto)
    latitude: -34.5580,
    longitude: -58.4589,
  }
];

const Cuidadores = ({ navigation }) => {
  return (
    <PrestadorServiciosScreen
      navigation={navigation}
      providers={CUIDADORES_DATA}
      providerType="cuidador"
      screenTitle="Cuidadores"
      screenSubtitle="Elige y contacta a cuidadores verificados, priorizando los más cercanos"
    />
  );
};

export default Cuidadores;