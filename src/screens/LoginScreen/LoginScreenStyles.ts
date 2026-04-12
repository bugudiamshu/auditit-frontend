import { StyleSheet } from "react-native";
import { theme } from "../../config/theme.ts";

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    inner: {
        flex: 1,
        padding: theme.spacing.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: theme.spacing.xl,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.l,
        elevation: 4,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    label: {
        ...theme.typography.label,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.s,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        fontSize: 16,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.m,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        alignItems: 'center',
        marginTop: theme.spacing.s,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    backLink: {
        marginTop: theme.spacing.xl,
        alignItems: 'center',
    },
    backText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    resendLink: {
        marginTop: theme.spacing.m,
        alignItems: 'center',
    },
    resendText: {
        color: theme.colors.primary,
        ...theme.typography.label,
        fontWeight: '600',
    },
    disabledResendText: {
        color: theme.colors.textSecondary,
        ...theme.typography.label,
    },
    otpInfo: {
        marginBottom: theme.spacing.l,
        padding: theme.spacing.m,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.m,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    otpInfoText: {
        fontSize: 14,
        color: theme.colors.textPrimary,
        lineHeight: 20,
    },
});
