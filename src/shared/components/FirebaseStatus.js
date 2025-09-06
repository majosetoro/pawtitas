import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getApps } from 'firebase/app';

const FirebaseStatus = () => {
  const isFirebaseInitialized = getApps().length > 0;
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.statusText,
      ]}>
        Firebase: {isFirebaseInitialized ? 'Habilitado' : 'Deshabilitado'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 8,
    borderRadius: 4,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FirebaseStatus;
