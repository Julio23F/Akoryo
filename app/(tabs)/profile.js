import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Mail, LogOut } from 'lucide-react-native';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const MENU_ITEMS = [
  { icon: Mail, label: 'Edit profile' },
];

const Profile = () => {
  const { logout, user } = useAuth();
  const [isShowingModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "L'accès à la galerie est nécessaire pour modifier la photo de profil.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // if (!result.canceled) {
    //   const uri = result.assets[0].uri;
      
    //   setShowEditModal(false);

    //   setSelectedImageUri(uri);

    //   try {
    //     await updateDoc(doc(db, "users", user?.uid), { 
    //       avatar: uri 
    //     });
    //     console.log("Image updated");
    //   } catch (e) {
    //     console.log("Erreur dans updateDoc :", e.message);
    //     return { succes: false, msg: "Erreur lors de l'update de l'image dans la base de données" };
    //   }
    // }
    if (!result.canceled) {
      const uri = result.assets[0].uri;
    
      const response = await fetch(uri);
      const blob = await response.blob();
    
      const reader = new FileReader();
    
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        setShowEditModal(false);
        setSelectedImageUri(`data:image/jpeg;base64,${base64data}`);
    
        try {
          await updateDoc(doc(db, "users", user?.uid), { 
            avatar: base64data
          });
          console.log("Image updated");
        } catch (e) {
          console.log("Erreur dans updateDoc :", e.message);
        }
      };
    
      reader.readAsDataURL(blob);
    }
    
  };

  useEffect(()=>{
    console.log("avatar", user.avatar)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={{ uri: selectedImageUri || user?.avatar }}
          style={styles.avatar}
        /> */}
        <Image
          source={{ uri: selectedImageUri || (user?.avatar ? `data:image/jpeg;base64,${user.avatar}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png") }}
          style={styles.avatar}
        />


        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, styles.borderBottom]}
            onPress={() => {
              if (item.label === 'Edit profile') {
                setShowEditModal(true);
              }
            }}
          >
            <item.icon size={24} color="#666" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.menuItem} onPress={() => setShowModal(true)}>
          <LogOut size={24} color="#666" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de déconnexion */}
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

      {/* Modal d'édition du profil */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Modifier la photo de profil ?</Text>
            <Text style={styles.modalMessage}>Voulez-vous sélectionner une nouvelle image depuis votre galerie ?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowEditModal(false)}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={pickImage}>
                <Text style={styles.confirmText}>Choisir une image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


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
  },
});

export default Profile;
