import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, typography } from "../shared/styles";
import avatarMariaToro from "../../assets/avatar/avatar-maria-toro.jpg";
import avatarMariaElisa from "../../assets/avatar/avatar-maria.elisa.jpg";

export default function Nosotros() {
  const equipo = [
    {
      nombre: "Andrea Paez",
      descripcion: "Fundadora",
      avatar: { uri: "https://em-content.zobj.net/thumbs/240/apple/354/man-raising-hand_1f64b-200d-2642-fe0f.png" },
    },
    {
      nombre: "María José Toro",
      descripcion: "Fundadora",
      avatar: avatarMariaToro,
    },
    {
      nombre: "María Elisa Zubiri",
      descripcion: "Fundadora",
      avatar: avatarMariaElisa,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Nosotros</Text>
      <Text style={styles.subtitle}>
        Somos estudiantes de la carrera Analista en sistemas y amamos a los animales.{"\n"}
        Buscamos brindarte soluciones y ayudarte con tus mascotas. 

        
      </Text>

      <View style={styles.teamRow}>
        {equipo.map((persona, idx) => (
          <View key={idx} style={styles.card}>
            <Image 
              source={persona.avatar} 
              style={styles.avatar} 
            />
            <Text style={styles.name}>{persona.nombre}</Text>
            <Text style={styles.desc}>{persona.descripcion}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    width: 120,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  name: {
    ...typography.styles.subtitle,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
  },
  desc: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
