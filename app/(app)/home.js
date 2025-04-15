import { View, Text, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatItem from '../../components/ChatItem';


const messages = [
  {
    id: '1',
    name: 'Alex Thomson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    lastMessage: "Thanks for reaching out. I'll get back to you...",
    timestamp: '18:03',
    unread: true,
  },
  {
    id: '2',
    name: 'Kirsty McDonald',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
    lastMessage: 'Perfect!',
    timestamp: '15:45',
  },
  {
    id: '3',
    name: 'Chris Leith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    lastMessage: 'When is a good time to meet?',
    timestamp: '12:32',
  },
  {
    id: '4',
    name: 'Harry Stebbings',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    lastMessage: '✓ Here is the pitch deck mentioned',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    name: 'Sophie Scott',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    lastMessage: 'Looking forward to hearing back',
    timestamp: 'Tuesday',
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: 8,
  },
});