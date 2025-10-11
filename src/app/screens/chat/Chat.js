import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, BottomNavbar } from '../../components';
import { styles } from './Chat.styles';

// Pantalla de chat
const Chat = () => {
    const navigation = useNavigation();
    
    const handleBackPress = () => {
        navigation.goBack();
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader 
                title="Chat"
                subtitle="Coordina los detalles y resuelve dudas directamente con tu prestador"
                onBackPress={handleBackPress}
                showBackButton={true}
            />

            <View style={styles.content}>
                <Text style={styles.placeholder}>Pantalla en desarrollo :)</Text>
            </View>

            {/* Navegación inferior */}
            <BottomNavbar />
        </SafeAreaView>
    );
};

export default Chat;