import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search movies...',
  onFocus,
  onBlur,
}: SearchBarProps) {

    const [isFocused, setIsFocused] = useState(false);

    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View
            style={[
                styles.searchContainer,
                isFocused && styles.searchContainerFocused,
                { transform: [{ scale: scaleValue }] }
            ]}
            >
                <Search 
                size={22} 
                color={isFocused ? '#e50914' : '#9CA3AF'} 
                style={styles.searchIcon} 
                />

                <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => {
                    setIsFocused(true);
                    onFocus?.();
                }}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur?.();
                }}
                returnKeyType="search"
                clearButtonMode="never"
                />

                {value.length > 0 && (
                    <TouchableOpacity 
                        onPress={onClear}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={styles.clearButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <X size={22} color="#9CA3AF" />
                    </TouchableOpacity>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: '#374151',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchContainerFocused: {
        borderColor: '#e50914',
        shadowColor: '#e50914',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    searchIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#F9FAFB',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        paddingVertical: 2,
        includeFontPadding: false,
    },
    clearButton: {
        marginLeft: 8,
        padding: 2,
        borderRadius: 12,
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
    },
});