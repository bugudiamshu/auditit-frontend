import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../config/theme';

type FeedbackStateProps = {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    centered?: boolean;
};

const FeedbackState = ({
    title,
    description,
    actionLabel,
    onAction,
    centered = false,
}: FeedbackStateProps) => (
    <View
        style={[styles.container, centered && styles.centered]}
    >
        <Text style={styles.title}>{title}</Text>
        {description ? (
            <Text style={styles.description}>{description}</Text>
        ) : null}
        {actionLabel && onAction ? (
            <TouchableOpacity style={styles.button} onPress={onAction}>
                <Text style={styles.buttonText}>{actionLabel}</Text>
            </TouchableOpacity>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    centered: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: '500',
    },
    button: {
        marginTop: 32,
        backgroundColor: theme.colors.primary,
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 14,
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: '800',
        fontSize: 15,
    },
});

export default FeedbackState;
