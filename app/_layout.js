import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { UnreadMessagesProvider } from '../context/UnreadMessagesContext';
import { useEffect } from 'react';

const MainLayout = () => {
  const {isAuthentificated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("segments", segments)
    if (typeof isAuthentificated === 'undefined') return;

    const inTabs = segments[0] == '(tabs)';
    
    if (isAuthentificated && !inTabs){
      //redirect to home
      router.replace("home");
    }
    else if(isAuthentificated == false) {
      // redirect to login
      router.replace("auth/signIn");

    }
  },[isAuthentificated])  
  return <Slot />
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
       <UnreadMessagesProvider>
        <MainLayout />
       </UnreadMessagesProvider>
    </AuthContextProvider>
  )
}

export default RootLayout;
