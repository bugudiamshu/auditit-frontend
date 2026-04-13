import { StyleSheet } from "react-native";
import { theme } from "../../config/theme.ts";

export const TransactionStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: theme.spacing.l,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    title: {
        ...theme.typography.h2,
        fontSize: 20,
        color: theme.colors.textPrimary,
        marginLeft: theme.spacing.m,
    },
    form: {
        padding: theme.spacing.l,
    },
    label: {
        ...theme.typography.label,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.s,
        marginTop: theme.spacing.m,
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        fontSize: 16,
        color: theme.colors.textPrimary,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.m,
    },
    typeButton: {
        flex: 1,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        marginHorizontal: 4,
    },
    activeIncome: {
        backgroundColor: theme.colors.success + '15',
        borderColor: theme.colors.success,
    },
    activeExpense: {
        backgroundColor: theme.colors.danger + '15',
        borderColor: theme.colors.danger,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        elevation: 4,
    },
    submitText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    backText: {
        color: theme.colors.primary,
        marginRight: theme.spacing.xs,
    },
    activePaymentButton: {
        backgroundColor: theme.colors.overlay,
    },
});
