import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Mail, Bell, Globe2, CreditCard, Heart, Settings, LogOut } from 'lucide-react-native';
import { useAuh } from '../../context/authContext';

const MENU_ITEMS = [
  { icon: Mail, label: 'Edit profile' },
  { icon: Bell, label: 'Notifications' },
  { icon: Globe2, label: 'Language' },
  { icon: CreditCard, label: 'My card' },
  { icon: Heart, label: 'Favorite' },
  { icon: Settings, label: 'Settings' },
];

export default function Profile() {
  const { logout } = useAuh();

  const handleLogout = async () => {
    await logout();
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jimmy Sullivan</Text>
        <Text style={styles.email}>jimmysullivan@gmail.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.menuItem, styles.borderBottom]}>
            <item.icon size={24} color="#666" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.menuItem}>
          <LogOut size={24} color="#666" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  // logoutButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#7c3aed',
  //   paddingVertical: 16,
  //   borderRadius: 12,
  //   marginTop: 'auto',
  //   marginBottom: 30,
  // },
  // logoutText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '600',
  //   marginLeft: 8,
  // },
});