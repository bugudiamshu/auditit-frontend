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
    subtitle: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    filtersRow: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.m,
        gap: theme.spacing.s,
    },
    filterChip: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    filterChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    filterChipText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        fontWeight: '700',
    },
    filterChipTextActive: {
        color: theme.colors.white,
    },

    list: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: 120,
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
        alignItems: 'flex-start',
        marginBottom: theme.spacing.s,
    },
    titleBlock: {
        flex: 1,
        paddingRight: theme.spacing.s,
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
    metaText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },

    amount: {
        fontSize: 18,
        fontWeight: '800',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: theme.spacing.s,
        marginTop: theme.spacing.m,
    },
    actionButton: {
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    approveButton: {
        backgroundColor: theme.colors.success,
    },
    rejectButton: {
        backgroundColor: 'rgba(255, 86, 48, 0.12)',
    },
    approveButtonText: {
        color: theme.colors.white,
        fontWeight: '700',
        fontSize: 13,
    },
    rejectButtonText: {
        color: theme.colors.danger,
        fontWeight: '700',
        fontSize: 13,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.s,
    },
    retryText: {
        color: theme.colors.primary,
        fontWeight: '700',
        marginTop: theme.spacing.s,
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
