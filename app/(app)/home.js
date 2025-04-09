import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { useAuh } from '../../context/authContext';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const Home = () => {

  const { logout } = useAuh();

  const handleRegister = async () => {
    await logout();
  }

  return (
    <Box>
        <ThemedText type="title">Home</ThemedText>
        <TouchableOpacity
            onPress={handleRegister}
            >
                <Text>Déconnexion</Text>
        </TouchableOpacity>
    </Box>
  )
}

export default Home;
