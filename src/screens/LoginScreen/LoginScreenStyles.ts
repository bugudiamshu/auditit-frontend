import { StyleSheet } from "react-native";
import { theme } from "../../config/theme.ts";

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    inner: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginTop: 8,
        textAlign: 'center',
        lineHeight: 24,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.colors.textSecondary,
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F4F7FF',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 16,
        padding: theme.spacing.l,
        fontSize: 18,
        color: theme.colors.textPrimary,
        fontWeight: '700',
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 16,
        padding: theme.spacing.l,
        alignItems: 'center',
        marginTop: 10,
        elevation: 8,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    backLink: {
        marginTop: 24,
        alignItems: 'center',
        padding: 10,
    },
    backText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: '700',
    },
    resendLink: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    resendText: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '800',
    },
    disabledResendText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    otpInfo: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#F0F7FF',
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    otpInfoText: {
        fontSize: 14,
        color: theme.colors.textPrimary,
        lineHeight: 22,
        fontWeight: '500',
    },
});
