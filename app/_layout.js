import { ThemedText } from '@/components/ThemedText';
import { Box } from '@/components/Box';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextProvider, useAuh } from '../context/authContext';
import { useEffect } from 'react';

const MainLayout = () => {
  const {isAuthentificated} = useAuh();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("segments", segments)
    if (typeof isAuthentificated == undefined) return;
    const inApp = segments[0] == '(app)';
    
    if (isAuthentificated && !inApp){
      //redirect to home
      router.replace("home");
    }
    else if(isAuthentificated == false) {
      // redirect to login
      router.replace("singIn");

    }
  },[isAuthentificated])
  
  return <Slot />
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
        <MainLayout />
    </AuthContextProvider>
  )
}

export default RootLayout;
