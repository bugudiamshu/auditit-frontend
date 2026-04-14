import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const TransactionListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9', // Slightly deeper slate for better contrast with white cards
    },

    // Unified Card Container with margins
    mainCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        marginHorizontal: 16, // Added horizontal margins
        borderRadius: 24, // Full rounding for the "enclosed" look
        // Subtle shadow for the main container
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        overflow: 'hidden',
        marginBottom: 16, // Added bottom margin to clear the screen bottom
    },

    list: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 120,
    },

    sectionHeader: {
        paddingHorizontal: 4,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F1F5F9',
        marginLeft: 12,
    },

    // Modernized Transaction Card
    compactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        // Very subtle shadow
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },

    compactMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    compactInfo: {
        flex: 1,
        marginRight: 12,
    },

    compactName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },

    compactValue: {
        alignItems: 'flex-end',
    },

    compactAmount: {
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    compactStatusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
    },

    compactRemarks: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 8,
        lineHeight: 18,
    },

    compactBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
    },

    compactMeta: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },

    compactActions: {
        flexDirection: 'row',
        gap: 8,
    },

    compactActionButton: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#F8FAFC',
    },

    compactActionIcon: {
        fontSize: 14,
    },

    // Redesigned Integrated Filter Bar
    filterBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: '#FFFFFF',
    },

    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 44,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    searchPlaceholder: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '500',
        marginLeft: 8,
    },

    filterActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        gap: 8,
    },

    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    iconButtonActive: {
        backgroundColor: '#0F172A',
        borderColor: '#0F172A',
    },

    iconText: {
        fontSize: 18,
    },

    activeFilterBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#38BDF8',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },

    activeFilterText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '900',
    },

    // Dropdown Style
    dropdownContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    dropdownLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 8,
    },
    dropdownSelector: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dropdownValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    dropdownChevron: {
        fontSize: 12,
        color: '#64748B',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '80%',
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    closeText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },

    filterSection: {
        padding: 24,
    },
    filterSectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },

    dateInput: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginTop: 6,
    },
    dateInputText: {
        fontSize: 14,
        color: '#1E293B',
        fontWeight: '600',
    },
    dateInputPlaceholder: {
        fontSize: 14,
        color: '#94A3B8',
    },

    filterApplyButton: {
        backgroundColor: '#0F172A',
        marginHorizontal: 24,
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    filterApplyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    filterResetButton: {
        alignItems: 'center',
        marginTop: 16,
    },
    filterResetText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '600',
    },

    // Swipe Visuals
    rowBack: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 12,
        borderRadius: 20,
        overflow: 'hidden',
    },
    backRightBtn: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    backRightBtnLeft: {
        backgroundColor: '#DCFCE7',
        alignItems: 'flex-start',
    },
    backRightBtnRight: {
        backgroundColor: '#FEE2E2',
        alignItems: 'flex-end',
    },
    backActionContent: {
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 18,
        color: '#166534',
        fontWeight: 'bold',
    },
    backTextWhite: {
        color: '#166534',
        fontWeight: '800',
        fontSize: 10,
        textTransform: 'uppercase',
        marginTop: 2,
    },

    societyOption: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    societyOptionText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
    },
    societyOptionCode: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    societyOptionActive: {
        backgroundColor: '#F0F9FF',
    },
    sortCheck: {
        fontSize: 16,
        color: '#0EA5E9',
        fontWeight: '900',
    },

    sortOption: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F8FAFC',
    },
    sortOptionText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#475569',
    },
    sortOptionActiveText: {
        color: '#0EA5E9',
        fontWeight: '700',
    },

    undoCard: {
        backgroundColor: '#0F172A',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    undoText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    undoButton: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    undoButtonText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 11,
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
    },

    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        backgroundColor: '#0F172A',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    fabIcon: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '300',
    },
});
