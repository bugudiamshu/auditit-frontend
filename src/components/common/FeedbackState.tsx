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
        padding: theme.spacing.xl,
    },
    centered: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.s,
    },
    button: {
        marginTop: theme.spacing.m,
        backgroundColor: theme.colors.primary,
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 12,
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: '700',
    },
});

export default FeedbackState;
