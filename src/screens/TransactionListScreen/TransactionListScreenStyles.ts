import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const TransactionListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    backButton: {
        marginRight: theme.spacing.m,
    },

    backButtonText: {
        fontSize: 16,
        color: theme.colors.primary,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },

    listContent: {
        padding: theme.spacing.m,
    },

    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.m,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },

    personName: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },

    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    date: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },

    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    remarks: {
        marginTop: theme.spacing.s,
        fontSize: 13,
        color: theme.colors.textSecondary,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
