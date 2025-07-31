import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Star } from 'lucide-react-native';
import { MovieDetails } from '@/types/movie';
import { getMovieDetails } from '@/services/movieService';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/utils/favorites';
import LoadingSpinner from '@/components/LoadingSpinner';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen() {

    const router = useRouter();

    const { movieId } = useLocalSearchParams<{ movieId: string }>();

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMovieFavorite, setIsMovieFavorite] = useState(false);

    useEffect(() => {
        if (movieId) {
            loadMovieDetails();
            checkFavoriteStatus();
        }
    }, [movieId]);

    const loadMovieDetails = async () => {
        try {
            setLoading(true);
            const details = await getMovieDetails(movieId!);
            if (details.Response === 'True') {
                setMovie(details);
            } else {
                Alert.alert('Error', details.Error || 'Failed to load movie details');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    const checkFavoriteStatus = async () => {
        const favorite = await isFavorite(movieId!);
        setIsMovieFavorite(favorite);
    };

    const toggleFavorite = async () => {
        if (!movie) return;
        try {
            if (isMovieFavorite) {
                await removeFromFavorites(movie.imdbID);
                setIsMovieFavorite(false);
                Alert.alert('Removed', 'Movie removed from favorites');
            } else {
                const movieData = {
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Type: movie.Type,
                Poster: movie.Poster,
                };
                await addToFavorites(movieData);
                setIsMovieFavorite(true);
                Alert.alert('Added', 'Movie added to favorites');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update favorites');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#141414" />
                <LoadingSpinner />
            </SafeAreaView>
        );
    }

    if (!movie) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#141414" />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Movie details not found</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#141414" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
                    <Heart 
                    size={24} 
                    color={isMovieFavorite ? "#e50914" : "#fff"} 
                    fill={isMovieFavorite ? "#e50914" : "transparent"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.posterSection}>
                    <Image
                    source={{
                        uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/333/666?text=No+Image',
                    }}
                    style={styles.poster}
                    resizeMode="cover"
                    />
                </View>

                <View style={styles.detailsSection}>
                    <Text style={styles.title}>{movie.Title}</Text>
                
                    <View style={styles.metaInfo}>
                        <Text style={styles.year}>{movie.Year}</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.runtime}>{movie.Runtime}</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.rated}>{movie.Rated}</Text>
                    </View>

                    <View style={styles.genreContainer}>
                        {movie.Genre.split(', ').map((genre, index) => (
                            <View key={index} style={styles.genreTag}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>

                    {movie.imdbRating !== 'N/A' && (
                        <View style={styles.ratingSection}>
                            <View style={styles.ratingItem}>
                                <Star size={20} color="#f5c518" fill="#f5c518" />
                                <Text style={styles.ratingText}>
                                    {movie.imdbRating}/10
                                </Text>
                                <Text style={styles.ratingLabel}>IMDb</Text>
                            </View>
                            {movie.Metascore !== 'N/A' && (
                                <View style={styles.ratingItem}>
                                    <View style={styles.metascoreBox}>
                                        <Text style={styles.metascoreText}>{movie.Metascore}</Text>
                                    </View>
                                    <Text style={styles.ratingLabel}>Metascore</Text>
                                </View>
                            )}
                        </View>
                    )}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Plot</Text>
                        <Text style={styles.plot}>{movie.Plot}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cast & Crew</Text>
                        <View style={styles.creditItem}>
                            <Text style={styles.creditLabel}>Director:</Text>
                            <Text style={styles.creditValue}>{movie.Director}</Text>
                        </View>
                        <View style={styles.creditItem}>
                            <Text style={styles.creditLabel}>Actors:</Text>
                            <Text style={styles.creditValue}>{movie.Actors}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Additional Info</Text>
                        <View style={styles.creditItem}>
                            <Text style={styles.creditLabel}>Released:</Text>
                            <Text style={styles.creditValue}>{movie.Released}</Text>
                        </View>
                        <View style={styles.creditItem}>
                            <Text style={styles.creditLabel}>Language:</Text>
                            <Text style={styles.creditValue}>{movie.Language}</Text>
                        </View>
                        <View style={styles.creditItem}>
                            <Text style={styles.creditLabel}>Country:</Text>
                            <Text style={styles.creditValue}>{movie.Country}</Text>
                        </View>
                        {movie.Awards !== 'N/A' && (
                            <View style={styles.creditItem}>
                                <Text style={styles.creditLabel}>Awards:</Text>
                                <Text style={styles.creditValue}>{movie.Awards}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerButton: {
        padding: 8,
    },
    content: {
        flex: 1,
    },
    posterSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    poster: {
        width: width * 0.6,
        height: width * 0.9,
        borderRadius: 12,
    },
    detailsSection: {
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    metaInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    year: {
        color: '#999',
        fontSize: 16,
    },
    runtime: {
        color: '#999',
        fontSize: 16,
    },
    rated: {
        color: '#999',
        fontSize: 16,
    },
    separator: {
        color: '#666',
        fontSize: 16,
        marginHorizontal: 8,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    genreTag: {
        backgroundColor: '#333',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        margin: 4,
    },
    genreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    ratingSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        gap: 24,
    },
    ratingItem: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    ratingText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    ratingLabel: {
        color: '#999',
        fontSize: 14,
    },
    metascoreBox: {
        backgroundColor: '#f5c518',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    metascoreText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    plot: {
        color: '#ccc',
        fontSize: 16,
        lineHeight: 24,
    },
    creditItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    creditLabel: {
        color: '#999',
        fontSize: 16,
        fontWeight: '500',
        width: 80,
    },
    creditValue: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#e50914',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});