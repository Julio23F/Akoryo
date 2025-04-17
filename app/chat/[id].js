import { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send, ArrowLeft } from 'lucide-react-native';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/room';
import { addDoc, collection, doc, onSnapshot, orderBy, setDoc, Timestamp, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const {user} = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    createRoomIfNotExists();

    getMessages();
  }, []);

  const getMessages = () => {
    const roomId = getRoomId(user.uid, item.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");

    const q = query(messagesRef, orderBy("createdAt", "asc"));

    // onSnapshot (écoute en temps réel)
    const unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });
    console.log("messages", messages)
    return unsub;
  }

  const createRoomIfNotExists = async() => {
    const roomId = getRoomId(user.uid, item.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }


  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    try{
      const roomId = getRoomId(user.uid, item.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");

      const newDoc = addDoc(messagesRef, {
        userId: user.uid,
        text: newMessage,
        createdAt: Timestamp.fromDate(new Date())
      })

    }catch(r){
      Alert.alert("Alert", e.message);
    }

    setNewMessage('');
  };

  return (
    <>
      {/* <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
                }}
                style={styles.headerAvatar}
              />
              <Text style={styles.headerName}>{item.username}</Text>
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#007AFF" />
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      /> */}
      <ChatRoomHeader
        item={item}
      />
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.createdAt}
          inverted
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.userId === user.uid
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              {/* <Text style={styles.timestamp}>
                15
              </Text> */}
            </View>
          )}
        />
        
        <View style={styles.flexGrow} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            multiline
          />
          <Pressable
            onPress={handleSendMessage}
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}>
            <Send
              size={24}
              color={newMessage.trim() ? '#fff' : '#A0A0A0'}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexGrow: {
    flex: 1,
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
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E9E9EB',
  },


  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  sentMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
