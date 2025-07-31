import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Heart } from 'lucide-react-native';
import { Movie } from '@/types/movie';
import { getFavorites } from '@/utils/favorites';
import MovieCard from '@/components/MovieCard';
import EmptyState from '@/components/EmptyState';

export default function FavoritesScreen() {

    const router = useRouter();
    const [favorites, setFavorites] = useState<Movie[]>([]);

    const loadFavorites = async () => {
        const favs = await getFavorites();
        setFavorites(favs);
    };

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('light-content');
            loadFavorites();
        }, [])
    );

    const handleMoviePress = (movie: Movie) => {
        router.push({
            pathname: '/movie-details',
            params: { movieId: movie.imdbID },
        });
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
    );

    const renderEmptyContent = () => (
        <EmptyState
        title="No Favorites Yet"
        subtitle="Movies you mark as favorites will appear here. Start exploring and save your favorite movies!"
        icon={<Heart size={64} color="#666" />}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Favorites</Text>
                {favorites.length > 0 && (
                    <Text style={styles.headerSubtitle}>
                        {favorites.length} movie{favorites.length !== 1 ? 's' : ''}
                    </Text>
                )}
            </View>

            <FlatList
            data={favorites}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.imdbID}
            numColumns={2}
            columnWrapperStyle={favorites.length > 1 ? styles.row : null}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyContent}
            showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: '#999',
        fontSize: 14,
        marginTop: 4,
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
    },
    row: {
        justifyContent: 'space-between',
    },
});