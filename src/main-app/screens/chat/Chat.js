import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, MenuInferior } from '../../components';
import { useStreamChat } from '../../contexts';
import { ChatController } from '../../controller';
import { colors } from '../../../shared/styles';
import { styles } from './Chat.styles';

const Chat = () => {
    const navigation = useNavigation();
    const { chatClient, isReady, currentUser, createOrGetChannel, initializeChat } = useStreamChat();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mockUsersVisible, setMockUsersVisible] = useState(true);

    useEffect(() => {
        if (!isReady) {
            const autoLoginData = ChatController.getAutoLoginData();
            initializeChat(
                autoLoginData.userId,
                autoLoginData.userName,
                autoLoginData.userToken,
                autoLoginData.userImage,
                autoLoginData.userRole
            ).catch(err => console.error("Error auto-login chat:", err));
        }
    }, [isReady]);

    useEffect(() => {
        if (!isReady || !chatClient || !currentUser) return;

        let isMounted = true;

        const fetchChannels = async () => {
            try {
                const fetchedChannels = await ChatController.fetchUserChannels(
                    chatClient,
                    currentUser.id
                );

                if (isMounted) {
                    setChannels(fetchedChannels);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching channels:", error);
                if (isMounted) setLoading(false);
            }
        };

        fetchChannels();

        const handleEvent = (event) => {
             if (ChatController.isNewMessageEvent(event)) {
                 fetchChannels(); 
             }
        };

        chatClient.on(handleEvent);

        return () => {
            isMounted = false;
            chatClient.off(handleEvent);
        };
    }, [isReady, chatClient, currentUser]);

    const handleChannelPress = (channel) => {
        navigation.navigate('Conversacion', { channelId: channel.id });
    };

    const handleMockUserPress = async (user) => {
        if (!createOrGetChannel) return;
        
        try {
            setLoading(true);
            const channel = await createOrGetChannel(user.id, user.name, user.image, user.role);
            setLoading(false);
            if (channel) {
                navigation.navigate('Conversacion', { channelId: channel.id });
            }
        } catch (error) {
            console.error("Error creating mock channel", error);
            setLoading(false);
        }
    };

    const getUserRole = (user) => {
        return ChatController.getUserRole(user);
    };

    const renderChannelItem = ({ item }) => {
        const otherUser = ChatController.getOtherUser(item, currentUser.id);
        const lastMessage = ChatController.getLastMessage(item);
        const userRole = getUserRole(otherUser);
        const dateString = ChatController.formatMessageDate(lastMessage?.created_at);

        return (
            <TouchableOpacity style={styles.channelItem} onPress={() => handleChannelPress(item)}>
                <Image 
                    source={{ uri: ChatController.getUserImage(otherUser) }} 
                    style={styles.avatar} 
                />
                <View style={styles.channelInfo}>
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {ChatController.getUserName(otherUser, item)}
                        </Text>
                        {lastMessage && (
                            <Text style={styles.date}>{dateString}</Text>
                        )}
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.lastMessage} numberOfLines={1}>
                            {lastMessage ? lastMessage.text : 'Haz clic para iniciar la conversación'}
                        </Text>
                        {userRole && (
                            <View style={styles.roleChip}>
                                <Text style={styles.roleChipText}>{userRole}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderMockUserItem = ({ item }) => (
        <TouchableOpacity style={styles.channelItem} onPress={() => handleMockUserPress(item)}>
             <Image 
                source={{ uri: item.image }} 
                style={styles.avatar} 
            />
            <View style={styles.channelInfo}>
                <View style={styles.row}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.bottomRow}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        Haz clic para iniciar la conversación
                    </Text>
                    {item.role && (
                        <View style={styles.roleChip}>
                            <Text style={styles.roleChipText}>{item.role}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    if (!isReady) {
        return (
            <SafeAreaView style={styles.container}>
                <ScreenHeader title="Chat" showBackButton={true} onBackPress={() => navigation.goBack()} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
                <MenuInferior />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title="Chat" subtitle="Historial de conversaciones" showBackButton={true} onBackPress={() => navigation.goBack()}/>
            
            {loading ? (
                 <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    {channels.length > 0 ? (
                        <FlatList
                            data={channels}
                            keyExtractor={(item) => item.id}
                            renderItem={renderChannelItem}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                         <View style={{flex: 1}}>
                            <FlatList
                                data={ChatController.getMockUsers()}
                                keyExtractor={(item) => item.id}
                                renderItem={renderMockUserItem}
                                contentContainerStyle={styles.listContent}
                            />
                             <View style={styles.emptyContainer}>
                                <Text style={styles.emptySubtext}>
                                    Iniciá la conversación con un usuario.
                                </Text>
                            </View>
                        </View>
                    )}
                </>
            )}
            <MenuInferior />
        </SafeAreaView>
    );
};

export default Chat;
