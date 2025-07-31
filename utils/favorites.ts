import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/types/movie';

const FAVORITES_KEY = '@movie_favorites';

export const getFavorites = async (): Promise<Movie[]> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
};

export const addToFavorites = async (movie: Movie): Promise<void> => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = [movie, ...favorites.filter(fav => fav.imdbID !== movie.imdbID)];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
};

export const removeFromFavorites = async (imdbID: string): Promise<void> => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error removing from favorites:', error);
    }
};

export const isFavorite = async (imdbID: string): Promise<boolean> => {
    try {
        const favorites = await getFavorites();
        return favorites.some(fav => fav.imdbID === imdbID);
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
};