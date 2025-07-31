import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Movie } from '@/types/movie';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface MovieCardProps {
    movie: Movie;
    onPress: () => void;
    showRating?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function MovieCard({ movie, onPress, showRating = false }: MovieCardProps) {
    return (
        <TouchableOpacity 
        style={styles.container} 
        onPress={onPress}
        activeOpacity={0.8}
        >
            <View style={styles.posterContainer}>
                <Image
                source={{
                    uri: movie.Poster !== 'N/A' 
                    ? movie.Poster 
                    : 'https://via.placeholder.com/300x450/333/666?text=No+Image',
                }}
                style={styles.poster}
                resizeMode="cover"
                />
        
                <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
                />
        
                <View style={styles.overlay}>
                    <View style={styles.yearBadge}>
                        <Text style={styles.yearText}>{movie.Year}</Text>
                    </View>
          
                    {showRating && (
                        <View style={styles.ratingBadge}>
                        <MaterialIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>7.5</Text>
                        </View>
                    )}
                </View>
            </View>
      
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {movie.Title}
                </Text>
                
                <View style={styles.footer}>
                    <Text style={styles.type}>{movie.Type}</Text>
                    <MaterialIcons name="chevron-right" size={18} color="#9CA3AF" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        marginBottom: 24,
        backgroundColor: '#1F2937',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    posterContainer: {
        position: 'relative',
        height: cardWidth * 1.5,
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
    },
    overlay: {
        position: 'absolute',
        top: 12,
        right: 12,
        left: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    yearBadge: {
        backgroundColor: 'rgba(229, 9, 20, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    yearText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
    },
    ratingBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
    },
    info: {
        padding: 16,
    },
    title: {
        color: '#F9FAFB',
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 8,
        lineHeight: 20,
    },
    type: {
        color: '#9CA3AF',
        fontSize: 12,
        textTransform: 'capitalize',
        fontFamily: 'Inter-Medium',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});