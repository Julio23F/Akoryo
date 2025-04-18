import { Tabs } from 'expo-router';
import { Settings, User, Home, MessageCircle } from 'lucide-react-native';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        tabBarActiveTintColor: '#0c3141',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <View style={{ position: 'relative' }}>
              <MessageCircle size={size} color={color} />
              <View
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  backgroundColor: '#0c3141',
                  borderRadius: 10,
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                  1
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
