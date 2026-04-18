import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';

export const OrganizationDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subHeader: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    header: {
        // Fallback for error state
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.s,
        marginBottom: theme.spacing.m,
    },
    backText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orgColorBadge: {
        width: 8,
        height: 48,
        borderRadius: 4,
        marginRight: 16,
    },
    orgTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: theme.colors.slate900,
        letterSpacing: -1,
    },
    orgSubtitle: {
        fontSize: 14,
        color: theme.colors.slate500,
        fontWeight: '500',
        marginTop: 2,
    },
    statsSection: {
        padding: theme.spacing.l,
        backgroundColor: '#F8F9FD',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        backgroundColor: theme.colors.white,
        width: '48%',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EDF0F7',
        elevation: 2,
        shadowColor: theme.colors.slate900,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    statCardWide: {
        width: '100%',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: theme.colors.slate500,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.slate900,
        marginTop: 8,
    },
    statCount: {
        fontSize: 11,
        fontWeight: '600',
        color: theme.colors.slate400,
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.slate900,
        letterSpacing: -0.5,
    },
    listContent: {
        paddingBottom: 40,
    },
    loader: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
