import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatItem from '@/components/ChatItem';
import { Box } from '@/components/Box';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/authContext';
import { collection, query, where, getDocs, doc, onSnapshot, orderBy, limit } from "firebase/firestore";
import { usersRef, db } from "../../firebaseConfig";
import { useRouter } from 'expo-router';
import { getRoomId } from '@/utils/room';


const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const unsubscribers = useRef([]);

  const getUsersOnce = async () => {
    setLoading(true);
    try {
      const q = query(usersRef, where("userId", "!=", user.uid));
      const querySnapshot = await getDocs(q);
      let tempUsers = [];

      for (const docSnap of querySnapshot.docs) {
        const userData = { ...docSnap.data() };
        tempUsers.push(userData);
      }

      setUsers(tempUsers);
      listenForLastMessages(tempUsers);
    } catch (err) {
      console.error("Erreur lors du fetch des utilisateurs :", err);
    } finally {
      setLoading(false);
    }
  };

  const listenForLastMessages = (userList) => {
    unsubscribers.current.forEach(unsub => unsub());
    unsubscribers.current = [];

    userList.forEach(userItem => {
      const roomId = getRoomId(user.uid, userItem.userId);
      const lastMessageQuery = query(
        collection(doc(db, "rooms", roomId), "messages"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const unsubscribe = onSnapshot(lastMessageQuery, (snapshot) => {
        const msg = snapshot.docs[0]?.data();
        if (msg) {
          setUsers(prevUsers =>
            prevUsers
              .map(u =>
                u.userId === userItem.userId
                  ? { ...u, lastMessage: msg, lastMessageDate: msg.createdAt.toDate() }
                  : u
              )
              .sort((a, b) => (b.lastMessageDate || 0) - (a.lastMessageDate || 0))
          );
        }
      });

      unsubscribers.current.push(unsubscribe);
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getUsersOnce();
    }

    return () => {
      unsubscribers.current.forEach(unsub => unsub());
    };
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </Box>

      {loading ? (
        <Box style={styles.loader}>
          <ActivityIndicator size="large" />
        </Box>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => <ChatItem item={item} router={router} />}
          keyExtractor={(item) => item.userId}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
