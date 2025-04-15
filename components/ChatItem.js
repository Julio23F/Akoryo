import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const ChatItem = ({ item }) => (
    <Pressable style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage,
            item.unread && styles.unreadMessage
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </Pressable>
  );

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },
    messageContent: {
        flex: 1,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    timestamp: {
        fontSize: 14,
        color: '#666',
    },
    lastMessage: {
        fontSize: 15,
        color: '#666',
    },
    unreadMessage: {
        color: '#000',
        fontWeight: '500',
    },
})
export default ChatItem;