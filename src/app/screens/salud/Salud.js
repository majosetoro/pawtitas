import React from 'react';
import { PrestadorServiciosScreen } from '../../components';

// Implementar la llamada a la API. Estos datos son de ejemplo.
const SALUD_DATA = [
  {
    id: '1',
    nombre: 'Clínica Veterinaria San Antonio',
    rating: 5,
    descripcion: 'Clínica veterinaria especializada en medicina interna y cirugía de pequeños animales.',
    precio: '$35.000',
    ubicacion: 'Palermo, CABA',
    disponibilidad: 'Lunes a Viernes',
    horario: '9:00 - 18:00',
    // Coordenadas de Palermo, CABA
    latitude: -34.5889,
    longitude: -58.4199,
  },
  {
    id: '2',
    nombre: 'Dra. Carolina Sánchez',
    rating: 4,
    descripcion: 'Veterinaria especializada en dermatología y nutrición animal. Atención personalizada para mascotas.',
    precio: '$28.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Martes, Jueves, Sábados',
    horario: '10:00 - 19:00',
    // Coordenadas de Belgrano, CABA
    latitude: -34.5628,
    longitude: -58.4556,
  },
  {
    id: '3',
    nombre: 'Dr. Matías López',
    rating: 5,
    descripcion: 'Especialista en medicina preventiva y emergencias veterinarias. Más de 10 años de experiencia en clínicas de Buenos Aires.',
    precio: '$32.000',
    ubicacion: 'Recoleta, CABA',
    disponibilidad: 'Lunes, Miércoles, Viernes',
    horario: '8:00 - 16:00',
    // Coordenadas de Recoleta, CABA
    latitude: -34.5875,
    longitude: -58.3974,
  }
];

const Salud = ({ navigation }) => {
  return (
    <PrestadorServiciosScreen
      navigation={navigation}
      providers={SALUD_DATA}
      providerType="médico o clínica veterinaria"
      screenTitle="Salud y Bienestar"
      screenSubtitle="Elige y contacta médicos veterinarios y clínicas certificadas, priorizando los más cercanos"
    />
  );
};

export default Salud;