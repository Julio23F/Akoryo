import { Text, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatItem from '@/components/ChatItem';
import { Box } from '@/components/Box';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";
import { useRouter } from 'expo-router';

const MESSAGE_FORMAT = {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    lastMessage: 'Looking forward to hearing back',
    timestamp: 'Tuesday',
  }

const Home = () => {
  const {user} = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  const getUsers = async() => {
    setLoading(true);

    const q = query(usersRef, where("userId", "!=", user.uid));

    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot", querySnapshot)
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({...MESSAGE_FORMAT, ...doc.data()});
    });
    setUsers(data);
    setLoading(false);
    console.log("user.data.uid", user.uid);
    console.log("user.data", data);

  }

  useEffect(() => {
    
    if(user.uid) {
      getUsers();
    }
     
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* <Box style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </Box> */}
      {
        loading ? 
        <Box style={styles.loader}>
          <ActivityIndicator size="large"/>
        </Box>
        : <FlatList
            data={users}
            renderItem={({ item }) => <ChatItem item={item} router={router} />}
            keyExtractor={(item) => item.userId}
            contentContainerStyle={styles.listContent}
        />
      }
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
  loader: {
    flex: 1,
    justifyContent: "center"
  }
});


export default Home;