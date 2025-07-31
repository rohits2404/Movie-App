import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Film } from 'lucide-react-native';

interface EmptyStateProps {
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
}

export default function EmptyState({ 
  title, 
  subtitle, 
  icon = <Film size={72} color="#9CA3AF" />
}: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#1F2937',
    },
    iconContainer: {
        backgroundColor: '#374151',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: '#F9FAFB',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        color: '#9CA3AF',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: '80%',
    },
});