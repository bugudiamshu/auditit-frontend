import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const TransactionListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    titleContainer: {
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    list: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.xl,
    },

    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.m,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '700',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    date: {
        fontSize: 13,
        color: theme.colors.textSecondary,
    },

    remarks: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },

    amount: {
        fontSize: 18,
        fontWeight: '800',
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fab: {
        position: 'absolute',
        bottom: 24,
        right: 20,
        backgroundColor: theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

        // Shadow (iOS)
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // Elevation (Android)
        elevation: 8,
    },

    fabIcon: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
        fontWeight: 'bold',
    },
});
