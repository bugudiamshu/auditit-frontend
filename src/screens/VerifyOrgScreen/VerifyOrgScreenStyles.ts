import { StyleSheet } from "react-native";
import { theme } from "../../config/theme.ts";

export const VerifyOrgScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: theme.spacing.l,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    logoText: {
        ...theme.typography.h1,
        color: theme.colors.primary,
        letterSpacing: -1,
    },
    tagline: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: -theme.spacing.xs,
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
        fontSize: 20,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        letterSpacing: 4,
        marginBottom: theme.spacing.l,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    founderLink: {
        marginTop: theme.spacing.xl,
        alignItems: 'center',
    },
    founderText: {
        color: theme.colors.secondary,
        fontWeight: '600',
        textDecorationLine: 'none',
    },
});
