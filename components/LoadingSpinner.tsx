import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    color?: string;
    message?: string;
    background?: string;
}

export default function LoadingSpinner({ 
  size = 'large', 
  color = '#e50914',
  message = 'Loading...',
  background = 'rgba(0, 0, 0, 0.7)'
}: LoadingSpinnerProps) {
    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <View style={styles.spinnerContainer}>
                <ActivityIndicator 
                size={size} 
                color={color} 
                style={styles.spinner}
                />
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    spinnerContainer: {
        backgroundColor: '#1F2937',
        padding: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    spinner: {
        transform: [{ scale: 1.5 }],
    },
    message: {
        color: '#F3F4F6',
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
    },
});