import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

export const TransactionListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    // Unified Card Container with margins
    mainCard: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        marginTop: theme.spacing.s,
        marginHorizontal: theme.spacing.m,
        borderRadius: theme.borderRadius.xxl,
        shadowColor: theme.colors.slate500,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        overflow: 'hidden',
        marginBottom: theme.spacing.m,
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
        backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: theme.colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.slate100,
        marginLeft: 12,
    },

    // Modernized Transaction Card
    compactCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
        shadowColor: theme.colors.slate900,
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
        color: theme.colors.textPrimary,
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
        color: theme.colors.textSecondary,
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
        borderTopColor: theme.colors.slate50,
    },

    compactMeta: {
        fontSize: 12,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },

    compactActions: {
        flexDirection: 'row',
        gap: 8,
    },

    compactActionButton: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: theme.colors.slate50,
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
        borderBottomColor: theme.colors.slate100,
        backgroundColor: theme.colors.surface,
    },

    searchBarWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.slate50,
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 44,
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },

    searchPlaceholder: {
        fontSize: 14,
        color: theme.colors.textMuted,
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
        backgroundColor: theme.colors.slate50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.slate100,
    },

    iconButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },

    iconText: {
        fontSize: 18,
    },

    activeFilterBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: theme.colors.secondary,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.white,
    },

    activeFilterText: {
        color: theme.colors.white,
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
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 8,
    },
    dropdownSelector: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: theme.colors.slate200,
    },
    dropdownValue: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    dropdownChevron: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
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
        borderBottomColor: theme.colors.slate100,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: theme.colors.textPrimary,
    },
    closeText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.textSecondary,
    },

    filterSection: {
        padding: 24,
    },
    filterSectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },

    dateInput: {
        backgroundColor: theme.colors.slate50,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.colors.slate200,
        marginTop: 6,
    },
    dateInputText: {
        fontSize: 14,
        color: theme.colors.textPrimary,
        fontWeight: '600',
    },
    dateInputPlaceholder: {
        fontSize: 14,
        color: theme.colors.textMuted,
    },

    filterApplyButton: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 24,
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    filterApplyText: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    filterResetButton: {
        alignItems: 'center',
        marginTop: 16,
    },
    filterResetText: {
        color: theme.colors.textSecondary,
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
        backgroundColor: '#DCFCE7', // Keep tints for actions as they are specific
        alignItems: 'flex-start',
    },
    backRightBtnRight: {
        backgroundColor: '#FEE2E2', // Keep tints for actions
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
        borderBottomColor: theme.colors.slate50,
    },
    societyOptionText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    societyOptionCode: {
        fontSize: 12,
        color: theme.colors.textMuted,
        marginTop: 2,
    },
    societyOptionActive: {
        backgroundColor: theme.colors.sky50,
    },
    sortCheck: {
        fontSize: 16,
        color: theme.colors.secondary,
        fontWeight: '900',
    },

    sortOption: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.slate50,
    },
    sortOptionText: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.slate600,
    },
    sortOptionActiveText: {
        color: theme.colors.secondary,
        fontWeight: '700',
    },

    undoCard: {
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    undoText: {
        color: theme.colors.white,
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
        color: theme.colors.white,
        fontWeight: '800',
        fontSize: 11,
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },

    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        backgroundColor: theme.colors.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    fabIcon: {
        color: theme.colors.white,
        fontSize: 24,
        fontWeight: '300',
    },
});
