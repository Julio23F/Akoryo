import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { useAuh } from '../../context/authContext';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const Profile = () => {

  const { logout } = useAuh();

  const handleRegister = async () => {
    await logout();
  }

  return (
    <Box>
        <ThemedText type="title">Profile</ThemedText>
        <TouchableOpacity
            onPress={handleRegister}
            >
                <Text>Déconnexion</Text>
        </TouchableOpacity>
    </Box>
  )
}

export default Profile;
