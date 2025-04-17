import {
    Pressable,
    View,
    Image,
    StyleSheet,
    Text
  } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Stack, useNavigation } from 'expo-router';

export default function ChatRoomHeader({item}) {
    const navigation = useNavigation();
    return (
        <View style={styles.customHeader}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <ArrowLeft size={24} color="#007AFF" />
            </Pressable>

            <View style={styles.headerTitle}>
                <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
                }}
                style={styles.headerAvatar}
                />
                <Text style={styles.headerName}>{item.username}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      
      backButton: {
        marginRight: 12,
      },
      
      headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      
      headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
      },
      
      headerName: {
        fontSize: 16,
        fontWeight: '600',
      },
      
})