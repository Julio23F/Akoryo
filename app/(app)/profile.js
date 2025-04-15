import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Mail, Bell, Globe2, CreditCard, Heart, Settings, LogOut } from 'lucide-react-native';
import { useAuh } from '../../context/authContext';
import { useState } from 'react';

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
  const [isShowingModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
  };

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
        <TouchableOpacity style={styles.menuItem} onPress={() => setShowModal(true)}>
          <LogOut size={24} color="#666" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowingModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Se déconnecter ?</Text>
            <Text style={styles.modalMessage}>Voulez-vous vraiment vous déconnecter ?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                <Text style={styles.confirmText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  //   backgroundColor: '#0c3141',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0c3141',
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  }
  
});