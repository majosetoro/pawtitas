import React from 'react';
import { PrestadorServiciosScreen } from '../../components';

// Implementar la llamada a la API. Estos datos son de ejemplo.
const PASEADORES_DATA = [
  {
    id: '1',
    nombre: 'Carlos Gómez',
    rating: 5,
    descripcion: 'Paseador profesional con 5 años de experiencia en paseo de perros de todas las razas.',
    precio: '$25.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Lunes, Miércoles, Jueves',
    horario: 'A convenir',
  },
  {
    id: '2',
    nombre: 'Laura Fernández',
    rating: 3,
    descripcion: 'Paseadora con 2 años de experiencia. Especializada en perros pequeños y medianos.',
    precio: '$18.000',
    ubicacion: 'Palermo, CABA',
    disponibilidad: 'Martes, Jueves, Viernes',
    horario: '2-4 horas',
  },
  {
    id: '3',
    nombre: 'Martín Rodríguez',
    rating: 4,
    descripcion: 'Paseador profesional con 1 año de experiencia. Paseos en grupo o individuales.',
    precio: '$20.000',
    ubicacion: 'Recoleta, CABA',
    disponibilidad: 'Lunes a Viernes',
    horario: 'A convenir',
  }
];

const Paseadores = ({ navigation }) => {
  return (
    <PrestadorServiciosScreen
      navigation={navigation}
      providers={PASEADORES_DATA}
      providerType="paseador"
      screenTitle="Paseadores"
      screenSubtitle="Elige y contacta a paseadores verificados, priorizando los más cercanos"
    />
  );
};

export default Paseadores;