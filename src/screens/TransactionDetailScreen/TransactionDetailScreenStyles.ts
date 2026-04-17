import {StyleSheet} from 'react-native';
import {theme} from '../../config/theme';

export const TransactionDetailScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
    },

    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    amountContainer: {
        alignItems: 'center',
        padding: 20,
    },

    amountLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },

    amountValue: {
        fontSize: 32,
        fontWeight: 'bold',
    },

    statusBadge: {
        marginTop: 10,
        padding: 6,
        borderRadius: 10,
    },

    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    detailsCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },

    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    detailLabel: {
        color: '#666',
    },

    detailValue: {
        fontWeight: 'bold',
    },

    remarksSection: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },

    remarksTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },

    remarksText: {
        color: '#555',
    },

    documentSection: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },

    documentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    documentIcon: {
        fontSize: 24,
        marginRight: 10,
    },

    documentTitle: {
        fontWeight: 'bold',
    },

    documentType: {
        fontSize: 12,
        color: '#666',
    },

    viewButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    viewButtonText: {
        color: '#fff',
    },

    /* 🔥 MODAL STYLES */
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    closeButton: {
        position: 'absolute',
        top: 60,
        right: 20,
    },

    closeText: {
        color: '#fff',
        fontSize: 22,
    },

    previewImage: {
        width: '95%',
        height: '80%',
        resizeMode: 'contain',
    },
});
