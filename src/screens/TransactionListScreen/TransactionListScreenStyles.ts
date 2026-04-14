import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const TransactionListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    scopeCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: theme.spacing.l,
        marginTop: theme.spacing.m,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#EDF0F7',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    scopeTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        letterSpacing: -0.5,
    },
    scopeSubtitle: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginTop: 4,
        marginBottom: 16,
        fontWeight: '500',
    },

    // filtersRow: {
    //     flexDirection: 'row',
    //     paddingHorizontal: theme.spacing.l,
    //     paddingTop: theme.spacing.m,
    //     paddingBottom: theme.spacing.s,
    // },

    list: {
        paddingHorizontal: theme.spacing.l,
        paddingTop: theme.spacing.m,
        paddingBottom: 120,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
    },

    sectionHeader: {
        backgroundColor: '#F8F9FD',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#EDF0F7',
        marginLeft: 12,
    },

    compactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        position: 'relative',
    },

    compactMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },

    compactBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F8F9FD',
    },

    compactActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    compactActionButton: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: '#F8F9FD',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EDF0F7',
    },

    compactActionIcon: {
        fontSize: 14,
    },

    compactInfo: {
        flex: 1,
    },

    compactName: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    compactSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },

    compactMeta: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },

    compactValue: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    compactAmount: {
        fontSize: 16,
        fontWeight: '800',
        marginRight: 8,
    },

    compactStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    compactRemarks: {
        fontSize: 12,
        color: theme.colors.placeholder,
        fontStyle: 'italic',
        marginTop: 4,
    },

    rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F8F9FD',
    },

    backRightBtn: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    backRightBtnLeft: {
        backgroundColor: '#E6FFFA', // Light green background
        alignItems: 'flex-start',
        borderLeftWidth: 8,
        borderLeftColor: '#38A169',
    },

    backRightBtnRight: {
        backgroundColor: '#FFF5F5', // Light red background
        alignItems: 'flex-end',
        borderRightWidth: 8,
        borderRightColor: '#E53E3E',
    },

    backActionContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    backArrow: {
        fontSize: 32,
        color: '#2F855A', // Dark green for text/icon
        fontWeight: '300',
    },

    backArrowRight: {
        color: '#C53030', // Dark red for text/icon
    },

    backTextWhite: {
        color: '#2F855A',
        fontWeight: '800',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: -4,
    },

    backTextRed: {
        color: '#C53030',
    },

    undoCard: {
        backgroundColor: theme.colors.textPrimary,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    undoText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
    },

    undoButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },

    undoButtonText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 12,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleBlock: {
        flex: 1,
    },

    name: {
        fontSize: 17,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        letterSpacing: -0.3,
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },

    badgeText: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
    },

    amount: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -1,
    },

    paymentMode: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    remarksBox: {
        backgroundColor: '#F8F9FD',
        padding: 12,
        borderRadius: 16,
        marginBottom: 16,
    },

    remarks: {
        fontSize: 13,
        color: theme.colors.textPrimary,
        lineHeight: 18,
        fontWeight: '500',
    },

    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 4,
    },

    date: {
        fontSize: 12,
        color: theme.colors.placeholder,
        fontWeight: '700',
    },

    metaText: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },

    actionDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },

    primaryActions: {
        flexDirection: 'row',
        gap: 12,
    },

    secondaryActions: {
        flexDirection: 'row',
        gap: 8,
    },

    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    editIconButton: {
        backgroundColor: '#F0F7FF',
    },

    deleteIconButton: {
        backgroundColor: '#FFF5F5',
    },

    iconLabel: {
        fontSize: 16,
    },

    // Dropdown Styles
    dropdownContainer: {
        marginHorizontal: theme.spacing.l,
        marginTop: theme.spacing.m,
    },
    dropdownLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 4,
    },
    dropdownSelector: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#EDF0F7',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    dropdownValue: {
        fontSize: 15,
        fontWeight: '800',
        color: theme.colors.textPrimary,
    },
    dropdownChevron: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: '900',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingVertical: 24,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        paddingHorizontal: 16,
        color: theme.colors.textPrimary,
    },
    closeButton: {
        paddingHorizontal: 16,
    },
    closeText: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        fontWeight: '700',
    },
    societyOption: {
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    societyOptionText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    societyOptionCode: {
        fontSize: 12,
        fontWeight: '800',
        color: theme.colors.textSecondary,
        backgroundColor: '#F8F9FD',
        // paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    societyOptionActive: {
        backgroundColor: '#F0F7FF',
        borderRadius: 12,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        borderColor: theme.colors.primary,
        borderBottomColor: theme.colors.primary,
        borderWidth: 1,
    },

    actionButton: {
        flex: 1,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    approveButton: {
        backgroundColor: theme.colors.success,
    },
    rejectButton: {
        backgroundColor: '#FFF5F5',
        borderWidth: 1,
        borderColor: '#FED7D7',
    },
    approveButtonText: {
        color: theme.colors.white,
        fontWeight: '900',
        fontSize: 14,
    },
    rejectButtonText: {
        color: theme.colors.danger,
        fontWeight: '900',
        fontSize: 14,
    },

    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.l,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    sortLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    filterButton: {
        padding: 8,
        backgroundColor: '#F8F9FD',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EDF0F7',
    },

    filterIcon: {
        fontSize: 16,
    },

    filterModalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingBottom: 40,
        maxHeight: '85%',
    },

    filterModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    filterModalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: theme.colors.textPrimary,
    },

    filterSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    filterSectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
    },

    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        backgroundColor: '#F8F9FD',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EDF0F7',
        marginTop: 8,
    },

    dateInputText: {
        fontSize: 14,
        color: theme.colors.textPrimary,
        fontWeight: '600',
    },

    dateInputPlaceholder: {
        fontSize: 14,
        color: theme.colors.placeholder,
        fontWeight: '500',
    },

    sortOption: {
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingRight: 8,
    },

    sortOptionText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        flex: 1,
        marginRight: 12,
    },

    sortOptionActiveText: {
        color: theme.colors.primary,
        fontWeight: '800',
    },

    sortCheck: {
        fontSize: 18,
        color: theme.colors.primary,
        fontWeight: '900',
    },

    filterApplyButton: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 24,
        marginTop: 32,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },

    filterApplyText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
    },

    filterResetButton: {
        alignItems: 'center',
        marginTop: 16,
    },

    filterResetText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: '700',
    },

    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        backgroundColor: theme.colors.primary,
        width: 64,
        height: 64,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },

    fabIcon: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '900',
    },
});
