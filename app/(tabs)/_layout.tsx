import { Tabs } from 'expo-router';
import { Search, Heart } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#1a1a1a',
                borderTopColor: '#333',
                borderTopWidth: 1,
                paddingBottom: 5,
                paddingTop: 5,
                height: 60,
            },
            tabBarActiveTintColor: '#e50914',
            tabBarInactiveTintColor: '#666',
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            },
        }}>
            <Tabs.Screen
            name="index"
            options={{
                title: 'Search',
                tabBarIcon: ({ size, color }) => (
                    <Search size={size} color={color} />
                ),
            }}
            />
            <Tabs.Screen
            name="favorites"
            options={{
                title: 'Favorites',
                tabBarIcon: ({ size, color }) => (
                    <Heart size={size} color={color} />
                ),
            }}
            />
        </Tabs>
    );
}