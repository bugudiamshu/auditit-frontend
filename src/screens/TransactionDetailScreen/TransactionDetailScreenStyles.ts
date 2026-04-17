import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';

export const TransactionDetailScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.slate50,
    },
    inlineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: theme.colors.white,
    },
    inlineBackButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.colors.slate50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    inlineBackIcon: {
        fontSize: 20,
        color: theme.colors.slate900,
    },
    inlineTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.slate900,
        letterSpacing: -0.5,
    },

    amountContainer: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: theme.colors.slate900,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },

    amountLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.colors.slate500,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },

    amountValue: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
    },

    statusBadge: {
        alignSelf: 'center',
        marginTop: -20, // More overlap for a modern look
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25, // Pill shape
        borderWidth: 3,
        borderColor: theme.colors.white,
        shadowColor: theme.colors.slate900,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    detailsCard: {
        margin: 20,
        padding: 24,
        backgroundColor: theme.colors.white,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },

    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.slate50,
    },

    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.slate500,
    },

    detailValue: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.slate900,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: theme.colors.slate900,
        marginLeft: 24,
        marginTop: 8,
        marginBottom: 12,
    },

    remarksSection: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        backgroundColor: theme.colors.white,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },

    remarksText: {
        fontSize: 15,
        color: theme.colors.slate700,
        lineHeight: 22,
        fontWeight: '500',
    },

    documentSection: {
        marginHorizontal: 20,
        marginBottom: 32,
        padding: 20,
        backgroundColor: theme.colors.white,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },

    documentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    documentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: theme.colors.slate50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    documentIcon: {
        fontSize: 22,
    },

    documentInfo: {
        flex: 1,
    },

    documentTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.slate900,
    },

    documentType: {
        fontSize: 12,
        color: theme.colors.slate400,
        fontWeight: '700',
        marginTop: 2,
    },

    viewButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },

    viewButtonText: {
        color: theme.colors.white,
        fontSize: 13,
        fontWeight: '800',
    },

    /* 🔥 MODAL STYLES */
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    closeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '300',
    },

    previewImage: {
        width: '90%',
        height: '75%',
        borderRadius: 16,
    },
});
