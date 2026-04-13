import { StyleSheet } from "react-native";
import { theme } from "../../config/theme";

export const PortfolioStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    header: {
        padding: theme.spacing.l,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    list: {
        padding: theme.spacing.l,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        elevation: 4,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    cardSub: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    arrow: {
        fontSize: 24,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    globalButton: {
        margin: theme.spacing.l,
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        elevation: 4,
    },
    globalButtonText: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
