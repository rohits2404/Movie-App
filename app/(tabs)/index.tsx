import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Movie, SearchResponse } from '@/types/movie';
import { searchMovies } from '@/services/movieService';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function SearchScreen() {

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('light-content');
        }, [])
    );

    const handleSearch = async (query: string, page: number = 1) => {
        if (!query.trim()) return;

        if (page === 1) {
            setLoading(true);
            setMovies([]);
        } else {
            setLoadingMore(true);
        }

        try {
            const response: SearchResponse = await searchMovies(query, page);
            
            if (response.Response === 'True' && response.Search) {
                const newMovies = page === 1 ? response.Search : [...movies, ...response.Search];
                setMovies(newMovies);
                setTotalResults(parseInt(response.totalResults));
                setCurrentPage(page);
            } else {
                if (page === 1) {
                    setMovies([]);
                    setTotalResults(0);
                }
                if (response.Error) {
                    Alert.alert('Search Error', response.Error);
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to search movies. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
            if (page === 1) {
                setHasSearched(true);
            }
        }
    };

    const handleLoadMore = () => {
        if (loadingMore || movies.length >= totalResults) return;
        handleSearch(searchQuery, currentPage + 1);
    };

    const handleMoviePress = (movie: Movie) => {
        router.push({
            pathname: '/movie-details',
            params: { movieId: movie.imdbID },
        });
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            handleSearch(searchQuery);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setMovies([]);
        setHasSearched(false);
        setTotalResults(0);
        setCurrentPage(1);
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
    );

    const renderFooter = () => {
        if (loadingMore) {
            return (
                <View style={styles.footerLoading}>
                    <LoadingSpinner size="small" />
                    <Text style={styles.loadingText}>Loading more movies...</Text>
                </View>
            );
        }
        return null;
    };

    const renderEmptyContent = () => {
        if (loading) {
            return <LoadingSpinner />;
        }

        if (hasSearched && movies.length === 0) {
            return (
                <EmptyState
                title="No movies found"
                subtitle={`No results found for "${searchQuery}". Try searching with different keywords.`}
                />
            );
        }

        return (
            <EmptyState
            title="Search for Movies"
            subtitle="Enter a movie title in the search bar above to find your favorite movies."
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Movie Search</Text>
            </View>

            <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            />

            {searchQuery.trim() && !loading && (
                <TouchableOpacity 
                style={styles.searchButton} 
                onPress={handleSearchSubmit}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            )}

            {movies.length > 0 && (
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsText}>
                        {totalResults} results found for "{searchQuery}"
                    </Text>
                </View>
            )}

            <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.imdbID}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyContent}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
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
    searchButton: {
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: '#e50914',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    resultsHeader: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    resultsText: {
        color: '#999',
        fontSize: 14,
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
    },
    row: {
        justifyContent: 'space-between',
    },
    footerLoading: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        color: '#666',
        marginTop: 8,
        fontSize: 14,
    },
});