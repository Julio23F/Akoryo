import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Box } from '@/components/Box';

import { useRouter } from 'expo-router';
import { MessageSquare, Eye, EyeOff } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuh } from '../context/authContext';
import { ActivityIndicator } from 'react-native';

export default function SingUp() {
    const router = useRouter();
    const {register} = useAuh();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    
    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
          Alert.alert("Inscription", "Veuillez remplir tous les champs.");
          return;
        }
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert("Adresse e-mail invalide", "Veuillez entrer une adresse e-mail valide.");
          return;
        }
      
        if (password.length < 6) {
          Alert.alert("Mot de passe trop court", "Le mot de passe doit contenir au moins 6 caractères.");
          return;
        }
      
        if (password !== confirmPassword) {
          Alert.alert("Erreur de confirmation", "Les mots de passe ne correspondent pas.");
          return;
        }
      
        setLoading(true);
        const response = await register(username, email, password);
        setLoading(false);
      
        if (!response.succes) {
          Alert.alert("Inscription", response.msg);
          return;
        }
      
        // router.push("home");
      };
      

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <StatusBar style='dark'/>
            <Box style={styles.content}>
            <Box style={styles.header}>
                <Image
                source={{ uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop' }}
                style={styles.headerImage}
                />
                <MessageSquare size={48} color="#007AFF" style={styles.logoIcon} />
                <Text style={styles.title}>Créer un compte</Text>
                <Text style={styles.subtitle}>Rejoignez notre communauté de messagerie</Text>
            </Box>

            <Box style={styles.form}>
                <Box style={styles.inputContainer}>
                <Text style={styles.label}>Nom complet</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom complet"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="words"
                    autoComplete="name"
                />
                </Box>

                <Box style={styles.inputContainer}>
                <Text style={styles.label}>Adresse e-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />
                </Box>

                <Box style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe</Text>
                
                <Box style={styles.passwordField}>
                    <TextInput
                        style={[styles.input, { flex: 1, borderWidth: 0, backgroundColor: 'transparent' }]}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <EyeOff size={20} color="#999" />
                    ) : (
                        <Eye size={20} color="#999" />
                    )}
                    </TouchableOpacity>
                </Box>
                </Box>

                <Box style={styles.inputContainer}>
                {/* <Text style={styles.label}>Confirmer le mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                /> */}
                <Box style={styles.passwordField}>
                    <TextInput
                        style={[styles.input, { flex: 1, borderWidth: 0, backgroundColor: 'transparent' }]}
                        placeholder="Confirmez votre mot de passe"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfPassword(!showConfPassword)}>
                    {showConfPassword ? (
                        <EyeOff size={20} color="#999" />
                    ) : (
                        <Eye size={20} color="#999" />
                    )}
                    </TouchableOpacity>
                </Box>
                </Box>
                {
                    loading ? <ActivityIndicator />
                    :
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                        >
                            <Text style={styles.registerButtonText}>Créer un compte</Text>
                    </TouchableOpacity>

                }
                
            </Box>

            <Box style={styles.footer}>
                <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
                <TouchableOpacity onPress={() => {router.replace("singIn");}}>
                <Text style={styles.signupText}>Se connecter</Text>
                </TouchableOpacity>
            </Box>

            <Text style={styles.termsText}>
                En créant un compte, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
            </Text>
            </Box>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingRight: 16,
    backgroundColor: '#F8F8F8',
    height: 48,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  registerButton: {
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signupText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
    color: '#999',
  },
});
