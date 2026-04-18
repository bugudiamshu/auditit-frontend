import { StyleSheet } from "react-native";
import { theme } from "../../config/theme";

export const PortfolioStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeader: {
        padding: theme.spacing.l,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.slate900,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.slate500,
        fontWeight: '500',
        marginTop: 2,
    },
    list: {
        padding: theme.spacing.l,
        paddingTop: 20,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EDF0F7',
        elevation: 3,
        shadowColor: theme.colors.slate900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardContent: {
        flex: 1,
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: theme.colors.textPrimary,
    },
    cardSub: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 6,
        fontWeight: '500',
    },
    arrow: {
        fontSize: 20,
        color: theme.colors.primary,
        fontWeight: '900',
    },
    loader: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});
