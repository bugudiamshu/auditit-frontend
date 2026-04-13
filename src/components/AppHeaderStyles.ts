import { StyleSheet } from "react-native";
import {theme} from "../config/theme.ts";

export const AppHeaderStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.l,
        paddingTop: theme.spacing.m,
        paddingBottom: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    leftContent: {
        flex: 1,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: theme.colors.textPrimary,
        letterSpacing: -0.5,
    },
    tenantName: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginTop: 2,
        fontWeight: '500',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        alignItems: 'flex-end',
        marginRight: theme.spacing.m,
    },
    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
    roleBadge: {
        backgroundColor: '#F4F5F7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 4,
    },
    roleText: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    avatarText: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: '800',
    },
    logoutIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.danger,
        borderWidth: 2,
        borderColor: '#fff',
    }
});
